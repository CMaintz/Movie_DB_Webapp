import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import MovieCard from './MovieCard';
import { Genre } from "../types/Genre.ts";
import { Movie } from "../types/Movie.ts";
import { fetchMoviesByGenre } from "../services/tmdbService";

interface GenreRowProps {
    genre: Genre;
    movies: Movie[];
    initialPage: number;
    totalPages: number;
    totalResults: number;
}


const GenreRow: React.FC<GenreRowProps> = ({ genre, movies, initialPage, totalPages, totalResults }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const moviesPerRow = isXs ? 2 : isSm ? 4 : isMd ? 6 : 8;

    const [visibleMovies, setVisibleMovies] = useState<number>(moviesPerRow);
    const [currentMovies, setCurrentMovies] = useState<Movie[]>(Array.isArray(movies) ? movies : []);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(initialPage < totalPages);

    useEffect(() => {
        setVisibleMovies(moviesPerRow);
    }, [moviesPerRow]);



    useEffect(() => {
        setCurrentMovies(Array.isArray(movies) ? movies : []);
        setCurrentPage(initialPage);
        setHasMore(initialPage < totalPages);
    }, [movies, initialPage, totalPages]);



    const handleLoadMore = async () => {
        if (!hasMore) return;

        const nextPage = currentPage + 1;
        try {
            const data = await fetchMoviesByGenre(Number(genre.id), nextPage);
            if (data.movies.length > 0) {
                setCurrentMovies(prevMovies => [...prevMovies, ...data.movies]);
                setVisibleMovies(prev => prev + moviesPerRow);
                setCurrentPage(nextPage);
                setHasMore(nextPage < data.totalPages);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching more movies:', error);
            setHasMore(false);
        }
    };


    return (
        <Paper elevation={3} sx={{
            position: 'relative',
            borderRadius: 4,
            //background: theme.palette.primary.main,
            //background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 70%)`,
            background: 'linear-gradient(135deg, #e0f2f1 20%, #e3f2fd 80%)',
            py: 2,
            pt: 1.5,
            px: 3, // 24px padding on left and right
            my: 1.5,
            width: '100%',
            maxWidth: 'none',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Typography variant="h5" sx={{
                    fontWeight: 700,
                    fontFamily: "'Roboto', sans-serif",
                    color: '#2f3b52',
                    letterSpacing: 0.5
                }}>
                    {genre.name} ({totalResults.toLocaleString()} titles)
                </Typography>
                <Button variant="outlined" size="small" onClick={() => navigate(`/genres/${genre.id}`)}>
                    View All
                </Button>
            </Box>



            <Grid container spacing={1.5} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} sx={{margin: 0, width: '100%',}}>
                {currentMovies.slice(0, visibleMovies).map((movie) => (
                    <Grid size={{xs: 2, sm: 2, md: 2, lg: 2}} key={movie.id} sx={{padding: 0,}}>
                        <Box sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <MovieCard movie={movie} />
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {visibleMovies < currentMovies.length && (
                <Box sx={{ textAlign: 'center', mt: 2, mb: 0 }}>
                    <Button variant="contained" size="small" onClick={handleLoadMore}>
                        Load More
                    </Button>
                </Box>
            )}
        </Paper>
    );
};



export default GenreRow;
