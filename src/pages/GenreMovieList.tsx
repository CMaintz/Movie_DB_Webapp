import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { fetchMoviesByGenre, fetchGenres } from '../services/tmdbService';
import { Movie } from '../types/Movie.ts';
import { Genre } from '../types/Genre.ts';

const GenreMovieList: React.FC = () => {
    const { genreId } = useParams();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genre, setGenre] = useState<Genre | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);

    const loadMovies = useCallback(async () => {
        if (!genreId || loading || page > totalPages) return;

        setLoading(true);
        const data = await fetchMoviesByGenre(Number(genreId), page);
        setMovies(prev => [...prev, ...data.movies]);
        setTotalPages(data.totalPages);
        setLoading(false);
    }, [genreId, page, totalPages, loading]);

    useEffect(() => {
        const findGenre = async () => {
            const genres = await fetchGenres();
            const foundGenre = genres.find(g => g.id === Number(genreId));
            setGenre(foundGenre || null);
        };
        findGenre();

        // Reset upon genreId change
        setMovies([]);
        setPage(1);
        setTotalPages(1);
    }, [genre?.id]);

    useEffect(() => {
        loadMovies();
    }, [loadMovies]);

    const lastMovieRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && page < totalPages) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, page, totalPages]);

    return (
        <Box sx={{ px: 2, py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                {genre?.name}
            </Typography>

            <Grid container spacing={2}>
                {movies.map((movie, idx) => (
                    <Grid ref={movies.length === idx + 1 ? lastMovieRef : null} item xs={12} sm={6} md={3} key={movie.id}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {loading && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default GenreMovieList;