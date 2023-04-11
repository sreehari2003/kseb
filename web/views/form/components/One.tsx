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
  Box,
  Text,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import React from 'react';
import { Select } from 'chakra-react-select';

export const One = () => {
  const { register } = useFormContext();
  return (
    <Box p="5">
      <Flex alignItems="Flex-start" justifyContent="center">
        <Flex direction="column" w="70%">
          <Heading textAlign="center" mb="5">
            PART 1
          </Heading>
          <Text fontWeight="bold" mb="3">
            Section
          </Text>
          <Input mb="3" variant="flushed" {...register('')} />
          <Text fontWeight="bold" mb="5">
            Nature of work
          </Text>
          <Select />
          <Text fontWeight="bold" mb="3">
            Job work reg.no./Complaint no.
          </Text>
          <Input mb="3" variant="flushed" />
          <Text fontWeight="bold" mb="5">
            Voltage of electric conductor{' '}
          </Text>
          <NumberInput mb="5" defaultValue={220} size="sm" maxW={24}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text fontWeight="bold">place of work</Text>
          <Input mb="3" variant="flushed" />
          <Text mb="3" fontWeight="bold">
            place of disconnection
          </Text>
          <Input mb="3" variant="flushed" />
        </Flex>
      </Flex>
    </Box>
  );
};
