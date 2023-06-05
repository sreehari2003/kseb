import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Child } from '@app/types';
import { useAuthCtx } from '@app/hooks';
import { PageLoader } from '@app/components/loader';
import { Navbar } from './components/Navbar';
import { SideBar } from './components/SideBar';

export const DashBoardLayout = ({ children }: Child) => {
  const { isUserLoading } = useAuthCtx();
  return (
    <Box minH="100vh">
      <PageLoader isOpen={isUserLoading} />
      <Navbar isDashBoard />
      <Flex>
        <Box display={{ base: 'none', md: 'block' }}>
          <SideBar />
        </Box>
        {children}
      </Flex>
    </Box>
  );
};
