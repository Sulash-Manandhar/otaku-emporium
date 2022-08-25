import { extendTheme } from "@chakra-ui/react";
import { ButtonTheme as Button } from "./components/ButtonTheme";
import { HeadingTheme as Heading } from "./components/HeadingTheme";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "Roboto, sans-serif",
        fontSize: "16px",
      },
    },
  },
  textStyles: {
    //base size:18px, scale:1.250(Major Third)
    garamond: {
      fontFamily: "EB Garamond, serif",
    },
  },
  colors: {
    primary: {
      300: "#0C794A",
      400: "#77ACB7",
    },
    secondary: {
      300: "#E4E4E8",
      400: "#1A1A1A",
    },
    danger: {
      300: "#FCF2F6",
      400: "#F8B097",
      500: "#8A4229",
    },
    success: {
      400: "#0C794A",
      500: "#5F797F",
    },
  },
  shadows: {
    light: "0px 1px 15px #00000029",
  },
  components: {
    Button,
    Heading,
  },
});
