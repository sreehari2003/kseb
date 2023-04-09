import { Box, Heading, Flex, Text } from '@chakra-ui/react';
import { Issue } from '@app/types';
import dayjs from 'dayjs';
import React from 'react';
import { useRouter } from 'next/router';

export const Card = ({ id, title, desc, post_id, CreatedAt, UpdatedAt }: Issue) => {
  const router = useRouter();

  return (
    <Box
      borderWidth="1px"
      borderRadius="13.42px"
      color="#FFFFFF"
      minHeight="306px"
      width="402.63px"
      p="4"
      onClick={() => router.push(`/${id}`)}
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
    </Box>
  );
};
