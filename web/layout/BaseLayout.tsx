import { Child } from '@app/types';
import React from 'react';
import { Navbar } from '@app/layout/index';

export const BaseLayout = ({ children }: Child) => (
  <>
    <Navbar />
    {children}
  </>
);
