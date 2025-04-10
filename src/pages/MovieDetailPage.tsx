import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { fetchMovieDetails } from '../services/tmdbService';

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (movieId) {
            fetchMovie();
        }
    }, [movieId]);

    const fetchMovie = async () => {
        try {
            const data = await fetchMovieDetails(Number(movieId));
            setMovie(data);
        } catch (err) {
            console.error('Failed to fetch movie:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <CircularProgress sx={{ margin: 4 }} />;
    if (!movie) return <Typography>Movie not found.</Typography>;

    return (
        <Box sx={{ padding: 4, display: 'flex', gap: 4 }}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '300px', borderRadius: 8 }}
            />
            <Box>
                <Typography variant="h4">{movie.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Release: {movie.release_date} | Rating: {movie.vote_average}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    {movie.overview}
                </Typography>
                <Button variant="contained" sx={{ marginTop: 3 }}>
                    Add to Wishlist
                </Button>
            </Box>
        </Box>
    );
};

export default MovieDetailPage;
