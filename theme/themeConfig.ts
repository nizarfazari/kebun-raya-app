import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./buttonTheme";

export const theme = extendTheme({
  colors: {
    primary: {
      100: "#D5FED5",
      200: "#B0EFB0",
      300: "#84F284",
      400: "#3AC23A",
      500: "#4B8E4B",
      600: "#338133",
      700: "#1D6D1D",
      800: "#0D4B0D",
    },
    gray: {
      100: "#fafafa",
      200: "#f7f7f7",
    },
    secondary: "#3498DB",
  },
  components: {
    Button: buttonTheme,
  },
});
