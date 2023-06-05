import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

export const TodoCard = () => (
  <Box w="529px" bg="#418E9E" h="308px" borderRadius="2xl">
    <Flex>
      <Heading>Task</Heading>
      <Heading>22-03-2003</Heading>
    </Flex>
  </Box>
);
