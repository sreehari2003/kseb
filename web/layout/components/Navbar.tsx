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
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { useAuthCtx } from '@app/hooks';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { surakshaAPI } from '@app/config';
import { SideBar } from './SideBar';

interface INav {
  // eslint-disable-next-line react/require-default-props
  isDashBoard?: boolean;
}

export const Navbar = ({ isDashBoard = false }: INav) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [input, setUserInput] = useState<string>('1');
  const { isAuth } = useAuthCtx();

  const getPostData = async () => {
    try {
      const { data, status } = await surakshaAPI.get(`/issue/search?post_id=${input}`);
      console.log(data, status);
    } catch {
      console.log('Error');
    }
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
      {isDashBoard && isAuth && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<GiHamburgerMenu />}
            variant="outline"
            colorScheme="whiteAlpha"
          />
          <MenuList background="transparent" border="none">
            <SideBar />
          </MenuList>
        </Menu>
      )}
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
