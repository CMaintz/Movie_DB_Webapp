import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import MovieCard from './MovieCard';
import {Movie} from "../types/Movie.ts";

interface GenreRowProps {
    genre: string;
    movies: Array<Movie>;
    genreId: string;
    maxMovies: number; // Maximum number of movies to show per row
}

const GenreRow: React.FC<GenreRowProps> = ({ genre, movies, genreId, maxMovies }) => {
    const [visibleMovies, setVisibleMovies] = useState<number>(maxMovies);

    const handleLoadMore = () => {
        setVisibleMovies((prev) => prev + maxMovies);
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                {genre}
            </Typography>
            <Grid container spacing={2}>
                {movies.slice(0, visibleMovies).map((movie, index) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={movie.id}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
            {visibleMovies < movies.length && (
                <Button variant="contained" color="primary" onClick={handleLoadMore}>
                    Load More
                </Button>
            )}
        </div>
    );
};

export default GenreRow;
