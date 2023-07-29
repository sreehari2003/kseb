import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { Issue } from '@app/types';
import dayjs from 'dayjs';
import React from 'react';
import { useRouter } from 'next/router';

interface Icard extends Issue {
  // eslint-disable-next-line react/require-default-props
  isAdmin?: boolean;
}

export const Card = ({
  ID,
  title,
  desc,
  postID,
  CreatedAt,
  UpdatedAt,
  onClick,
  isAdmin = false,
}: Icard) => {
  const router = useRouter();

  return (
    <Box
      borderWidth="1px"
      borderRadius="13.42px"
      color="#FFFFFF"
      width="300px"
      p="4"
      key={ID}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex justifyContent="space-between" mb="15px">
        <Text color="grey">{dayjs(CreatedAt).format('DD/MM/YYYY')}</Text>
        <Text color="grey">Updated:{dayjs(UpdatedAt).format('DD/MM/YYYY')}</Text>
      </Flex>
      <Heading color="black" fontSize="25px" mb="20px">
        {title.toLocaleUpperCase()}
      </Heading>
      <Heading color="black" fontSize="20px">
        Post number:{postID}
      </Heading>
      <Text color="black" mt="20px">
        {desc}
      </Text>
      <Flex justifyContent="space-between" mt="20px" gap="20px">
        <Button colorScheme="teal" variant="outline" onClick={onClick} w="100%">
          View Status
        </Button>
        {isAdmin && (
          <Button colorScheme="teal" onClick={() => router.push(`/dashboard/${ID}`)} w="100%">
            More Info
          </Button>
        )}
      </Flex>
    </Box>
  );
};
