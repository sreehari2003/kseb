import { Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import React from 'react';

export const Two = () => (
  <Flex alignItems="Flex-start" justifyContent="center">
    <Flex direction="column" w="70%">
      <FormControl id="input1" mb={4}>
        <FormLabel mt="10" mb="3">
          job description
        </FormLabel>
        <Input variant="flushed" />
      </FormControl>
      <FormControl id="input2" mb={4}>
        <FormLabel mb="3">PTW allows for the above work</FormLabel>
        <InputGroup mb="3">
          <InputLeftAddon>PTW no.</InputLeftAddon>
          <Input placeholder="0000" />
        </InputGroup>
      </FormControl>
      <FormControl id="input3" mb={4}>
        <FormLabel mb="3">Name of the officer/designation issuing the PTW</FormLabel>
        <Input mb="3" variant="flushed" />
      </FormControl>
      <FormControl id="input4" mb={4}>
        <FormLabel mb="3">Name/designation of officer receiving PTW</FormLabel>
        <Input mb="3" variant="flushed" />
      </FormControl>
    </Flex>
  </Flex>
);
