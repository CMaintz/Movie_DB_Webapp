// MovieCard.tsx
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import {Movie} from "../types/Movie.ts";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={movie.poster_url}
                alt={movie.title}
            />
            <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
