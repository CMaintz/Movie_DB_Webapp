import { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import GenreRow from '../components/GenreRow.tsx';
import { fetchGenres, fetchMoviesByGenre } from '../services/tmdbService';
import {Genre} from '../types/Genre';

const HomePage = () => {
    const [genres, setGenres] = useState<any[]>([]); // Replace with the correct type for genres
    const [moviesByGenre, setMoviesByGenre] = useState<any>({}); // Movies for each genre
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

/*useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedGenres = await fetchGenres();
                setGenres(fetchedGenres);
                setError(null);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setError('Failed to load genres. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        //fetches the genres
         fetchData();
    }, []);*/
    useEffect(() => {
        const fetchData = async () => {
            const genresData = await fetchGenres();
            setGenres(genresData);

            // Fetch movies for each genre
            const moviesData: any = {};
            for (let genre of genresData) {
                const movies = await fetchMoviesByGenre(genre.id);
                moviesData[genre.id] = movies;
            }

            setMoviesByGenre(moviesData);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Movie Genres
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (<Typography color="error">{error}</Typography>
                ) : (
                <Grid container spacing={2}>
                    {genres.map((genre) => (
                        <Grid size={{xs: 12, sm: 6, md: 4}} key={genre.id}>
                            <GenreRow
                                genre={genre.name}
                                movies={moviesByGenre[genre.id] || []}
                                genreId={genre.id}
                                maxMovies={8} // Display 8 movies at first
                            />
                        </Grid>
                    ))}
                </Grid>
                )}
        </Container>

    );
};

export default HomePage;
