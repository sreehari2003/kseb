/* eslint-disable react/jsx-props-no-spreading */

import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Icon,
  Center,
  FormControl,
  FormLabel,
  useToast,
  FormErrorMessage,
  Image,
} from '@chakra-ui/react';
import { MdOutlineMessage } from 'react-icons/md';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createCode,
  resendCode,
  consumeCode,
  getLoginAttemptInfo,
} from 'supertokens-auth-react/recipe/passwordless';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { useState, useEffect } from 'react';
import { phoneNumber, OTP } from '@app/views/validator';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { BaseLayout } from '@app/layout';

type Phone = Yup.InferType<typeof phoneNumber>;
type Otp = Yup.InferType<typeof OTP>;

const Home: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isOtpSending },
  } = useForm<Phone>({
    mode: 'onSubmit',
    resolver: yupResolver(phoneNumber),
  });
  const toast = useToast();
  const { doesSessionExist } = useSessionContext() as any;
  const hasInitialOTPBeenSent = async () => (await getLoginAttemptInfo()) !== undefined;
  const {
    register: registerOTP,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors, isSubmitting: isLoading },
  } = useForm<Otp>({
    mode: 'onSubmit',
    resolver: yupResolver(OTP),
  });
  // this state is used to determine if the user has recieved the otp and is ready to enter the otp
  const [isOTPscreenisVisible, setOTPscreenisVisible] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const loginAttemptInfo = await hasInitialOTPBeenSent();
      setOTPscreenisVisible(loginAttemptInfo);
    })();
  }, [handleSubmit]);

  useEffect(() => {
    if (doesSessionExist) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doesSessionExist]);

  const sendOTP = async (phone: string): Promise<void> => {
    try {
      await createCode({
        phoneNumber: `+91${phone}`,
      }); // OTP sent successfully.

      toast({
        title: 'OTP sent successfully',
        description: 'Please check your Phone for an OTP',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      // 'Please check your Phone for an OTP')
      setOTPscreenisVisible(true);
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you,
        // or if the input email / phone number is not valid.
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        //  window.alert('Oops! Something went wrong.');
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const resendOTP = async () => {
    try {
      const response = await resendCode();

      if (response.status === 'RESTART_FLOW_ERROR') {
        // this can happen if the user has already successfully logged in into
        // another device whilst also trying to login to this one.
        //  'Login failed. Please try again');
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        // OTP resent successfully.
        // 'Please check your phone for the OTP');
        toast({
          title: 'OTP resent succesfully',
          description: 'Please check your phone for the OTP',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        // this may be a custom error message sent from the API by you.
      } else {
        //         window.alert('Oops! Something went wrong.');
        toast({
          title: "Couldn't send OTP",
          description: 'something went wrong while trying to send otp',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  // used to verify the otp
  const handleOTPInput = async (otp: string) => {
    try {
      const response = await consumeCode({
        userInputCode: otp,
      });
      localStorage.removeItem('supertokens-passwordless-loginAttemptInfo');

      if (response.status === 'OK') {
        toast({
          title: 'Login Successfull',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // an api call will be automatically sent from context to check the user in db
        // doesSessionExist is a dependency in useEffect in authCOntext
      } else if (response.status === 'INCORRECT_USER_INPUT_CODE_ERROR') {
        // the user entered an invalid OTP
        toast({
          title: 'Incorrect OTP',
          description: 'The enterd OTP is wrong please try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else if (response.status === 'EXPIRED_USER_INPUT_CODE_ERROR') {
        // it can come here if the entered OTP was correct, but has expired because
        // it was generated too long ago.
        toast({
          title: 'OTP Expired',
          description: 'Old OTP entered , Please regenerate a new one and try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        // this can happen if the user tried an incorrect OTP too many times.
        toast({
          title: 'Login Failed',
          description: 'multiple incorrect otp entry, please try again later',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const phoneSubmit: SubmitHandler<Phone> = (data) => {
    sendOTP(data.phoneNumber);
  };

  const otpSubmit: SubmitHandler<Otp> = (data) => {
    handleOTPInput(data.otp);
  };

  return (
    <Flex h="80vh" justifyContent="space-between">
      <Image src="/auth.jpg" display={{ base: 'none', md: 'block' }} h="full" />
      <Center flexDir="column" w="900px">
        <Flex h="250" alignItems="center" justifyContent="center" mt={10}>
          <Icon as={MdOutlineMessage} w={20} h={20} />
        </Flex>
        {!isOTPscreenisVisible && (
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
                    colorScheme="teal"
                    isLoading={isOtpSending}
                  >
                    GET OTP
                  </Button>
                </FormControl>
              </form>
            </Flex>
          </Flex>
        )}
        {isOTPscreenisVisible && (
          <Flex alignItems="center" direction="column">
            <Text as="b" mb={10} textAlign="end">
              Please Enter the <b>OTP</b>
            </Text>
            <form onSubmit={handleOtpSubmit(otpSubmit)}>
              <FormControl isInvalid={!!otpErrors.otp} w="300px">
                <FormLabel>OTP</FormLabel>
                <FormLabel
                  onClick={resendOTP}
                  color="#0075E4"
                  _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Resend SMS
                </FormLabel>
                <Input {...registerOTP('otp')} placeholder="Enter your OTP" />
                <FormErrorMessage w="100%">Please Enter a valid otp</FormErrorMessage>
                <Button
                  mt="10px"
                  type="submit"
                  size="md"
                  height="48px"
                  border="2px"
                  colorScheme="teal"
                  w="100%"
                  isLoading={isLoading}
                >
                  verify
                </Button>
                <Button
                  mt="10px"
                  type="button"
                  variant="outline"
                  colorScheme="teal"
                  onClick={() => setOTPscreenisVisible(false)}
                  w="100%"
                >
                  Change Number
                </Button>
              </FormControl>
            </form>
          </Flex>
        )}
      </Center>
    </Flex>
  );
};

Home.Layout = BaseLayout;

export default Home;
