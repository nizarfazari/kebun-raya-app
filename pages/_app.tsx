import type { AppProps } from "next/app";
import Layout from "~/layouts/layout";
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/fonts.scss';
import "~/styles/main.scss";
import { theme } from "~/theme/themeConfig";
import { fonts } from '../lib/font'



export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <style jsx global>
      {`
        :root {
          --font-rubik: ${fonts.rubik.style.fontFamily};
        }
      `}
    </style>
    <Layout>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Layout>
    </>
  );
}