import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
    palette: {
        primary: {
            main: '#00CC77',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF',
        },
        grey: {
            50: '#F9FAFB',
        },
        divider: '#D3D9DE'
    },
    typography: {
        fontFamily: [
            'Inter',
            'Roboto',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
                color: 'inherit',
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '4px',
                },
                containedPrimary: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    border: '1px solid transparent',
                    '&:hover': {
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.primary.main,
                        border: `1px solid ${theme.palette.primary.main}`,
                    },
                }),
                outlinedPrimary: ({ theme }) => ({
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderColor: theme.palette.primary.main,
                    },
                }),
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    borderRight: `1px solid ${theme.palette.divider}`,
                    '&:last-child': {
                        borderRight: 'none',
                    },
                    paddingTop: '9px',
                    paddingBottom: '9px',
                }),
                head: ({ theme }) => ({
                    backgroundColor: theme.palette.grey[50],
                    fontWeight: 600,
                }),
                footer: ({ theme }) => ({
                    backgroundColor: theme.palette.grey[50],
                    fontWeight: 600,
                    borderBottom: 'none',
                })
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: ({ theme }) => ({
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 4,
                    marginTop: '24px',
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                },
            },
        },
    },
});
