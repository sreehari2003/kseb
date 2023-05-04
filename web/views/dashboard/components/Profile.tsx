import { FormLabel, Box, FormControl, Input } from '@chakra-ui/react';
import React from 'react';

export const Profile = () => (
  <Box p="6">
    <form>
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input type="text" />
      </FormControl>
    </form>
  </Box>
);
