/* theme.ts */
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({  
  colors: {
    primary: {
      100 : '#D5FED5',
      200 : '#B0EFB0',
      300 : '#D5FED5',
      400 : '#D5FED5',
      500 : '#D5FED5',
      600 : '#D5FED5',
      700 : '#D5FED5',
      800 : '#D5FED5',
      900 : '#D5FED5',
      1000 : '#D5FED5',
    },
    gray: {
      100: '#fafafa',
      200: '#f7f7f7',
    },
    secondary: '#3498DB',
  },
  fonts: {
    heading: "var(--font-rubik)",
    body: "var(--font-rubik)",
  },
});
