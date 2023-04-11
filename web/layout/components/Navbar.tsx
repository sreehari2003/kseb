import { Box, Flex, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';

export const Navbar = () => (
  <Flex
    p="7"
    height="90px"
    backgroundColor="teal"
    justifyContent="space-between"
    boxShadow="md"
    alignItems="center"
  >
    <Heading fontSize="30px" fontWeight="400">
      Suraksha
    </Heading>
    <Box>
      <InputGroup w="350px">
        <InputLeftElement pointerEvents="none">
          <BsSearch />
        </InputLeftElement>
        <Input type="string" placeholder="search" bg="white" />
      </InputGroup>
    </Box>
    <Box>
      <Heading>fb</Heading>
    </Box>
  </Flex>
);
