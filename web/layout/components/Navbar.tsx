import { Box, Flex, Button, Input, InputGroup, InputLeftElement, Image } from '@chakra-ui/react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();
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
        <Image src="/logo.png" w="200px" />
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
        <Button colorScheme="teal" onClick={() => router.push('/auth')}>
          Login
        </Button>
      </Box>
    </Flex>
  );
};
