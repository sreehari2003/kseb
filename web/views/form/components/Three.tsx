/* eslint-disable react/jsx-props-no-spreading */
import { surakshaAPI } from '@app/config';
import { debounce } from '@app/utils/debounce';
import { formThree } from '@app/views/validator';
import { Flex, FormControl, FormLabel, Heading, Center, FormErrorMessage } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InferType } from 'yup';
import { AsyncSelect } from 'chakra-react-select';

type FormType = InferType<typeof formThree>;

type User = {
  id: string;
  name: string;
};

export const Three = () => {
  const { control } = useFormContext<FormType>();

  // eslint-disable-next-line consistent-return
  const getEmployee = async (str: string) => {
    try {
      const { data, status } = await surakshaAPI.get(`/official/search?name=${str}`);
      if (status !== 200) {
        throw new Error();
      }
      return data.data.map((el: User) => ({ label: el.name, value: el.id }));
    } catch {
      console.error('Network error cant search for user');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadPost = useCallback(
    debounce((inputValue: string) => {
      getEmployee(inputValue);
    }),
    []
  );

  return (
    <Center mb="30px">
      <Flex justifyContent="center" flexDir="column" w="900px" flexDirection="column">
        <Heading mt="20" fontSize="xl">
          Safety arrangements are completed and permission to work is granted
        </Heading>
        <FormLabel mt="50px"> Name of employees </FormLabel>
        <Flex justifyContent="space-between" mt="4" flexDir="column" gap="10px">
          <Controller
            control={control}
            name="employee1"
            render={({ field, fieldState: { error: emp1 } }) => (
              <FormControl label="employee1" isInvalid={!!emp1} id="employee1">
                <FormLabel>Name</FormLabel>
                <AsyncSelect {...field} isClearable defaultOptions loadOptions={loadPost} isMulti />
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
                <AsyncSelect {...field} isClearable defaultOptions loadOptions={loadPost} isMulti />
                {emp2 && <FormErrorMessage>Please select a name</FormErrorMessage>}
              </FormControl>
            )}
          />{' '}
          <Controller
            control={control}
            name="employee3"
            render={({ field, fieldState: { error: emp3 } }) => (
              <FormControl label="employee3" isInvalid={!!emp3} id="employee3">
                <FormLabel>Name</FormLabel>
                <AsyncSelect {...field} isClearable defaultOptions loadOptions={loadPost} isMulti />
                {emp3 && <FormErrorMessage>Please select a name</FormErrorMessage>}
              </FormControl>
            )}
          />
        </Flex>
      </Flex>
    </Center>
  );
};
