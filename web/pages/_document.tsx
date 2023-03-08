import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { theme } from '@app/theme';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Suraksha-KSEB</title>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
