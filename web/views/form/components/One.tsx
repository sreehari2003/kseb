/* eslint-disable react/jsx-props-no-spreading */
import { Flex, Heading, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { InferType } from 'yup';
import { Select } from 'chakra-react-select';
import { formOne } from '@app/views/validator';

const typeOfWork = [
  { label: 'Capital', value: 'Capital' },
  { label: 'Maintainence', value: 'Maintainence' },
  { label: 'Break-Down', value: 'Break-Down' },
  { label: 'Revenue', value: 'Revenue' },
];

const typeOfVoltage = [
  { label: '230', value: '230' },
  { label: '900', value: '900' },
  { label: '1200', value: '1200' },
];

type FormType = InferType<typeof formOne>;

export const One = () => {
  const {
    register,
    setFocus,
    control,
    formState: { errors },
  } = useFormContext<FormType>();

  useEffect(() => {
    setFocus('section');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex direction="column" w={{ base: '400px', md: '800px' }} mt="50px">
      <Heading textAlign="center" mb="5">
        Offical form (Part 1)
      </Heading>
      <FormControl isInvalid={!!errors.section} mb="3">
        <FormLabel>Section</FormLabel>
        <Input {...register('section')} />
        <FormErrorMessage>Section is a required field</FormErrorMessage>
      </FormControl>
      <Controller
        control={control}
        name="typeofjob"
        render={({ field, fieldState: { error: proError } }) => (
          <FormControl mb="3" isInvalid={!!proError}>
            <FormLabel>Nature of work</FormLabel>
            <Select options={typeOfWork} {...field} />
            <FormErrorMessage>Please pick an option</FormErrorMessage>
          </FormControl>
        )}
      />

      <FormControl isInvalid={!!errors.complaintNumber}>
        <FormLabel>Job work reg.no./Complaint no.</FormLabel>
        <Input {...register('complaintNumber')} />
        <FormErrorMessage>complaint number is a required field</FormErrorMessage>
      </FormControl>
      <Controller
        control={control}
        name="voltage"
        render={({ field, fieldState: { error: proError } }) => (
          <FormControl mb="3" isInvalid={!!proError}>
            <FormLabel>Voltage of electric conductor </FormLabel>
            <Select options={typeOfVoltage} {...field} />
            <FormErrorMessage>Please pick an option</FormErrorMessage>
          </FormControl>
        )}
      />

      <FormControl isInvalid={!!errors.location} mb="12px">
        <FormLabel>place of work</FormLabel>
        <Input {...register('location')} />
        <FormErrorMessage>required field</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.disconnectionPlace} mb="12px">
        <FormLabel>place of disconnection</FormLabel>
        <Input {...register('disconnectionPlace')} />
        <FormErrorMessage>required field</FormErrorMessage>
      </FormControl>
    </Flex>
  );
};
