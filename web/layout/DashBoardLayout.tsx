import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Child } from '@app/types';
import { useAuthCtx } from '@app/hooks';
import { PageLoader } from '@app/components/loader';
import { Navbar } from './components/Navbar';
import { SideBar } from './components/SideBar';

export const DashBoardLayout = ({ children }: Child) => {
  const { isUserLoading } = useAuthCtx();
  return (
    <>
      <PageLoader isOpen={isUserLoading} />
      <Navbar />
      <Flex>
        <SideBar />
        {children}
      </Flex>
    </>
  );
};
