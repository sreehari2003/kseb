import React from 'react';
import { DashBoardLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';

const Team: NextPageWithLayout = () => <div>team</div>;

Team.layout = DashBoardLayout;

export default Team;
