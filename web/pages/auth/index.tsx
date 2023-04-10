/* eslint-disable react/jsx-props-no-spreading */

import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Icon,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { MdOutlineMessage } from 'react-icons/md';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { phoneNumber, OTP } from '@app/views/validator';

type Phone = Yup.InferType<typeof phoneNumber>;
type Otp = Yup.InferType<typeof OTP>;

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Phone>({
    mode: 'onSubmit',
    resolver: yupResolver(phoneNumber),
  });

  const {
    register: registerOTP,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<Otp>({
    mode: 'onSubmit',
    resolver: yupResolver(OTP),
  });

  const [isOtpSent, setOtpSent] = useState<boolean>(false);

  const phoneSubmit: SubmitHandler<Phone> = (data) => {
    setOtpSent(true);
    console.log(Number(data.phoneNumber));
  };

  const otpSubmit: SubmitHandler<Otp> = (data) => {
    console.log(Number(data.otp));
  };

  return (
    <Box p="7">
      <Flex h="250" alignItems="center" justifyContent="center" mt={10}>
        <Icon as={MdOutlineMessage} w={20} h={20} />
      </Flex>
      {!isOtpSent && (
        <Flex alignItems="Flex-start" justifyContent="center">
          <Flex direction="column">
            <Text as="b" color="black" fontSize="2xl" mb={10} textAlign="center">
              Enter Mobile Number
            </Text>
            <Text fontSize="1xl" color="gray" mb={10}>
              We will sent you{' '}
              <Text as="b" color="black">
                one time password
              </Text>{' '}
              on this mobile number
            </Text>
            <form onSubmit={handleSubmit(phoneSubmit)}>
              <FormControl isInvalid={!!errors.phoneNumber}>
                <FormLabel>Phone number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+91</InputLeftAddon>
                  <Input type="tel" {...register('phoneNumber')} />
                </InputGroup>
                <FormErrorMessage>Phone number is not valid</FormErrorMessage>
                <Button
                  mt="10px"
                  type="submit"
                  size="md"
                  height="48px"
                  width="100%"
                  border="2px"
                  colorScheme="purple"
                >
                  GET OTP
                </Button>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      )}
      {isOtpSent && (
        <Flex alignItems="center" direction="column">
          <Text as="b" mb={10} textAlign="end">
            Please Enter the <b>OTP</b>
          </Text>
          <form onSubmit={handleOtpSubmit(otpSubmit)}>
            <FormControl isInvalid={!!otpErrors.otp} w="300px">
              <FormLabel>OTP</FormLabel>
              <Input {...registerOTP('otp')} placeholder="Enter your OTP" />
              <FormErrorMessage w="100%">Please Enter a valid otp</FormErrorMessage>
              <Button
                mt="10px"
                type="submit"
                size="md"
                height="48px"
                border="2px"
                colorScheme="purple"
                w="100%"
              >
                verify
              </Button>
            </FormControl>
          </form>
        </Flex>
      )}
    </Box>
  );
};

export default Home;
