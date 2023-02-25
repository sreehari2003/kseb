'use client'
import {Button, Flex, Heading, Input,InputGroup,InputLeftAddon,Text} from "@chakra-ui/react";

const Home = () => (
  <Flex  height={'100vh'}alignItems={'center'} justifyContent={'center'}>
        <Flex direction={'column'}>
        <Text fontSize='2xl' mb={10}>Enter Mobile Number</Text>
        <Text fontSize='1xl' color={"gray"} mb={5}>We will sent you <Text as='b' color={"black"}>one time password</Text> on this mobile number</Text>
        <InputGroup mb={5}><InputLeftAddon children='+91-' />
        <Input variant='flushed'  /></InputGroup>
        <Button
  size='md'
  height='48px'
  width='-moz-fit-content'
  border='2px'
  colorScheme='blue'
>
  GET OTP
</Button>
  </Flex>
  </Flex>
);

export default Home;
