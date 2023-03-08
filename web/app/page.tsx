'use client';
import { PhoneIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { CiSearch } from 'react-icons/ci';

const App = () => {
  const Card = () => {
    const property = {
      title: 'yaser',
      discription: 's1cse',
    };
  };
  return (
    <Box>
      <Flex height="90px" width="100%" backgroundColor="#7B8DDB">
        <Box height="24px" width="71px" ml="42px" mt="32px" mb="34px">
          <Heading fontSize="19.98px" fontWeight="400" fontStyle="inter" lineHeight="24.18px">
            ISSUES
          </Heading>
        </Box>
        <Box height="24" width="119px" ml="42px" mt="32px" mb="34px">
          <Heading
            fontSize="19.98px"
            fontWeight="400"
            fontStyle="inter"
            lineHeight="24.18px"
            color="white"
          >
            ADDISSUES
          </Heading>
        </Box>
        <Box mt="24px" ml="750px" mr="61px" mb="24.6px">
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input type="tel" placeholder="search" />
          </InputGroup>
        </Box>
      </Flex>
      <Flex>
        <Box
          borderWidth="1px"
          borderRadius="13.42px"
          color="#FFFFFF"
          height="306px"
          width="402.63px"
          ml="49px"
          mt="76px"
        >
          <Box
            borderWidth="1px"
            borderRadius="13.42px"
            backgroundColor="#D9D9D9"
            height="123.47px"
            width="362.37px"
            ml="20.13px"
            mt="20.13px"
          ></Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default App;
