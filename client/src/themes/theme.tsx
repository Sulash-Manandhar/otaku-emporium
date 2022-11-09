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
        color: "black.75",
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
    red: {
      400: "#EC2330",
      500: "#dd212d",
    },
    black: {
      300: "#333d44",
      400: "#1F2A31",
    },
    form: {
      labe: "#F0F0E8",
      background: "#333131",
      errorOutline: "#E41E2A",
      errorLabel: "#EB565F",
      errorBackground: "#8C3D42",
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
