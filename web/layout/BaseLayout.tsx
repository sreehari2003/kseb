import { Child } from '@app/types';
import React from 'react';
import { Navbar } from '@app/layout/index';
import { useAuthCtx } from '@app/hooks';
import { PageLoader } from '@app/components/loader';

export const BaseLayout = ({ children }: Child) => {
  const { isUserLoading } = useAuthCtx();
  return (
    <>
      <Navbar />
      <PageLoader isOpen={isUserLoading} />
      {children}
    </>
  );
};
