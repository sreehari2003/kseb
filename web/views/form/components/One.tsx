/* eslint-disable react/jsx-props-no-spreading */
import {
  Flex,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import React from 'react';
import { Select } from 'chakra-react-select';

const typeOfWork = [
  { label: 'Capital', value: 'Capital' },
  { label: 'Maintainence', value: 'Maintainence' },
  { label: 'Break-Down', value: 'Break-Down' },
  { label: 'Revenue', value: 'Revenue' },
];

export const One = () => {
  const { register } = useFormContext();
  return (
    <Flex direction="column" w={{ base: '400px', md: '800px' }} mt="50px">
      <Heading textAlign="center" mb="5">
        Offical form (Part 1)
      </Heading>
      <FormControl>
        <FormLabel>Section</FormLabel>
        <Input mb="3" {...register('section')} />
        <FormErrorMessage>section should not be empty</FormErrorMessage>
      </FormControl>
      <FormControl mb="3">
        <FormLabel>Nature of work </FormLabel>
        <Select options={typeOfWork} />
        <FormErrorMessage>file should not be empty</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Job work reg.no./Complaint no.</FormLabel>
        <Input />
        <FormErrorMessage>Number should not be empty</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Voltage of electric conductor </FormLabel>
        <NumberInput mb="5" defaultValue={220} size="sm" maxW={24}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>voltage should not be empty</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>place of work</FormLabel>
        <Input mb="3" />
        <FormErrorMessage>place should not be empty</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel mb="3">place of disconnection</FormLabel>
        <Input mb="3" />
        <FormErrorMessage>place should not be empty</FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
