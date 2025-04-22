import { useMemo } from 'react';
import { useMediaByGenre, useMediaCountByGenre } from '../services/apiService.ts';
import { Media } from '../types';

interface UseGenreMediaProps {
    movieId: number;
    tvId: number;
    page: number;
}

interface UseGenreMediaResult {
    moviesData: any;
    tvData: any;
    moviesLoading: boolean;
    tvLoading: boolean;
    movieCount: number;
    tvCount: number;
    combinedMedia: Media[];
    totalCount: number;
}

// Helper function to deduplicate media items based on both id and media_type
const dedupeMedia = (media: Media[]) => {
    const seen = new Set();
    return media.filter(item => {
        const key = `${item.media_type}-${item.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

export const useGenreMedia = ({
    movieId,
    tvId,
    page
}: UseGenreMediaProps): UseGenreMediaResult => {
    // Fetch movies and TV shows for the specified genre IDs
    const { data: moviesData, isLoading: moviesLoading } = useMediaByGenre('movie', movieId, page);
    const { data: tvData, isLoading: tvLoading } = useMediaByGenre('tv', tvId, page);

    // Fetch the total count of movies and TV shows for the genres
    const { data: movieCount } = useMediaCountByGenre('movie', movieId);
    const { data: tvCount } = useMediaCountByGenre('tv', tvId);

    /**
     * Combine, deduplicate, and sort media items by popularity
     * Memoized to prevent unnecessary recalculation on every render
     */
    const combinedMedia = useMemo(() => {
        if (!moviesData?.results || !tvData?.results) return [];

        // Combine movies and TV shows into a single array
        const newItems = [
            ...(moviesData.results || []),
            ...(tvData.results || [])
        ];

        // Sort by popularity in descending order
        const sortedItems = newItems.sort((a, b) => b.popularity - a.popularity);

        // Deduplicate the sorted items based on media_type and id
        return dedupeMedia(sortedItems);
    }, [moviesData, tvData]);

    const totalCount = (movieCount || 0) + (tvCount || 0);

    return {
        moviesData,
        tvData,
        moviesLoading,
        tvLoading,
        movieCount: movieCount || 0,
        tvCount: tvCount || 0,
        combinedMedia,
        totalCount
    };
};
