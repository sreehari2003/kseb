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
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { surakshaAPI } from '@app/config';

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [input, setUserInput] = useState<string>('');

  const getPostData = async () => {
    const { data, status } = await surakshaAPI.get(`/issue/search?post_id=${input}`);
    console.log(data, status);
  };

  useEffect(() => {
    (async () => {
      await getPostData();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);
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
            <Input
              type="string"
              placeholder="search post number"
              bg="white"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
