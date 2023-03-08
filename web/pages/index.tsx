import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import { Card, IssueModal } from '@app/views/home';

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box width="100%" h="100vh">
      <IssueModal isOpen={isOpen} onClose={onClose} />
      <Flex
        bg="red"
        p="7"
        height="90px"
        backgroundColor="#7B8DDB"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading fontSize="30px" fontWeight="400">
          Suraksha
        </Heading>
        <Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BsSearch />
            </InputLeftElement>
            <Input type="string" placeholder="search" />
          </InputGroup>
        </Box>
      </Flex>
      <Flex flexWrap="wrap" position="relative" flexDir={{ base: 'column', md: 'row' }}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Button
          colorScheme="purple"
          shadow="lg"
          rounded="full"
          right="90"
          bottom="10"
          position="fixed"
          p="6"
          onClick={() => onOpen()}
        >
          <Icon as={GrAdd} color="white" fontSize="20px" />
        </Button>
      </Flex>
    </Box>
  );
};

export default App;
