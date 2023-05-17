import React from 'react';
import { Center } from '@chakra-ui/react';
import { DashBoardLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';
import { TodoCard } from '@app/views/dashboard';

const Todo: NextPageWithLayout = () => (
  <Center flexWrap="wrap" gap="60px" p="40px">
    <TodoCard />
    <TodoCard />
    <TodoCard />
    <TodoCard />
  </Center>
);
Todo.Layout = DashBoardLayout;

export default Todo;
