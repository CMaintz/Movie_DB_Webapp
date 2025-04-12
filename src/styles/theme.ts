import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    palette: {
        primary: {
            main: '#1565c0',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ff4081',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#263238',
            secondary: '#546e7a',
        },
    },
});

export default theme;