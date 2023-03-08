/* eslint-disable react/jsx-props-no-spreading */
import '@fontsource/inter/700.css';
import { Child } from '@app/types';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { authConfig } from '@app/auth';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    Layout?: (arg: Child) => JSX.Element;
  };
};

if (typeof window !== 'undefined') {
  SuperTokens.init(authConfig());
}

const RootLayout = ({ Component, pageProps }: ComponentWithPageLayout) => (
  <SuperTokensWrapper>
    <ChakraProvider>
      {Component.Layout ? (
        <Component.Layout>
          <Component {...pageProps} />
        </Component.Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </ChakraProvider>
  </SuperTokensWrapper>
);

export default RootLayout;
