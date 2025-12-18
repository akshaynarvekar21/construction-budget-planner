import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFFF',
        },
        secondary: {
            main: '#00CC77',
            contrastText: '#FFFFFF',
        },
        divider: '#D3D9DE'
    },
    typography: {
        fontFamily: [
            'Inter',
            'Roboto',
            'sans-serif',
        ].join(','),

        body2: {
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.7,
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    margin: '0'
                }
            }
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
                head: {
                    backgroundColor: '#F9FAFB',
                    fontWeight: 600,
                },
                footer: {
                    backgroundColor: '#F9FAFB',
                    fontWeight: 600,
                }
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: ({ theme }) => ({
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 4,
                    marginTop: '16px',
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.secondary.main,
                    },
                }),
            },
        },
    },
});
