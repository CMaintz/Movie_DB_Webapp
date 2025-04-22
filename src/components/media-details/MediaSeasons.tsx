import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
    Skeleton
} from '@mui/material';
import { SeriesDetails } from '../../types';
import { formatSeasonYear } from '../../utils/mediaFormatter.ts';

interface MediaSeasonsProps {
    seasons: SeriesDetails['seasons'];
}

export const MediaSeasons: React.FC<MediaSeasonsProps> = ({ seasons }) => {
    return (
        <Paper elevation={0} sx={{
            p: 3,
            bgcolor: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
        }}>
            <Typography variant="h5" gutterBottom>
                Seasons
            </Typography>
            <Stack spacing={3}>
                {seasons.map((season) => (
                    <Box
                        key={season.id}
                        sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Box
                            component="img"
                            src={season.poster_path ? `https://image.tmdb.org/t/p/w154${season.poster_path}` : 'none'}
                            alt={season.name}
                            sx={{
                                width: 92,
                                height: 138,
                                borderRadius: 1,
                                objectFit: 'cover',
                                flexShrink: 0,
                                display: season.poster_path ? 'block' : 'none'
                            }}
                        />
                        {!season.poster_path && (
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width={92}
                                height={138}
                                sx={{
                                    borderRadius: 1,
                                    flexShrink: 0,
                                    bgcolor: 'grey.800'
                                }}
                            />
                        )}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle1" noWrap>
                                {season.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {season.episode_count} episodes
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {formatSeasonYear(season.air_date)}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}; 