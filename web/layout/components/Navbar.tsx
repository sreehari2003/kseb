import { Box, Flex, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';

export const Navbar = () => (
  <Flex
    p="7"
    height="90px"
    backgroundColor="teal"
    justifyContent="space-between"
    boxShadow="md"
    alignItems="center"
  >
    <Link href="/">
      <Heading
        fontSize="30px"
        fontWeight="400"
        _hover={{ cursor: 'pointer', shadow: 'md' }}
        transition="2ms"
      >
        Suraksha
      </Heading>
    </Link>
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
