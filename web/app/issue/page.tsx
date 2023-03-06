'use client';
import { Box, Button, Flex, Input, Text, Center, ButtonGroup, Heading } from '@chakra-ui/react';
import useState from 'react';
import { MdOutlinePhotoCameraFront } from 'react-icons/md';
import { extendTheme } from '@chakra-ui/react';

const home = () => {
  return (
    <Box>
      <Flex bg="cyan.700" h="10">
        <Text as="b" color="black" fontSize="2xl" mb={10}>
          //SURAKSHA
        </Text>
        <Text as="b" color="white" fontSize="2xl" ml={'75%'}>
          ISSUES
        </Text>
        <Text color="black" fontSize="1xl">
          ADD ISSUES{' '}
        </Text>
      </Flex>
      <Flex
        direction="column"
        height="80vh"
        alignItems="flex-start"
        justifyContent="center"
        mr="25%"
        ml="25%"
      >
        <Text mb="5" mt="5">
          Title
        </Text>
        <Input h="10" mb="10" variant="outline" placeholder="Title"></Input>
        <Text>Description </Text>
        <Input h="40" mb="5" variant="outline" placeholder="Enter a description"></Input>
        <Text>Post number</Text>
        <Input h="20" mb="10" variant="outline" placeholder="kn/76/10"></Input>
        <Button leftIcon={<MdOutlinePhotoCameraFront />} colorScheme="gray" variant="solid" mb={50}>
          Add image
        </Button>
        <Flex direction={'row'}>
          <ButtonGroup spacing="10">
            <Button colorScheme="red" variant="solid">
              cancel
            </Button>
            <Button colorScheme="cyan" variant="solid">
              add issue
            </Button>
          </ButtonGroup>
        </Flex>{' '}
      </Flex>
    </Box>
  );
};
export default home;
