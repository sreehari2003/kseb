import React from 'react';
import { Box, Flex, Heading, Input } from '@chakra-ui/react';

export const TodoCard = () => (
  <Box w="450px" bg="#418E9E" h="230px" borderRadius="3xl" >
    <Flex mb="15px">
    <Heading
        mt="20px"
        ml="20px"
        lineHeight="20px"
        fontSize="large"
        fontWeight="medium"
      >
        Task 1
      </Heading>
      <Heading
        mt="20px"
        ml="250px"
        lineHeight="20px"
        color="#C5BDBD"
        fontSize="large"
        fontWeight="medium"
      >
        2023 may 30
      </Heading>
    </Flex>
    <Heading
        mt="20px"
        ml="20px"
        lineHeight="20px"
        fontSize="large"
        fontWeight="medium"
      >
        Task 1
      </Heading> <Input  variant='unstyled' placeholder=' : name' />
  </Box>
);
