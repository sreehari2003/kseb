<<<<<<< HEAD
import { Box, Flex, Button, Input, InputGroup, InputLeftElement, Image } from '@chakra-ui/react';
=======
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
>>>>>>> f4d61a1 (fix: removed state and added final focus)
import { BsSearch } from 'react-icons/bs';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navbar = () => {
<<<<<<< HEAD
  const router = useRouter();
=======
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

>>>>>>> f4d61a1 (fix: removed state and added final focus)
  return (
    <Flex
      p="7"
      height="90px"
      backgroundColor="teal"
      justifyContent="space-between"
      boxShadow="md"
      alignItems="center"
      ref={finalRef}
    >
      <Link href="/">
        <Image src="/logo.png" w="200px" />
      </Link>
      <Box>
<<<<<<< HEAD
        <InputGroup w="350px">
=======
        <InputGroup w="350px" onClick={onOpen}>
>>>>>>> f4d61a1 (fix: removed state and added final focus)
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
<<<<<<< HEAD
=======
      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Input type="string" placeholder="search" bg="white" />
          </ModalBody>
        </ModalContent>
      </Modal>
>>>>>>> f4d61a1 (fix: removed state and added final focus)
    </Flex>
  );
};
