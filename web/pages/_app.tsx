/* eslint-disable react/jsx-props-no-spreading */
import '@fontsource/inter/700.css';
import { Child } from '@app/types';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { authConfig } from '@app/auth';
import { AuthCtxWrapper } from '@app/context/Auth';

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
      <AuthCtxWrapper>
        <Head>
          <title>Suraksha | KSEB</title>
        </Head>
        {Component.Layout ? (
          <Component.Layout>
            <Component {...pageProps} />
          </Component.Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthCtxWrapper>
    </ChakraProvider>
  </SuperTokensWrapper>
);

export default RootLayout;
