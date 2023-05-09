import { profileValidator } from '@app/views/validator/profile';
import {
  FormLabel,
  Box,
  FormControl,
  Input,
  Flex,
  GridItem,
  Grid,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
  IconButton,
  FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineAddAPhoto } from 'react-icons/md';

type FormValues = {
  name: string;
  id: string;
  phoneNumber: string;
  location: string;
  designation: string;
};
export const Profile = () => {
  const [Formdata, setFormData] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(profileValidator),
  });

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    console.log(data);
  };

  return (
    <Box p="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns="repeat(2, 1fr)" gap="20">
          <GridItem colSpan={1}>
            <Box mb="6" fontSize="6xl" color="gray.400" textAlign="center">
              <Box as="span" ml="2">
                <FormControl id="photo" mt="4">
                  <Box fontSize="6xl" color="gray.400">
                    <Icon as={FaUserCircle} color="gray.300" />
                    <Box as="span" ml="2" display="inline-block">
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <IconButton as={MdOutlineAddAPhoto} color="gray.600" aria-label={''} />
                        </InputLeftElement>
                        <Input type="file" display="none" />
                      </InputGroup>
                    </Box>
                  </Box>
                </FormControl>
              </Box>
            </Box>
            <FormControl>
              <FormLabel></FormLabel>
            </FormControl>
            <FormControl id="name" isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input {...register('name')} type="text" />
              <FormErrorMessage>*this feild should not be empty</FormErrorMessage>
            </FormControl>
            <FormControl id="id" isInvalid={!!errors.id}>
              <FormLabel mt="5">ID</FormLabel>
              <Input {...register('id')} type="text" />
              <FormErrorMessage>*this feild should not be empty</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl id="phone number" mt="20" isInvalid={!!errors.name}>
              <FormLabel>Phone Number</FormLabel>

              <Input {...register('phoneNumber')} type="number" />
              <FormErrorMessage>*this feild should not be empty</FormErrorMessage>
            </FormControl>
            <FormControl id="location" mt="10" isInvalid={!!errors.name}>
              <FormLabel>Location</FormLabel>
              <Input {...register('location')} type="text" />
              <FormErrorMessage>*this feild should not be empty</FormErrorMessage>
            </FormControl>
            <FormControl id="designation" mt="10" isInvalid={!!errors.name}>
              <FormLabel>Designation</FormLabel>
              <Input {...register('designation')} type="text" />
              <FormErrorMessage>*this feild should not be empty</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
        <Flex align="center" justify="center" mt="50">
          <Button variant="outline" w="70%" type="submit" colorScheme="teal">
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
