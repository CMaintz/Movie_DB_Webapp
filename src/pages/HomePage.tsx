import { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import GenreRow from '../components/GenreRow.tsx';
import { fetchGenres, fetchMoviesByGenre } from '../services/tmdbService';
import {Genre} from "../types/Genre.ts";

const HomePage = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [moviesByGenre, setMoviesByGenre] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const moviesData: any = {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genresData: Genre[] = await fetchGenres();
                setGenres(genresData);

                const moviesData: any = {};
                for (let genre of genresData) {
                    moviesData[genre.id] = await fetchMoviesByGenre(genre.id, 1); // explicit "page = 1"
                }

                setMoviesByGenre(moviesData);
            } catch (err) {
                console.error(err);
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2, md: 3, lg: 5 },
            /*width: {xs: '100%', sm: '100%', md: '90%', lg: '80%', xl: '60%'}*/ }}>
            <Typography variant="h4" gutterBottom>
                Movie Genres
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box display="flex" flexDirection="column" gap={4}>
                    {genres.map((genre) => (
                        <GenreRow
                            key={genre.id}
                            genre={genre}
                            movies={moviesByGenre[genre.id]?.movies || []}
                            initialPage={moviesByGenre[genre.id]?.page || 1}
                            totalPages={moviesByGenre[genre.id]?.totalPages || 1}
                            totalResults={moviesByGenre[genre.id]?.totalResults || 0}
                        />

                    ))}
                </Box>

            )}
        </Container>
    );
};

export default HomePage;