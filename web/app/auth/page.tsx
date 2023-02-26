'use client';
import {
  Button,
  Flex,
  Heading,
  PinInput,
  PinInputField,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Icon,
  Box,
  HStack,
} from '@chakra-ui/react';
import { MdOutlineMessage } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Home = () => {
  const { register, handleSubmit } = useForm();
  const [isOtpSent, setOtpSent] = useState<boolean>(false);
  const phoneSubmit = (data) => {
    setOtpSent(true);
    console.log(Number(data.phonenumber));
  };

  return (
    <Box>
      <Flex height="25vh" alignItems="center" justifyContent="center" mt={10}>
        <Icon as={MdOutlineMessage} w={20} h={20} />
      </Flex>
      {!isOtpSent && (
        <Flex height="75vh" alignItems="Flex-start" justifyContent="center">
          <Flex direction="column">
            <Text as="b" color="black" fontSize="2xl" mb={10} textAlign="center">
              Enter Mobile Number
            </Text>
            <Text fontSize="1xl" color="gray" mb={10}>
              We will sent you{' '}
              <Text as="b" color={'black'}>
                one time password
              </Text>{' '}
              on this mobile number
            </Text>
            <form onSubmit={handleSubmit(phoneSubmit)}>
              <InputGroup mb={5}>
                <InputLeftAddon children="+91-" />
                <Input type="tel" {...register('phonenumber')} />
              </InputGroup>
              <Button
                type="submit"
                size="md"
                height="48px"
                width="100%"
                border="2px"
                colorScheme="purple"
              >
                GET OTP
              </Button>
            </form>
          </Flex>
        </Flex>
      )}
      {isOtpSent && (
        <Flex alignItems="center" direction="column">
          <Text as="b" mb={10} textAlign="end">
            OTP
          </Text>
          <HStack mb={5}>
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Button
            type="submit"
            size="md"
            height="48px"
            width="30%"
            border="2px"
            colorScheme="purple"
          >
            verify
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Home;
