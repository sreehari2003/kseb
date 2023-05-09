import { Profile } from '@app/views/dashboard/components/Profile';
import React from 'react';
import { DashBoardLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';

const profileOne: NextPageWithLayout = () => <Profile />;
profileOne.Layout = DashBoardLayout;
export default profileOne;
