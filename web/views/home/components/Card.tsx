import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { Issue } from '@app/types';
import dayjs from 'dayjs';
import React from 'react';
import { useRouter } from 'next/router';

export const Card = ({ id, title, desc, post_id, CreatedAt, UpdatedAt, onClick }: Issue) => {
  const router = useRouter();

  return (
    <Box
      borderWidth="1px"
      borderRadius="13.42px"
      color="#FFFFFF"
      minHeight="306px"
      width="300px"
      p="4"
    >
      <Flex justifyContent="space-between" mb="15px">
        <Text color="grey">{dayjs(CreatedAt).format('DD/MM/YYYY')}</Text>
        <Text color="grey">Updated:{dayjs(UpdatedAt).format('DD/MM/YYYY')}</Text>
      </Flex>
      <Heading color="black" fontSize="25px" mb="20px">
        {title.toLocaleUpperCase()}
      </Heading>
      <Heading color="black" fontSize="20px">
        Post number:{post_id}
      </Heading>
      <Text color="black" mt="20px">
        {desc}
      </Text>
      <Flex justifyContent="space-between" mt="20px">
        <Button colorScheme="teal" variant="outline" onClick={onClick}>
          View Status
        </Button>
        <Button colorScheme="teal" onClick={() => router.push(`/${id}`)}>
          More Info
        </Button>
      </Flex>
    </Box>
  );
};
