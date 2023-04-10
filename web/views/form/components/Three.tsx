import { Flex, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

export const Three = () => (
  <Flex alignItems="Flex-start" justifyContent="center">
    <Flex direction="column" w="70%">
      <Heading textAlign="center" mb="5">
        PART 2
      </Heading>

      <FormControl id="input1" mb={4} mt={10}>
        <FormLabel>Power outages</FormLabel>
        <Input variant="flushed" />
      </FormControl>
      <FormControl id="input2" mb={4}>
        <FormLabel>Shorted locations</FormLabel>

        <Input variant="flushed" />
      </FormControl>
      <FormControl id="input3" mb={4}>
        <FormLabel mb="3">Earthed locations</FormLabel>
        <Input mb="3" variant="flushed" />
      </FormControl>
    </Flex>
  </Flex>
);
