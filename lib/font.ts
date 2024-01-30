// lib/fonts.ts
import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ["latin"],
    variable: "--font-robotto",
    weight: ["100", '400']
});

export const fonts = {
  roboto,
};
