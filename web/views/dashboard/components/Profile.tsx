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
import React, { useEffect } from 'react';
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
  { label: 'Overseer', value: 'OV' },
];

export const Profile = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileType>({
    resolver: yupResolver(profileValidator),
  });

  const { setUserData, data: userData, isAuth } = useAuthCtx();
  const toast = useToast();
  const onSubmit = async (value: ProfileType) => {
    try {
      const { data, status } = await surakshaAPI.post('/officials', {
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

  useEffect(() => {
    setValue('name', userData?.name);
    setValue('location', userData?.location);
    setValue('role', {
      label: typeOfRoles.find((el) => el.value === userData?.Role)?.label as string,
      value: userData?.Role,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <Box px="250px" w="100%">
      {!userData ||
        (!userData.is_verified && (
          <Alert status="error" alignItems="center" justifyContent="center" mt="20px">
            <Icon as={FiAlertCircle} mr="10px" />
            Pending Verification
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
            <Input {...register('name')} type="text" isDisabled={isAuth} />
            <FormErrorMessage>name should not be empty</FormErrorMessage>
          </FormControl>
          <FormControl id="location" mt="3" isInvalid={!!errors.location}>
            <FormLabel>Location</FormLabel>
            <Input {...register('location')} type="text" isDisabled={isAuth} />
            <FormErrorMessage>location should not be empty</FormErrorMessage>
          </FormControl>
          <Controller
            control={control}
            name="role"
            render={({ field, fieldState: { error: proError } }) => (
              <FormControl mb="3" mt="5" isInvalid={!!proError}>
                <FormLabel>Your Position in KSEB</FormLabel>
                {/* @ts-ignore */}
                <Select options={typeOfRoles} {...field} isDisabled={isAuth} />
                <FormErrorMessage>Please pick an option</FormErrorMessage>
              </FormControl>
            )}
          />
        </Flex>
        <Flex align="center" justify="center" mt="30" mb="40px">
          {!isAuth && (
            <Button w="full" type="submit" colorScheme="teal" isLoading={isSubmitting}>
              Submit
            </Button>
          )}
        </Flex>
      </form>
    </Box>
  );
};
