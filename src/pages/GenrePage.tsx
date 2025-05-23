/**
 * Genre Page Component
 * 
 * Displays movies and TV shows filtered by a specific genre.
 * Features:
 * - Genre selection dropdown
 * - Tabbed interface for All/Movies/TV Shows
 * - Pagination for browsing large result sets
 */
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Tabs,
    Tab,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import { useGenreMedia } from '../hooks/useGenreMedia';
import MediaGrid from '../components/MediaGrid';
import Pagination from '../components/Pagination';
import { getGenreMapping, GENRES } from '../utils/genreMap';

/**
 * Tab panel component for organizing content in tabs
 * Used to create the All/Movies/TV Shows tabs
 */
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`genre-tabpanel-${index}`}
            aria-labelledby={`genre-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

const GenrePage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [tabValue, setTabValue] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState<string>('Action');
    const [movieId, setMovieId] = useState<number | undefined>();
    const [tvId, setTvId] = useState<number | undefined>();

    // Initialize genre IDs
    useEffect(() => {
        const genreName = name || location.state?.genreName || selectedGenre;
        if (genreName) {
            setSelectedGenre(genreName);
            const mapping = getGenreMapping(genreName);
            if (mapping) {
                setMovieId(mapping.movieId);
                setTvId(mapping.tvId);
            }
        }
    }, [name, location.state, selectedGenre]);

    // Fetch media data for the selected genre using the useGenreMedia hook
    const {
        moviesData,
        tvData,
        movieCount,
        tvCount,
        combinedMedia,
        totalCount
    } = useGenreMedia({
        movieId: movieId || 0,
        tvId: tvId || 0,
        page,
    });

    // Handle tab changes between All/Movies/TV Shows and reset pagination
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setPage(1); // Reset page when switching tabs
    };

    // Handle genre selection from dropdown
    const handleGenreChange = (event: SelectChangeEvent) => {
        const newGenre = event.target.value;
        setSelectedGenre(newGenre);
        navigate(`/genre/${newGenre}`);
    };

    // Handle pagination changes
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Show error if genre IDs couldn't be resolved
    if (!movieId || !tvId) {
        return (
            <Container>
                <Typography color="error">Invalid genre</Typography>
            </Container>
        );
    }

    // Filter combined media based on selected tab
    const filteredMedia = tabValue === 0
        ? combinedMedia
        : tabValue === 1
        ? combinedMedia.filter(item => item.media_type === 'movie')
        : combinedMedia.filter(item => item.media_type === 'tv');

    return (
        <Container maxWidth={false}>
            <Box sx={{ py: 4 }}>
                {/* Header with title and genre selector dropdown */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Browse by Genre
                    </Typography>
                    <FormControl
                        sx={{
                            minWidth: 200,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                            },
                            '& .MuiSelect-icon': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                            },
                        }}
                    >
                        <InputLabel
                            id="genre-select-label"
                            sx={{
                                color: 'white',
                                '&.Mui-focused': {
                                    color: 'white',
                                },
                            }}
                        >
                            Select Genre
                        </InputLabel>
                        <Select
                            labelId="genre-select-label"
                            value={selectedGenre}
                            label="Select Genre"
                            onChange={handleGenreChange}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        backdropFilter: 'blur(10px)',
                                        '& .MuiMenuItem-root': {
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            },
                                        },
                                    },
                                },
                            }}
                            sx={{
                                color: 'white',
                                '& .MuiSelect-select': {
                                    padding: '12px 16px',
                                },
                            }}
                        >
                            {GENRES.map((genre) => (
                                <MenuItem
                                    key={genre.name}
                                    value={genre.name}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label={`All (${totalCount.toLocaleString()} titles)`} />
                        <Tab label={`Movies (${movieCount.toLocaleString()} titles)`} />
                        <Tab label={`TV Shows (${tvCount.toLocaleString()} titles)`} />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    <MediaGrid
                        media={filteredMedia}
                        title={`All ${selectedGenre} Titles`}
                        showViewAll={false}
                        showType={true}
                        showCount={true}
                        totalCount={totalCount}
                    />
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            currentPage={page}
                            totalPages={Math.max(moviesData?.total_pages || 0, tvData?.total_pages || 0)}
                            onPageChange={handlePageChange}
                        />
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <MediaGrid
                        media={filteredMedia}
                        title={`${selectedGenre} Movies`}
                        showViewAll={false}
                        showCount={true}
                        totalCount={movieCount}
                    />
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            currentPage={page}
                            totalPages={moviesData?.total_pages || 0}
                            onPageChange={handlePageChange}
                        />
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <MediaGrid
                        media={filteredMedia}
                        title={`${selectedGenre} TV Shows`}
                        showViewAll={false}
                        showCount={true}
                        totalCount={tvCount}
                    />
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            currentPage={page}
                            totalPages={tvData?.total_pages || 0}
                            onPageChange={handlePageChange}
                        />
                    </Box>
                </TabPanel>
            </Box>
        </Container>
    );
};

export default GenrePage;
