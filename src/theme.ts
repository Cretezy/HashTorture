import { ChakraTheme, extendTheme } from "@chakra-ui/react";

const Button: ChakraTheme["components"]["Button"] = {
  defaultProps: {
    colorScheme: "black",
  },
  variants: {
    solid: {
      border: "3px solid #aaa",
      p: 8,
      borderRadius: 0,
    },
  },
};

const Modal: ChakraTheme["components"]["Modal"] = {
  baseStyle: {
    dialog: {
      bg: "#111",
    },
    header: {
      textAlign: "center",
      p: 8,
    },
    body: {
      textAlign: "center",
      px: 8,
    },
    footer: {
      p: 8,
    },
  },
};

export const theme = extendTheme({
  components: {
    Button,
    Modal,
  },

  styles: {
    global: {
      body: {
        bg: "black",
        color: "white",
      },
    },
  },

  fonts: {
    heading: `"Press Start 2P", sans-serif`,
    body: `"Press Start 2P", sans-serif`,
  },

  colors: {
    black: {
      500: "#222",
      600: "#2a2a2a",
      700: "#333",
    },
  },
});
