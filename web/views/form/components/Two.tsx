/* eslint-disable react/jsx-props-no-spreading */
import { formTwo } from '@app/views/validator';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { InferType } from 'yup';

type FormType = InferType<typeof formTwo>;

export const Two = () => {
  const {
    register,
    setFocus,
    formState: { errors },
  } = useFormContext<FormType>();
  console.log(errors);

  useEffect(() => {
    setFocus('description');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex justifyContent="center" w={{ base: '400px', md: '800px' }}>
      <Flex direction="column" w="100%">
        <FormControl isInvalid={!!errors.description} id="input1" mb={4}>
          <FormLabel mt="10" mb="3">
            job description
          </FormLabel>
          <Input {...register('description')} />
          {errors.description && (
            <FormErrorMessage>discription should not be empty</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="input2" mb={4} isInvalid={!!errors.ptwAllowed}>
          <FormLabel mb="3">PTW allows for the above work</FormLabel>
          <InputGroup mb="3">
            <InputLeftAddon>PTW no.</InputLeftAddon>
            <Input placeholder="0000" {...register('ptwAllowed')} />
          </InputGroup>
          {errors.ptwAllowed && <FormErrorMessage>PTW number should not be empty</FormErrorMessage>}
        </FormControl>
        <FormControl id="input3" mb={4} isInvalid={!!errors.officerName}>
          <FormLabel mb="3">Name of the officer/designation issuing the PTW</FormLabel>
          <Input mb="3" {...register('officerName')} />
          {errors.officerName && <FormErrorMessage>Name should not be empty</FormErrorMessage>}
        </FormControl>
        <FormControl id="input4" mb={4} isInvalid={!!errors.officerRecieving}>
          <FormLabel mb="3">Name/designation of officer receiving PTW</FormLabel>
          <Input mb="3" {...register('officerRecieving')} />
          {errors.officerRecieving && <FormErrorMessage>Name should not be empty</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!!errors.powerOutage}>
          <FormLabel>Power outages</FormLabel>
          <Input {...register('powerOutage')} />
          <FormErrorMessage>outages should not be empty</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.shortedLocation}>
          <FormLabel>Shorted locations</FormLabel>
          <Input {...register('shortedLocation')} />
          {errors.shortedLocation && (
            <FormErrorMessage>location should not be empty</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.earthedLocations}>
          <FormLabel mb="3">Earthed locations</FormLabel>
          <Input mb="3" {...register('earthedLocations')} />
          {errors.earthedLocations && (
            <FormErrorMessage>location should not be empty </FormErrorMessage>
          )}
        </FormControl>
      </Flex>
    </Flex>
  );
};
