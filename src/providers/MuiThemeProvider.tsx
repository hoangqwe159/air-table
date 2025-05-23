import { Roboto } from 'next/font/google';
import { ThemeProvider } from "@emotion/react";
import type React from "react";
import { memo, type PropsWithChildren } from "react";
import { createTheme, darkScrollbar, type PaletteColorOptions, responsiveFontSizes, type Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string): PaletteColorOptions => augmentColor({ color: { main: mainColor } });

export const theme = responsiveFontSizes(
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
                    default: createColor("#808080"), // updated
                    paper: createColor("#FFFFFF"), // updated
                    primary: createColor("#2962FF"), // updated
                    secondary: createColor("#4B9EFF"), // updated
                    accent: createColor("#e0e0e0"), // updated
                    background: {
                        default: "#f0f2f5", // updated
                        paper: "#FFFFFF", // updated
                    },
                }
            },
            dark: {
                palette: {
                    error: createColor("#F9958D"),
                    warning: createColor("#fdd08b"),
                    info: createColor("#aed3ff"),
                    success: createColor("#d5f2b8"),
                    default: createColor("#f6f7f8"), // updated
                    paper: createColor("#1e1e1e"), // updated for dark theme paper
                    primary: createColor("#5C87FF"), // updated
                    secondary: createColor("#3584E6"), // updated
                    accent: createColor("#30363e"), // updated
                    background: {
                        default: "#121212", // updated
                        paper: "#1e1e1e", // updated
                    },
                }
            }
        }
    })
);

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  });

export default memo(function MuiThemeProvider({ children }: PropsWithChildren): React.ReactElement {
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