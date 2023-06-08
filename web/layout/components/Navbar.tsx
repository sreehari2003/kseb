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
import { useRouter } from 'next/router';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAuthCtx } from '@app/hooks';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Issue } from '@app/types';
import { debounce } from '@app/utils/debounce';
import { surakshaAPI } from '@app/config';
import { SideBar } from './SideBar';

interface INav {
  // eslint-disable-next-line react/require-default-props
  isDashBoard?: boolean;
}

export const Navbar = ({ isDashBoard = false }: INav) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [result, setResult] = useState<Issue[] | null>(null);
  const { data: userData } = useAuthCtx();
  const { doesSessionExist } = useSessionContext() as any;

  const getPostData = async (str: string): Promise<void> => {
    try {
      const { data, status } = await surakshaAPI.get(`/issue/search?post_id=${str}`);
      if (status === 200) {
        setResult(data.data);
      }
    } catch {
      // console.error('Network error cant search for user');
    }
  };
  const router = useRouter();
  const goToDashboard = () => {
    if (!userData || !userData.is_verified) {
      router.push('/dashboard/profile');
    } else {
      router.push('/dashboard');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadPost = useCallback(
    debounce((inputValue: string) => {
      getPostData(inputValue);
    }),
    []
  );

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
      <Box display={{ sm: 'none', md: 'block' }}>
        <InputGroup w="100%">
          <InputLeftElement pointerEvents="none">
            <BsSearch />
          </InputLeftElement>
          <Input type="string" placeholder="search" bg="white" onFocus={onOpen} />
        </InputGroup>
      </Box>
      <Box>
        {doesSessionExist ? (
          <Button
            colorScheme="teal"
            display={{ base: 'none', md: 'block' }}
            onClick={goToDashboard}
          >
            dashboard
          </Button>
        ) : (
          <Button colorScheme="teal">
            <Link href="/auth">Login</Link>
          </Button>
        )}
      </Box>
      {isDashBoard && doesSessionExist && (
        <Menu>
          <MenuButton
            display={{ base: 'block', md: 'none' }}
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
              // debouncing user search
              onChange={(e) => loadPost(e.target.value, getPostData)}
            />
            <Box mt="10px" gap="10px">
              {result?.map((el) => (
                <Button
                  colorScheme="teal"
                  w="full"
                  onClick={() => router.push(`/dashboard/${el.id}`)}
                >
                  {el.title}
                </Button>
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
