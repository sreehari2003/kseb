import React from 'react';
import { Box, Flex, Heading, Grid, GridItem, Button } from '@chakra-ui/react';
import { DashBoardLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';
import { TodoCard } from '@app/views/dashboard';

const Todo: NextPageWithLayout = () => (
  <Box>
    <Heading
      mt="20px"
      ml="20px"
      lineHeight="44px"
      fontSize="3xl"
      fontWeight="extrabold"
      height="71.13px"
    >
      Todo list
    </Heading>
    <Grid ml="10px" mt="-20px" alignItems="center" justifyContent="center">
      <GridItem  h="3px" bg="#D1D1D180" />
    </Grid>
    <Flex flexWrap="wrap" gap="20px" p="20px" flexDir={{base:"column",lg:"row"}} alignItems={{base:"center",md:"normal"}} justifyContent={{base:"center",md:"normal"}}>
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
    </Flex>
  </Box>
);
Todo.Layout = DashBoardLayout;

export default Todo;
