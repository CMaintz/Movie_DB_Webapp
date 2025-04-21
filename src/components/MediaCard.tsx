/**
 * MediaCard Component
 * Displays a card for a movie or TV show with poster, title, and rating
 * Includes wishlist functionality and navigation to detail page
 */
import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Skeleton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Media } from '../types';
import MediaRating from './MediaRating';
import WishlistButton from './WishlistButton';

/**
 * Props for MediaCard component
 * @property {Media} media - The media item to display
 * @property {boolean} showType - Whether to show media type (movie/TV) badge
 * @property {Function} onWishlistChange - Callback for wishlist changes
 */
interface MediaCardProps {
    media: Media;
    showType?: boolean;
    onWishlistChange?: (mediaId: number, mediaType: 'movie' | 'tv', isWishlisted: boolean) => void;
}

/**
 * Card component for displaying movie or TV show information
 * Features:
 * - Clickable card that navigates to detail page
 * - Poster image with fallback skeleton
 * - Media type badge (optional)
 * - Wishlist toggle button
 * - Title and rating display
 */
const MediaCard: React.FC<MediaCardProps> = ({ media, showType = true, onWishlistChange}) => {
    const navigate = useNavigate();

    /**
     * Handles click on the card to navigate to detail page
     */
    const handleClick = () => {
        navigate(`/${media.media_type === 'movie' ? 'movie' : 'tv'}/${media.id}`, {
            state: { backgroundLocation: window.location.pathname }
        });
    };

    /**
     * Handles wishlist button click
     * Calls parent callback if provided
     */
    const handleWishlistChange = (isWishlisted: boolean) => {
        if (onWishlistChange) {
            onWishlistChange(media.id, media.media_type, isWishlisted);
        }
    };

    return (
        <Card
            sx={{
                position: 'relative',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
            onClick={handleClick}
        >
            {/* Image container with wishlist button and type badge */}
            <Box sx={{ position: 'relative' }}>
                {media.poster_path ? (
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                        alt={media.title}
                        sx={{
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        sx={{
                            paddingTop: '150%', // 2:3 aspect ratio for posters
                            bgcolor: 'grey.800'
                        }}
                    />
                )}
                {/* Wishlist button overlay */}
                <WishlistButton
                    mediaId={media.id}
                    mediaType={media.media_type}
                    onWishlistChange={handleWishlistChange}
                    sx={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                    }}
                />
                {/* Media type badge (movie/TV) */}
                {showType && (
                    <Chip
                        label={media.media_type === 'movie' ? 'Movie' : 'Series'}
                        color="primary"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: '0.5rem',
                            left: '0.5rem',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '0 4px',
                            height: '20px',
                            fontSize: '0.7rem',
                            '& .MuiChip-label': {
                                color: 'white',
                                padding: '0 4px',
                            }
                        }}
                    />
                )}
            </Box>
            {/* Card content with title and rating */}
            <CardContent sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.2rem'
            }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.1em',
                    }}
                >
                    {media.title}
                </Typography>

                <MediaRating
                    voteAverage={media.vote_average}
                    size="small"
                />
            </CardContent>
        </Card>
    );
};

export default MediaCard;