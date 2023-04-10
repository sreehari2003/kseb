import {
  Flex,
  Heading,
  Input,
  Stack,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const Three = () => (
  <Box p="5">
    <Flex alignItems="Flex-start" justifyContent="center">
      <Flex direction="column" w="70%">
        <Heading textAlign="center" mb="5">
          PART 1
        </Heading>
        <Text fontWeight="bold" mb="3">
          Section
        </Text>
        <Input mb="3" variant="flushed" />
        <Text fontWeight="bold" mb="5">
          Nature of work
        </Text>
        <Stack spacing={5} direction="row" mb="3">
          <Checkbox colorScheme="teal" defaultChecked>
            Capital
          </Checkbox>
          <Checkbox colorScheme="teal" defaultChecked>
            Maintenance
          </Checkbox>
          <Checkbox colorScheme="teal" defaultChecked>
            Break down
          </Checkbox>
          <Checkbox colorScheme="teal" defaultChecked>
            Revenue
          </Checkbox>
        </Stack>
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
