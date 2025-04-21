/**
 * WishlistButton Component
 * 
 * Interactive button for adding/removing media items to a user's wishlist
 * Features:
 * - Visual feedback with animation on adding to wishlist
 * - Login tooltip prompt for unauthenticated users
 * - Toggle between filled/outline heart icon based on wishlist status
 */
import React, { useState } from 'react';
import { IconButton, Tooltip, keyframes } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../context/AuthContext';

/**
 * Heartbeat animation keyframes
 * Creates a pulsing effect when an item is added to the wishlist
 */
const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

/**
 * Props for the WishlistButton component
 * @property mediaId - The ID of the media item
 * @property mediaType - The type of media ('movie' or 'tv')
 * @property sx - Additional Material UI styling
 * @property onWishlistChange - Callback function when wishlist status changes
 */
interface WishlistButtonProps {
    mediaId: number;
    mediaType: 'movie' | 'tv';
    sx?: any;
    onWishlistChange?: (isWishlisted: boolean) => void;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ mediaId, mediaType, sx, onWishlistChange}) => {
    const { user } = useAuth();
    const { isInWishlist, addToWishlist, removeFromWishlist, refreshWishlist } = useWishlist();
    
    // Animation control states
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    // Check if the current media item is in the user's wishlist
    const isWishlisted = isInWishlist(mediaId, mediaType);

    /**
     * Handle wishlist button click
     * - Prevents event propagation (important when button is inside clickable card)
     * - Shows login tooltip if user is not authenticated
     * - Toggles wishlist status and updates both local state and database
     * - Triggers animation when adding to wishlist
     * - Notifies parent component of status change via callback
     */
    const handleWishlistClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        // Show login tooltip if user is not authenticated
        if (!user) {
            setShowTooltip(true);
            return;
        }
        
        let success = false;
        
        // Remove from wishlist if already added
        if (isWishlisted) {
            success = await removeFromWishlist(mediaId, mediaType);
        } 
        // Add to wishlist and trigger animation
        else {
            success = await addToWishlist(mediaId, mediaType);
            if (success) {
                setShouldAnimate(true);
                setTimeout(() => setShouldAnimate(false), 500);
            }
        }
        
        // If operation was successful, notify parent and refresh wishlist
        if (success) {
            if (onWishlistChange) {
                onWishlistChange(!isWishlisted);
            }
            await refreshWishlist();
        }
    };

    return (
        <Tooltip
            title="Please login to add to wishlist"
            open={showTooltip}
            onClose={() => setShowTooltip(false)}
            placement="top"
            arrow
        >
            <IconButton
                onClick={handleWishlistClick}
                sx={{
                    ...sx,
                    '& .MuiSvgIcon-root': {
                        animation: shouldAnimate ? `${heartbeat} 0.5s ease-in-out` : 'none',
                    }
                }}
            >
                {isWishlisted ? (
                    <Favorite color="error" />
                ) : (
                    <FavoriteBorder sx={{ color: 'white' }} />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default WishlistButton;