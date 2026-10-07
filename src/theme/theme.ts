import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#00CC77',
                    contrastText: '#FFFFFF',
                },
                text: {
                    primary: '#2E3332',
                },
                background: {
                    default: '#FFFFFF',
                },
                grey: {
                    50: '#F9FAFB',
                },
                error: {
                    main: '#D32F2F',
                },
                divider: '#D3D9DE'
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#00CC77',
                    contrastText: '#0B1F16',
                },
                text: {
                    primary: '#E6EBE9',
                    secondary: '#A3ADAA',
                },
                background: {
                    default: '#121615',
                    paper: '#1A1F1E',
                },
                grey: {
                    50: '#1F2625',
                },
                error: {
                    main: '#F2726D',
                },
                divider: '#3A4442'
            },
        },
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
                    backgroundColor: theme.vars.palette.primary.main,
                    color: theme.vars.palette.primary.contrastText,
                    border: '1px solid transparent',
                    '&:hover': {
                        backgroundColor: theme.vars.palette.background.default,
                        color: theme.vars.palette.primary.main,
                        border: `1px solid ${theme.vars.palette.primary.main}`,
                    },
                }),
                outlinedPrimary: ({ theme }) => ({
                    borderColor: theme.vars.palette.primary.main,
                    color: theme.vars.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.vars.palette.primary.main,
                        color: theme.vars.palette.primary.contrastText,
                        borderColor: theme.vars.palette.primary.main,
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
                    borderBottom: `1px solid ${theme.vars.palette.divider}`,
                    borderRight: `1px solid ${theme.vars.palette.divider}`,
                    '&:last-child': {
                        borderRight: 'none',
                    },
                    paddingTop: '9px',
                    paddingBottom: '9px',
                }),
                head: ({ theme }) => ({
                    backgroundColor: theme.vars.palette.grey[50],
                    fontWeight: 600,
                }),
                footer: ({ theme }) => ({
                    backgroundColor: theme.vars.palette.grey[50],
                    fontWeight: 600,
                    borderBottom: 'none',
                })
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: ({ theme }) => ({
                    border: `1px solid ${theme.vars.palette.divider}`,
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
