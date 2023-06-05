/* eslint-disable react/jsx-props-no-spreading */
import { profileValidator, ProfileType } from '@app/views/validator/profile';
import {
  FormLabel,
  Box,
  FormControl,
  Input,
  Flex,
  Button,
  Icon,
  FormErrorMessage,
  Alert,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { Select } from 'chakra-react-select';
import { surakshaAPI } from '@app/config/apiHandler';

import { useAuthCtx } from '@app/hooks';

const typeOfRoles = [
  { label: 'Assistent Engineer', value: 'AE' },
  { label: 'Sub Engineer', value: 'SE' },
  { label: 'Line Man', value: 'LM' },
];

export const Profile = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: yupResolver(profileValidator),
  });

  const { setUserData, data: userData } = useAuthCtx();
  const toast = useToast();
  const onSubmit = async (value: ProfileType) => {
    try {
      const { data, status } = await surakshaAPI.post('/official', {
        ...value,
        role: value.role.value,
      });
      if (status !== 201) {
        throw new Error();
      }
      setUserData(data.data);
    } catch {
      // render a toast
      toast({
        status: 'error',
        title: 'Error submitting data',
        description: 'Please try again later',
      });
    }
  };

  useCallback(() => {
    setValue('name', userData?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <Box px="250px" w="100%">
      {!userData ||
        (!userData.is_verified && (
          <Alert status="error" alignItems="center" justifyContent="center" mt="20px">
            <Icon as={FiAlertCircle} mr="10px" />
            You wont be able to access the dashboard until someone verifies you
          </Alert>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir="column">
          <Box as="span" ml="2" alignSelf="center">
            <FormControl id="photo" mt="4">
              <Box fontSize="6xl" color="gray.400">
                <Icon as={FaUserCircle} color="gray.300" />
              </Box>
            </FormControl>
          </Box>
          <FormControl>
            <FormLabel />
          </FormControl>
          <FormControl id="name" isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input {...register('name')} type="text" />
            <FormErrorMessage>name should not be empty</FormErrorMessage>
          </FormControl>
          <FormControl id="phone number" mt="3">
            <FormLabel>Phone Number</FormLabel>
            <Input type="number" disabled />
            <FormErrorMessage>number should not be empty</FormErrorMessage>
          </FormControl>
          <FormControl id="location" mt="3" isInvalid={!!errors.location}>
            <FormLabel>Location</FormLabel>
            <Input {...register('location')} type="text" />
            <FormErrorMessage>location should not be empty</FormErrorMessage>
          </FormControl>
          <Controller
            control={control}
            name="role"
            render={({ field, fieldState: { error: proError } }) => (
              <FormControl mb="3" mt="5" isInvalid={!!proError}>
                <FormLabel>Your Position in KSEB</FormLabel>
                {/* @ts-ignore */}
                <Select options={typeOfRoles} {...field} />
                <FormErrorMessage>Please pick an option</FormErrorMessage>
              </FormControl>
            )}
          />
        </Flex>
        <Flex align="center" justify="center" mt="30" mb="40px">
          <Button w="full" type="submit" colorScheme="teal">
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
