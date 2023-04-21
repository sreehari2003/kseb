import { Box, Button, Center, Icon, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import React from 'react';
import { GrAdd } from 'react-icons/gr';

export const Loader = () => (
  <Box minH="100vh">
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
      <Button
        colorScheme="teal"
        shadow="lg"
        rounded="full"
        right={{ base: '10', md: '90' }}
        bottom="10"
        position="fixed"
        p="6"
        disabled
      >
        <Icon as={GrAdd} color="white" fontSize="20px" />
      </Button>
    </Center>
  </Box>
);
