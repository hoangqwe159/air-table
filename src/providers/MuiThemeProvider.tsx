import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@emotion/react";
import type React from "react";
import { memo, type PropsWithChildren } from "react";
import { createTheme, darkScrollbar, type PaletteColorOptions, responsiveFontSizes, type Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useMemo } from "react";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string): PaletteColorOptions => augmentColor({ color: { main: mainColor } });

function useMuiTheme() {
    const theme = useMemo(() => {
        return responsiveFontSizes(
            createTheme({
                spacing: 4,
                typography: {
                    fontFamily: [
                        "Roboto",
                        "sans-serif",
                        "-apple-system",
                        "BlinkMacSystemFont",
                        '"Segoe UI"',
                        "Arial",
                        "sans-serif",
                        '"Apple Color Emoji"',
                        '"Segoe UI Emoji"',
                        '"Segoe UI Symbol"',
                    ].join(","),
                    button: {
                        textTransform: "none",
                    },
                },
                components: {
                    MuiDialogTitle: {
                        defaultProps: {
                            component: "div",
                        },
                        styleOverrides: {
                            root: ({ theme }) => ({
                                padding: theme.spacing(2, 4),
                            }),
                        },
                    },
                    MuiDialogContent: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                padding: theme.spacing(4),
                            }),
                        },
                    },
                    MuiCssBaseline: {
                        styleOverrides: (theme: Theme) => ({
                            html: {
                                ...darkScrollbar({
                                    track: "transparent",
                                    thumb: grey[400],
                                    active: grey[600],
                                    ...theme.applyStyles("dark", {
                                        thumb: grey[700],
                                        active: grey[600],
                                    }),
                                }),
                                scrollbarWidth: "thin",
                                WebkitFontSmoothing: "auto",
                            },
                        }),
                    },
                    MuiTextField: {
                        defaultProps: {
                            autoComplete: "off",
                        },
                    },
                },
                cssVariables: true,
                colorSchemes: {
                    light: {
                        palette: {
                            error: createColor("#E51D0D"),
                            warning: createColor("#F49604"),
                            info: createColor("#4B9EFF"),
                            success: createColor("#A2E262"), 
                            default: createColor("#808080"),
                            paper: createColor("#FFFFFF"),
                            primary: createColor("#2962FF"),
                            secondary: createColor("#245A9E"),
                            accent: createColor("#30363e"),
                            background: {
                                default: "#fafafa",
                                paper: "#FFFFFF",
                            },
                        }
                    },
                    dark: {
                        palette: {
                            error: createColor("#F9958D"),
                            warning: createColor("#fdd08b"),
                            info: createColor("#aed3ff"),
                            success: createColor("#d5f2b8"),
                            default: createColor("#f6f7f8"),
                            paper: createColor("#FFFFFF"),
                            primary: createColor("#5C87FF"),
                            secondary: createColor("#3584E6"),
                            accent: createColor("#f6f7f8"),
                            background: {
                                default: "#05070D",
                                paper: "#05070D",
                            },
                        }
                    }
                }
            })
        );
    }, []);

    return theme;
}

export default memo(function MuiThemeProvider({ children }: PropsWithChildren): React.ReactElement {
    const theme = useMuiTheme();

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});

declare module "@mui/material/styles" {
    interface CustomPalette {
        default?: PaletteColorOptions;
        paper?: PaletteColorOptions;
        accent?: PaletteColorOptions;
        gradient?: string;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Palette extends CustomPalette {}
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        default: true;
        paper: true;
        accent: true;
    }
}

declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        default: true;
        paper: true;
        accent: true;
    }
}

declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsColorOverrides {
        default: true;
        paper: true;
        accent: true;
    }
}

declare module "@mui/material/AppBar" {
    interface AppBarPropsColorOverrides {
        default: true;
        paper: true;
        accent: true;
    }
}