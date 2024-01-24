import type { AppProps } from "next/app";
import Layout from "~/layouts/layout";
// pages/_app.js

import "~/styles/main.scss";
import '../styles/fonts.scss';
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "~/theme/themeConfig";
import { fonts } from '../lib/font'



export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <main className={fonts.roboto.className}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </main>
    </>
  );
}