// app/layout.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <head />
      <body>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}