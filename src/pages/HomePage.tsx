import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useGenres } from '../services/apiService.ts';
import MediaGrid from '../components/MediaGrid';
import { useNavigate } from 'react-router-dom';
import { GENRES } from '../utils/genreMap';
import { useGenreMedia } from '../hooks/useGenreMedia';
import { Media } from '../types';

const HomePage: React.FC = () => {
    const { data: movieGenres = [] } = useGenres('movie');
    const { data: tvGenres = [] } = useGenres('tv');
    const navigate = useNavigate();

    const handleGenreClick = (genreName: string) => {
        const scrollPosition = window.scrollY;
        navigate(`/genre/${genreName}`, {
            state: {
                genreName,
                scrollPosition
            }
        });
    };

    return (
        <Container maxWidth={false} disableGutters>
            {GENRES.map((genre) => (
                <GenreSection
                    key={genre.name}
                    genre={genre}
                    title={genre.name}
                    onViewAll={() => handleGenreClick(genre.name)}
                />
            ))}
        </Container>
    );
};

const GenreSection: React.FC<{
    genre: { name: string; movieId: number; tvId: number };
    title: string;
    onViewAll: () => void;
}> = ({ genre, title, onViewAll }) => {
    const [page, setPage] = useState(1);
    const [allMedia, setAllMedia] = useState<Media[]>([]);
    const itemsPerPage = 8;

    const {
        combinedMedia,
        totalCount,
        moviesLoading,
        tvLoading
    } = useGenreMedia({
        movieId: genre.movieId,
        tvId: genre.tvId,
        page,
        shouldLoadAll: false,
        itemsPerPage
    });

    // When combinedMedia changes due to page change, accumulate the media items
    useEffect(() => {
        if (combinedMedia && combinedMedia.length > 0) {
            if (page === 1) {
                // First page - just set the media
                setAllMedia(combinedMedia);
            } else {
                // Add new items, avoiding duplicates
                setAllMedia(prevMedia => {
                    const newItems = combinedMedia.filter(
                        item => !prevMedia.some(existing => existing.id === item.id)
                    );
                    return [...prevMedia, ...newItems];
                });
            }
        }
    }, [combinedMedia, page]);

    const handleLoadMore = () => {
        if (allMedia.length < totalCount) {
            setPage(prev => prev + 1);
        }
    };

    return (
        <MediaGrid
            media={allMedia}
            title={title}
            onViewAll={onViewAll}
            showViewAll={true}
            showType={true}
            showLoadMore={allMedia.length < totalCount && !moviesLoading && !tvLoading}
            onLoadMore={handleLoadMore}
            totalCount={totalCount}
            showCount={true}
        />
    );
};

export default HomePage;