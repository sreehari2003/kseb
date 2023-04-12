import { Flex, Text, FormControl, FormLabel, Input, Stack, Box } from '@chakra-ui/react';
import React from 'react';
import { Select } from 'chakra-react-select';
const time = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];
export const Three = () => (
  <Box>
    <Flex justifyContent="center" w="800px">
      <Flex direction="column">
        <Text mt="5">Safety arrangements are completed and permission to work is granted</Text>

        <FormControl id="input1" mb={4} mt={10}>
          <FormLabel>Name of the officer/designation</FormLabel>
          <Input />
          <Text>We engage in bespoke work</Text>
        </FormControl>
        <Flex justifyContent="space-between">
          <Text>Name of employees/designation </Text>
          <Text>Time</Text>
          <Text>Safety equipment used(ladder,gloves,safety belt,etc)</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Stack spacing={7}>
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text>5</Text>
            <Text>6</Text>
          </Stack>
          <Stack spacing={3}>
            <Input placeholder="Name" size="md" />
            <Input placeholder="Name" size="md" />
            <Input placeholder="Name" size="md" />
            <Input placeholder="Name" size="md" />
            <Input placeholder="Name" size="md" />
            <Input placeholder="Name" size="md" />
          </Stack>
          <Stack spacing={3}>
            <Input placeholder="Time" size="md" />
            <Input placeholder="Time" size="md" />
            <Input placeholder="Time" size="md" />
            <Input placeholder="Time" size="md" />
            <Input placeholder="Time" size="md" />
            <Input placeholder="Time" size="md" />
          </Stack>
          <Stack spacing={3}>
            <Select placeholder="AM" options={time} size="md" />
            <Select placeholder="AM" options={time} size="md" />
            <Select placeholder="AM" options={time} size="md" />
            <Select placeholder="AM" options={time} size="md" />
            <Select placeholder="AM" options={time} size="md" />
            <Select placeholder="AM" options={time} size="md" />
          </Stack>
          <Stack spacing={3}>
            <Input size="md" />
            <Input size="md" />
            <Input size="md" />
            <Input size="md" />
            <Input size="md" />
            <Input size="md" />
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  </Box>
);
