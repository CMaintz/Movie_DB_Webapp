import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, Box } from '@mui/material';
import { Movie } from '../types/Movie.ts';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '200px', sm: '224.66px' }, // Fixed width
                height: { xs: '380px', sm: '433px' }, // Fixed height
                boxShadow: 4,
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': { boxShadow: 8 },
            }}
        >
            <CardMedia
                component="img"
                image={movie.poster_url}
                alt={movie.title}
                sx={{
                    width: '100%',
                    aspectRatio: '2/3',
                    objectFit: 'cover',
                }}
            />
            <CardContent
                sx={{
                    flexGrow: 1,
                    p: 1.5,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        lineHeight: 1.2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '2.5rem',
                    }}
                >
                    {movie.title}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 0.5,
                        marginTop: 'auto',
                    }}
                >
                    <Rating
                        value={movie.vote_average / 2}
                        precision={0.1}
                        readOnly
                        size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                        {movie.vote_average.toFixed(1)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MovieCard;