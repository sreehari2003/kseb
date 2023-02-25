'use client';
import { Button, Flex, Heading, Input, InputGroup, InputLeftAddon, Text,Icon } from '@chakra-ui/react';
import { MdOutlineMessage } from 'react-icons/md'
const Home = () => (
    <><Flex height={'25vh'} alignItems={'center'} justifyContent={'center'} mt={10}><Icon as={MdOutlineMessage} w={20} h={20}  />
    </Flex><Flex height={'75vh'} alignItems={'Flex-start'} justifyContent={'center'}>
            <Flex direction={'column'} >
                <Text as="b" color={'black'} fontSize="2xl" mb={10} textAlign='center'>
                    Enter Mobile Number
                </Text>
                <Text fontSize="1xl" color={'gray'} mb={10}>
                    We will sent you{' '}
                    <Text as="b" color={'black'}>
                        one time password
                    </Text>{' '}
                    on this mobile number
                </Text>
                <InputGroup mb={5} >
                    <InputLeftAddon children="+91-" />
                    <Input type="tel" />
                </InputGroup>
                <Button size="md" height="48px" width="-moz-fit-content" border="2px" colorScheme={"purple"}>
                    GET OTP
                </Button>
            </Flex>
        </Flex></>
);

export default Home;
