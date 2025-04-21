/**
 * useGenreMedia Hook
 * 
 * Custom React hook that fetches and combines movies and TV shows for a specific genre.
 * Handles data fetching, loading states, and optimized sorting of combined media.
 */
import { useMemo } from 'react';
import { useMediaByGenre, useMediaCountByGenre } from '../services/apiService.ts';
import { Media } from '../types';

/**
 * Props for the useGenreMedia hook
 * @property movieId - The genre ID for movies
 * @property tvId - The genre ID for TV shows
 * @property page - Current pagination page
 * @property shouldLoadAll - Whether to return all items or paginate
 * @property itemsPerPage - Number of items to show per page when paginating
 */
interface UseGenreMediaProps {
    movieId: number;
    tvId: number;
    page: number;
    shouldLoadAll?: boolean;
    itemsPerPage?: number;
}

/**
 * Result object returned by the hook
 * @property moviesData - Raw API response for movies
 * @property tvData - Raw API response for TV shows
 * @property moviesLoading - Loading state for movies request
 * @property tvLoading - Loading state for TV shows request
 * @property movieCount - Total count of movies in this genre
 * @property tvCount - Total count of TV shows in this genre
 * @property combinedMedia - Combined and sorted list of movies and TV shows
 * @property totalCount - Total count of all media (movies + TV shows)
 */
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

/**
 * Hook that fetches media for specific genre IDs and combines the results
 * Allows for customized pagination and limiting of results
 */
export const useGenreMedia = ({
                                  movieId,
                                  tvId,
                                  page,
                                  shouldLoadAll = false,
                                  itemsPerPage = 8
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
        ].sort((a, b) => b.popularity - a.popularity);

        // Remove duplicate items (if any)
        const unique = newItems.filter((item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        // Either return all items or just the paginated amount
        return shouldLoadAll ? unique : unique.slice(0, itemsPerPage);
    }, [moviesData, tvData, shouldLoadAll, itemsPerPage]);

    // Calculate the total count of all media items
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