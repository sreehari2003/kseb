import { Box, Flex } from '@chakra-ui/react';
import { Child } from '@app/types';

import { Navbar } from './components/Navbar';
import { SideBar } from './components/SideBar';

export const DashBoardLayout = ({ children }: Child) => (
  <Box minH="100vh">
    <Navbar isDashBoard />
    <Flex>
      <Box display={{ base: 'none', md: 'block' }}>
        <SideBar />
      </Box>
      {children}
    </Flex>
  </Box>
);
