import React from 'react';
import { Box, Image, Text, Heading } from '@chakra-ui/react';

export const Error = () => (
  <Box textAlign="center" margin="auto">
    <Image src="https://i.imgur.com/qIufhof.png" alt="500 internal server error" height="300" />

    <Heading fontSize="35px" mt="1em" textAlign="center">
      <span>500</span> <br />
      Internal server error
    </Heading>
    <Text mt="1em">We are currently trying to fix the problem.</Text>
  </Box>
);
