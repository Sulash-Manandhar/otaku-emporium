import { extendTheme } from "@chakra-ui/react";
import { ButtonTheme as Button } from "./components/ButtonTheme";
import { HeadingTheme as Heading } from "./components/HeadingTheme";
import { TooltipTheme as Tooltip } from "./components/TooltipTheme";
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
    green: {
      400: "#0AC5A8",
    },
    gray: {
      400: "#EBEBEB",
      300: "#f5f5f5",
    },
  },
  shadows: {
    light: "0px 1px 15px #00000029",
    box: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  components: {
    Button,
    Heading,
    Tooltip,
  },
});
