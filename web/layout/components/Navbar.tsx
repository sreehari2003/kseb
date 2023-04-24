import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/auth');
  };
  return (
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
        <Button onClick={handleLoginClick} colorScheme="teal" borderColor="teal">
          Log in
        </Button>
      </Box>
    </Flex>
  );
};
