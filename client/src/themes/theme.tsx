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
    primary: {
      10: "#F3F0F5",
      25: "#E1DBE5",
      50: "#C3B6CB",
      75: "#A591B1",
      100: "#876D97",
    },
    secondary: {
      10: "#F3EEF2",
      25: "#E2D5DE",
      50: "#C5ABBD",
      75: "#A9809D",
      100: "#8C567C",
    },
    danger: {
      10: "#FFF3F2",
      25: "#FFE0DF",
      50: "#FFC1C0",
      75: "#FFA2A0",
      100: "#FF8381",
    },
    black: {
      5: "#F3F3F3",
      10: "#E7E7E7",
      25: "#C3C2C3",
      50: "#868587",
      75: "#4A484B",
      100: "#0D0B0F",
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
