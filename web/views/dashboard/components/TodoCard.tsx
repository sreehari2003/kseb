import React from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

export const TodoCard = () => (
  <Box w="450px" bg="#418E9E" h="230px" borderRadius="3xl">
    <Flex mb="15px">
      <Heading mt="20px" ml="20px" lineHeight="20px" fontSize="large" fontWeight="medium">
        Task 1
      </Heading>
      <Heading
        mt="20px"
        ml="250px"
        lineHeight="20px"
        color="#C5BDBD"
        fontSize="large"
        fontWeight="medium"
      >
        2023 may 30
      </Heading>
    </Flex>
    <Flex justifyContent="flex-start" alignItems="flex-start" width="440px">
      <Heading
        width="160px"
        ml="20px"
        lineHeight="30px"
        fontSize="xl"
        fontWeight="bold"
        color="white"
      >
        Task Provider &nbsp; &nbsp;:
      </Heading>
      <Heading width="260px" lineHeight="30px" fontSize="medium" fontWeight="medium" color="white">
        yaser
      </Heading>
    </Flex>
    <Flex mt="15px" justifyContent="flex-start" alignItems="flex-start" width="440px">
      <Heading
        width="160px"
        ml="20px"
        lineHeight="30px"
        fontSize="xl"
        fontWeight="bold"
        color="white"
      >
        Location &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :
      </Heading>
      <Heading width="260px" lineHeight="30px" fontSize="medium" fontWeight="medium" color="white">
        kozhikode
      </Heading>
    </Flex>
    <Flex mt="15px" justifyContent="flex-start" alignItems="flex-start" width="440px">
      <Heading
        width="160px"
        ml="20px"
        lineHeight="30px"
        fontSize="xl"
        fontWeight="bold"
        color="white"
      >
        Discription &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:
      </Heading>
      <Heading width="260px" lineHeight="30px" fontSize="medium" fontWeight="medium" color="white">
        fuise disconnection
      </Heading>
    </Flex>
    <Flex>
      <Button
        ml="320px"
        mt="15px"
        color="#000000"
        fontWeight="extrabold"
        colorScheme="#418E9E"
        borderColor="#000000"
        size="xs"
        border="1px"
      >
        Mark as done
      </Button>
    </Flex>
  </Box>
);
