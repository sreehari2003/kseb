/* eslint-disable react/jsx-props-no-spreading */
import { surakshaAPI } from '@app/config';
import { debounce } from '@app/utils/debounce';
import { formThree } from '@app/views/validator';
import { Flex, FormControl, FormLabel, Center, FormErrorMessage, Input } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InferType } from 'yup';
import { AsyncSelect } from 'chakra-react-select';

type FormType = InferType<typeof formThree>;

type User = {
  ID: string;
  name: string;
};

export const Three = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormType>();

  // eslint-disable-next-line consistent-return
  const getEmployee = async (str: string) => {
    try {
      const { data, status } = await surakshaAPI.get(`/officials/search?name=${str}`);
      if (status !== 200) {
        throw new Error();
      }
      return data.data.map((el: User) => ({ label: el.name, value: el.ID }));
    } catch {
      // console.error('Network error cant search for user');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadPost = useCallback(
    debounce((inputValue: string, callback: (options: any) => void) => {
      getEmployee(inputValue).then((options) => {
        callback(options);
      });
    }),
    []
  );

  return (
    <Center mb="30px" w={{ base: '400px', md: '800px' }} mt="40px">
      <Flex justifyContent="center" flexDir="column" w="900px" flexDirection="column">
        <FormControl isInvalid={!!errors.feeder} mb="3">
          <FormLabel>Feeder</FormLabel>
          <Input {...register('feeder')} />
          {errors.feeder && <FormErrorMessage>Feeder is a required field</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors.substation} mb="3">
          <FormLabel>Substation</FormLabel>
          <Input {...register('substation')} />
          {errors.substation && <FormErrorMessage>this is a required field</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors.transformer} mb="3">
          <FormLabel>Transformer</FormLabel>
          <Input {...register('transformer')} />
          {errors.substation && <FormErrorMessage>this is a required field</FormErrorMessage>}
        </FormControl>
        <FormLabel mt="10px"> Name of employees </FormLabel>
        <Flex justifyContent="space-between" mt="4" flexDir="column" gap="10px">
          <Controller
            control={control}
            name="employee1"
            render={({ field, fieldState: { error: emp1 } }) => (
              <FormControl label="employee1" isInvalid={!!emp1} id="employee1">
                <FormLabel>Name</FormLabel>
                <AsyncSelect {...field} isClearable defaultOptions loadOptions={loadPost} />
                {emp1 && <FormErrorMessage>Please select a name</FormErrorMessage>}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="employee2"
            render={({ field, fieldState: { error: emp2 } }) => (
              <FormControl label="employee2" isInvalid={!!emp2} id="employee2">
                <FormLabel>Name</FormLabel>
                <AsyncSelect {...field} isClearable defaultOptions loadOptions={loadPost} />
                {emp2 && <FormErrorMessage>Please select a name</FormErrorMessage>}
              </FormControl>
            )}
          />
        </Flex>
      </Flex>
    </Center>
  );
};
