import { Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon,FormErrorMessage } from '@chakra-ui/react';
import React from 'react';

export const Two = () => (
  <Flex justifyContent="center" w={{ base: '400px', md: '800px' }}>
    <Flex direction="column" w="100%">
      <FormControl id="input1" mb={4}>
        <FormLabel mt="10" mb="3">
          job description
        </FormLabel>
        <Input />
        <FormErrorMessage>discription should not be empty</FormErrorMessage>
      </FormControl>
      <FormControl id="input2" mb={4}>
        <FormLabel mb="3">PTW allows for the above work</FormLabel>
        <InputGroup mb="3">
          <InputLeftAddon>PTW no.</InputLeftAddon>
          <Input placeholder="0000" />
        </InputGroup>
        <FormErrorMessage>PTW number should not be empty</FormErrorMessage>
      </FormControl>
      <FormControl id="input3" mb={4}>
        <FormLabel mb="3">Name of the officer/designation issuing the PTW</FormLabel>
        <Input mb="3" />
        <FormErrorMessage>Name should not be empty</FormErrorMessage>
      </FormControl>
      <FormControl id="input4" mb={4}>
        <FormLabel mb="3">Name/designation of officer receiving PTW</FormLabel>
        <Input mb="3" />
        <FormErrorMessage>Name should not be empty</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Power outages</FormLabel>
        <Input />
      </FormControl>
      <FormControl>
        <FormLabel>Shorted locations</FormLabel>
        <FormErrorMessage>location should not be empty</FormErrorMessage>
        <Input />
      </FormControl>
      <FormControl>
        <FormLabel mb="3">Earthed locations</FormLabel>
        <Input mb="3" />
        <FormErrorMessage>location should not be empty </FormErrorMessage>
      </FormControl>
    </Flex>
  </Flex>
);
