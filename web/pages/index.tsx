import { Box, Flex, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { Card } from '@app/views/home';

const App = () => (
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
          <InputLeftElement pointerEvents="none">
            <BsSearch />
          </InputLeftElement>
          <Input type="tel" placeholder="search" />
        </InputGroup>
      </Box>
    </Flex>
    <Flex>
      <Card />
    </Flex>
  </Box>
);

export default App;
