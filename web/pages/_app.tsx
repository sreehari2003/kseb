/* eslint-disable react/jsx-props-no-spreading */
import '@fontsource/inter/700.css';
import { Child } from '@app/types';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    Layout?: (arg: Child) => JSX.Element;
  };
};

const RootLayout = ({ Component, pageProps }: ComponentWithPageLayout) => (
  <ChakraProvider>
    {Component.Layout ? (
      <Component.Layout>
        <Component {...pageProps} />
      </Component.Layout>
    ) : (
      <Component {...pageProps} />
    )}
  </ChakraProvider>
);

export default RootLayout;
