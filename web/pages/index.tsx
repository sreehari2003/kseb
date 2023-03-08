import {
  Box,
  Button,
  Center,
  Icon,
  useDisclosure,
  Heading,
  InputGroup,
  Flex,
  Input,
  useToast,
  InputLeftElement,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { Card, IssueModal } from '@app/views/home';
import { BsSearch } from 'react-icons/bs';
import { Issue } from '@app/types';

import { surakshaAPI } from '@app/config';

const App = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<Issue[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const { data: dats } = await surakshaAPI.get('/issue');
        if (!dats.ok) {
          throw new Error();
        }
        setData(dats.data);
      } catch {
        toast({
          title: 'Failed to get all issues',
          description: 'Request to get issues returned error',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Box minH="100vh">
        <Flex
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
        <Center
          flexWrap="wrap"
          flexDir={{ base: 'column', md: 'row' }}
          columnGap="50px"
          rowGap="50px"
          p="6"
        >
          <Box padding="6" boxShadow="lg" bg="white" w="400px" h="300px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" w="400px" h="300px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" w="400px" h="300px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" w="400px" h="300px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" w="400px" h="300px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" w="400px" h="300px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" w="400px" h="300px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" w="400px" h="300px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" w="400px" h="300px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
        </Center>
      </Box>
    );
  }

  return (
    <>
      <IssueModal isOpen={isOpen} onClose={onClose} setData={setData} />
      <Box minH="100vh">
        <Flex
          p="7x"
          height="90px"
          width="107%"
          backgroundColor="#7B8DDB"
          justifyContent="space-around"
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
        <Center
          flexWrap="wrap"
          position="relative"
          flexDir={{ base: 'column', md: 'row' }}
          columnGap="50px"
          rowGap="50px"
          p="6"
        >
          {data &&
            data.map((el) => (
              <Card
                desc={el.title}
                title={el.title}
                CreatedAt={el.CreatedAt}
                DeletedAt={el.DeletedAt}
                post_id={el.post_id}
                id={el.id}
                UpdatedAt={el.UpdatedAt}
              />
            ))}
          <Button
            colorScheme="purple"
            shadow="lg"
            rounded="full"
            right={{ base: '10', md: '90' }}
            bottom="10"
            position="fixed"
            p="6"
            onClick={() => onOpen()}
          >
            <Icon as={GrAdd} color="white" fontSize="20px" />
          </Button>
        </Center>
      </Box>
    </>
  );
};

export default App;
