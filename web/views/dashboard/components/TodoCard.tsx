import React from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

type Info = {
  number: number;
  desc: string;
  admin: string;
  location: string;
  date: string;
  finish: () => Promise<void>;
};

export const TodoCard = ({ number, desc, admin, location, date, finish }: Info) => (
  <Box minW="450px" bg="#418E9E" h="230px" borderRadius="3xl">
    <Flex mb="15px">
      <Heading mt="20px" ml="20px" lineHeight="20px" fontSize="large" fontWeight="medium">
        Task {number}
      </Heading>
      <Heading
        mt="20px"
        ml="250px"
        lineHeight="20px"
        color="#C5BDBD"
        fontSize="large"
        fontWeight="medium"
      >
        {date.slice(0, 10)}
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
        {admin}
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
        {location}
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
        Description &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:
      </Heading>
      <Heading width="260px" lineHeight="30px" fontSize="medium" fontWeight="medium" color="white">
        {desc}
      </Heading>
    </Flex>
    <Button
      mt="10px"
      ml="10px"
      alignSelf="flex-end"
      color="#000000"
      fontWeight="extrabold"
      colorScheme="#418E9E"
      borderColor="#000000"
      size="sm"
      border="1px"
      onClick={finish}
    >
      Mark as done
    </Button>
  </Box>
);
