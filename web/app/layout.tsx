'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '@app/theme';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head />
    <body>
      <CacheProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </body>
  </html>
);

export default RootLayout;
