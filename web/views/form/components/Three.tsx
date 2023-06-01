import { formThree } from '@app/views/validator';
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { InferType } from 'yup';
type FormType = InferType<typeof formThree>;

export const Three = () => {
  const {
    register,
    setFocus,
    formState: { errors },
  } = useFormContext<FormType>();
  console.log(errors);

  useEffect(() => {
    setFocus('officerDesignation');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box mb="30px">
      <Flex justifyContent="center" flexDir="column" w="900px">
        <Text mt="5">Safety arrangements are completed and permission to work is granted</Text>

        <FormControl id="input1" mb={4} mt={10} isInvalid={!!errors.officerDesignation}>
          <FormLabel>Name of the officer/designation</FormLabel>
          <Input {...register('officerDesignation')} />
          <FormErrorMessage>officer name is required</FormErrorMessage>
          <Text mt="10px">We engage in bespoke work</Text>
        </FormControl>
        <Flex justifyContent="space-between" gap="4px" mb="20px">
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
            <Input
              {...register('employeeName')}
              isInvalid={!!errors.employeeName}
              placeholder="Name"
              size="md"
            />

            <Input placeholder="Name" size="md" />
            <Input placeholder="Name" size="md" />
            <Input placeholder="Name" size="md" />
            <Input placeholder="Name" size="md" />
            <Input placeholder="Name" size="md" />
          </Stack>
          <Stack spacing={3}>
            <Input {...register('timeOfWork')} placeholder="Time" size="md" type="datetime-local" />
            <Input placeholder="Time" size="md" type="datetime-local" />
            <Input placeholder="Time" size="md" type="datetime-local" />
            <Input placeholder="Time" size="md" type="datetime-local" />
            <Input placeholder="Time" size="md" type="datetime-local" />
            <Input placeholder="Time" size="md" type="datetime-local" />
          </Stack>
          <Stack spacing={3}>
            <Input {...register('usedItems')} size="md" />
            <Input size="md" />
            <Input size="md" />
            <Input size="md" />
            <Input size="md" />
            <Input size="md" />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};
