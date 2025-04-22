/**
 * Media Details Page Component
 * 
 * Displays detailed information about a movie or TV show.
 * Handles the rendering of media information, cast, trailers, and related data.
 * Adapts display based on media type (movie vs TV show) and screen size.
 */
import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Stack,
    Chip,
    CircularProgress,
    useTheme,
    useMediaQuery,
    Grid,
    Paper,
    Skeleton
} from '@mui/material';
import { ArrowBack} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import { useMediaDetails } from '../services/apiService.ts';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MovieDetails, SeriesDetails, Genre, MediaDetails } from '../types';

import {MediaHeader} from '../components/media-details/MediaHeader';
import {MediaOverview} from '../components/media-details/MediaOverview';
import {MediaCast} from '../components/media-details/MediaCast';
import {MediaTrailer} from '../components/media-details/MediaTrailer';
import {MediaSeasons} from '../components/media-details/MediaSeasons';


const MediaDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
    
    // Fetch media details from the API based on the mediaType and id from URL params
    const { data: media, isLoading, error } = useMediaDetails(mediaType as 'movie' | 'tv', Number(id));
    const [autoPlay, setAutoPlay] = useState(true);

    // Display loading state while fetching data
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Handle error states
    if (error || !media) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography color="error">{error?.message || 'Media not found'}</Typography>
            </Box>
        );
    }

    // Type guard to check if media is MovieDetails
    const isMovieDetails = (media: MediaDetails): media is MovieDetails => {
    return media.media_type === 'movie';
    };

    // Type guard to check if media is SeriesDetails
    const isSeriesDetails = (media: MediaDetails): media is SeriesDetails => {
    return media.media_type === 'tv';
    };

    // Get director for movies or creators for TV shows
    const director = isMovieDetails(media) ? media?.credits?.crew?.find(person => person.job === 'Director') ?? null : null;
    const creators = isSeriesDetails(media) ? media?.created_by : [];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
            position: 'relative',
            bgcolor: 'background.default',
            alignItems: 'center',
            overflowY: 'auto',
            overflowX: 'hidden',
        }}>
            {/* Background Image Section */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: media.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`
                        : 'linear-gradient(45deg, #2E3B4E 0%, #1A1E2A 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: { xs: 'center 0px', sm: 'center 0px', md: 'center 48px' },
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.5) 100%)',
                    },
                }}
            />

            {/* Navigation Back Button */}
            <IconButton
                onClick={() => navigate(-1)}
                sx={{
                    position: 'fixed',
                    left: 16,
                    top: { xs: '16px', sm: '16px', md: '72px' },
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    zIndex: 2,
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <ArrowBack />
            </IconButton>

            {/* Media Header */}
            <MediaHeader 
            media={media} 
            director={director}
            creators={creators}
        />

            {/* Content Section */}
            <Box sx={{
                position: 'relative',
                mt: -4,
                mb: '6rem',
                zIndex: 1,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: { xs: '100%', md: '80%', lg: '70%' },
                mx: 'auto',
                px: { xs: 2, sm: 3 },
            }}>
                <Stack spacing={4}>
                      <MediaOverview 
                    media={media}
                    director={director}
                    creators={creators}
                />
                    
                                {media.credits?.cast?.length > 0 && (
                        <MediaCast 
                            cast={media.credits.cast}
                            isMobile={isMobile}
                                                autoPlay={autoPlay}
                            setAutoPlay={setAutoPlay}
                        />
                    )}

                    {media.videos?.results && (
                        <MediaTrailer videos={media.videos.results} />
                    )}

                    {isSeriesDetails(media) && media.seasons?.length > 0 && (
                        <MediaSeasons seasons={media.seasons} />
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default MediaDetailsPage;