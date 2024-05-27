import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  borderRadius: 0, // disable the border radius
  fontWeight: "normal", // change the font weight to normal
  fontFamily: "mono", // change the font family to monospaced
});

const sizes = {
  md: defineStyle({
    fontSize: "sm", // Change font size to sm (14px)
  }),
};

const fillVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    fontFamily: "sans-serif",
    bg: `${c}`,
    fontWeight: "medium",
    color: "white",
    border: `1px solid`,
    borderRadius: "xl",
    transition: "transform 0.15s ease-out, background 0.15s ease-out",
    _dark: {
      bg: `${c}`,
      color: "gray.800",
    },

    _hover: {
      color: `${c}`,
      bg: `transparent`,
      border: `1px solid`,
      _dark: {
        bg: `${c}.200`,
      },
    },
  };
});

const fillDarkVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    fontFamily: "sans-serif",
    bg: `${c}.600`,
    fontWeight: "medium",
    color: "white",
    border: `1px solid`,
    borderRadius: "xl",
    transition: "transform 0.15s ease-out, background 0.15s ease-out",
    _dark: {
      bg: `${c}`,
      color: "gray.800",
    },

    _hover: {
      color: `white`,
      bg: `${c}.800`,
      _dark: {
        bg: `${c}.200`,
      },
    },
  };
});

const outlineVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    fontFamily: "sans-serif",
    color: `${c}`,
    fontWeight: "medium",
    border: `1px solid`,
    borderRadius: "xl",
    transition: "transform 0.15s ease-out, background 0.15s ease-out",
    _dark: {
      bg: `${c}`,
      color: "gray.800",
    },

    _hover: {
      color: "white",
      bg: `${c}`,
      border: `1px solid`,
      _dark: {
        bg: `${c}.200`,
      },
    },
  };
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    fillVariant: fillVariant,
    outlineVariant,
    fillDarkVariant,
  },
  defaultProps: {
    colorScheme: "purple", // set the default color scheme to purple
  },
});
