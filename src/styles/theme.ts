import { createTheme } from '@mui/material/styles';

//Adding a custom breakpoint 1920px & above
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        sm_md: true; // Custom breakpoint for large phones
        md: true;
        md_lg: true; // Custom breakpoint for large tablets
        lg: true;
        lg_xl: true;
        xl: true;
        xxl: true; // Custom breakpoint for desktop monitors
    }
}
//Setting up some custom breakpoints and some defaults.
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            sm_md: 600,
            md: 768,
            md_lg: 1024,
            lg: 1366,
            lg_xl: 1536,
            xl: 1920,
            xxl: 2560,
        },
    },
    spacing: 8,
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