import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Image,
  Button,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  return (
    <Flex
      p="7px"
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
        <InputGroup w="100%">
          <InputLeftElement pointerEvents="none">
            <BsSearch />
          </InputLeftElement>
          <Input type="string" placeholder="search" bg="white" onFocus={onOpen} />
        </InputGroup>
      </Box>
      <Box>
        <Button colorScheme="teal">
          <Link href="/auth">Login</Link>
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Input type="string" placeholder="search" bg="white" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
