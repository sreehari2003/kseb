import React from 'react';
import { Box, Center, Flex, Heading, Grid, GridItem, Button } from '@chakra-ui/react';
import { DashBoardLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';
import { TodoCard } from '@app/views/dashboard';

const Todo: NextPageWithLayout = () => (
  <Box>
    <Flex flexDirection="row">
      <Heading
        mt="20px"
        ml="20px"
        lineHeight="44px"
        fontSize="3xl"
        fontWeight="extrabold"
        width="438px"
        height="71.13px"
      >
        Todo list
      </Heading>
      <Button
        width="180px"
        height="40px"
        colorScheme="#FFFDFD"
        size="md"
        mt="20px"
        ml="300px"
        borderRadius="13px"
        border="2px"
        borderColor="#D1D1D180"
      >
        <Heading
          mt="20px"
          color="#418E9E"
          lineHeight="44px"
          fontSize="xl"
          fontWeight="medium"
          width="438px"
          height="71.13px"
        >
          + New Task
        </Heading>
      </Button>
    </Flex>
    <Grid ml="10px" mt="-20px" alignItems="center" justifyContent="center">
      <GridItem w="950px" h="3px" bg="#D1D1D180" />
    </Grid>
    <Center flexWrap="wrap" gap="20px" p="20px">
      <TodoCard />
      <TodoCard />
      <TodoCard />
      <TodoCard />
    </Center>
  </Box>
);
Todo.Layout = DashBoardLayout;

export default Todo;
