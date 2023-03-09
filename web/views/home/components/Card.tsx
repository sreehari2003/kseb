import { Issue } from '@app/types';
import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

export const Card = ({ id, title, desc, post_id }: Issue) => (
  <Box borderWidth="1px" borderRadius="13.42px" color="#FFFFFF" height="306px" width="402.63px">
    <Box
      borderWidth="1px"
      borderRadius="13.42px"
      backgroundColor="#D9D9D9"
      height="123.47px"
      width="362.37px"
      ml="20.13px"
      mt="20.13px"
    />
    <Heading color="black">{desc}</Heading>
    <Heading color="black">{id}</Heading>
    <Heading color="black">{title}</Heading>
    <Heading color="black">{post_id}</Heading>
  </Box>
);
