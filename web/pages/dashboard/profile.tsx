import { Profile } from '@app/views/dashboard/components/Profile';
import React from 'react';
import { BaseLayout } from '@app/layout';

const profileOne = () => {
  return <Profile />;
};
profileOne.Layout = BaseLayout;
export default profileOne;
