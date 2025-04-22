import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Skeleton
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MediaDetails } from '../../types';

interface MediaCastProps {
    cast: MediaDetails['credits']['cast'];
    isMobile: boolean;
    autoPlay: boolean;
    setAutoPlay: (value: boolean) => void;
}

export const MediaCast: React.FC<MediaCastProps> = ({ cast, isMobile, autoPlay, setAutoPlay }) => {
    return (
        <Paper elevation={0} sx={{
            p: 3,
            bgcolor: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
        }}>
            <Typography variant="h5" gutterBottom>
                Cast
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false}
                    infiniteLoop
                    centerMode
                    centerSlidePercentage={isMobile ? 33 : 16}
                    swipeable
                    emulateTouch
                    showArrows={!isMobile}
                    autoPlay={autoPlay}
                    interval={3000}
                    stopOnHover
                    onSwipeStart={() => setAutoPlay(false)}
                    onSwipeEnd={() => setAutoPlay(true)}
                >
                    {cast
                        .filter((actor, index, self) => 
                            self.findIndex(a => a.id === actor.id) === index
                        )
                        .slice(0, 20)
                        .map((actor) => (
                            <Box key={actor.id} sx={{ px: 1, width: '100%', textAlign: 'center' }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1,
                                    width: '100%'
                                }}>
                                    <Box
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '2px solid rgba(255, 255, 255, 0.2)',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                            position: 'relative'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'none'}
                                            alt={actor.name}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center 20%',
                                                display: actor.profile_path ? 'block' : 'none'
                                            }}
                                        />
                                        {!actor.profile_path && (
                                            <Skeleton
                                                variant="circular"
                                                animation="wave"
                                                width="100%"
                                                height="100%"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    bgcolor: 'grey.800'
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                            {actor.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {actor.character}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                </Carousel>
            </Box>
        </Paper>
    );
}; 
