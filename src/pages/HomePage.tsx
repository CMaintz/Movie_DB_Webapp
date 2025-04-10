import { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import GenreRow from '../components/GenreRow.tsx';
import { fetchGenres } from '../services/tmdbService';
import {Genre} from '../types/Genre';

const HomePage = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
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
                <Grid container spacing={3}>
                    {genres.map((genre) => (
                        <Grid key={genre.id} size={{xs:12, sm:6, md:4}}>
                            <GenreRow genre={genre} />
                        </Grid>
                    ))}
                </Grid>
                )}
        </Container>

    );
};

export default HomePage;
