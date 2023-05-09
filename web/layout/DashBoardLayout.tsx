import { Child } from '@app/types';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Navbar } from './components/Navbar';
import { SideBar } from './components/SideBar';

export const DashBoardLayout = ({ children }: Child) => (
  <>
    <Navbar />
    <Flex>
      <SideBar />
      {children}
    </Flex>
  </>
);
