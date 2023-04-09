import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  Button,
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  Checkbox,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { useState } from 'react';

const Home = () => {
  const [showNextPage1, setShowNextPage1] = useState(false);
  const [showNextPage2, setShowNextPage2] = useState(false);

  const [input7Value, setInput7Value] = useState('');
  const [input8Value, setInput8Value] = useState('');
  const [input9Value, setInput9Value] = useState('');
  const [input10Value, setInput10Value] = useState('');
  const [input11Value, setInput11Value] = useState('');
  const [input12Value, setInput12Value] = useState('');
  const [input13Value, setInput13Value] = useState('');

  const handleNext1Click = () => {
    setShowNextPage1(true);
  };
  const handleNext2Click = () => {
    setShowNextPage2(true);
  };

  const handleInput7Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput7Value(event.target.value);
  };

  const handleInput8Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput8Value(event.target.value);
  };
  const handleInput9Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput9Value(event.target.value);
  };
  const handleInput10Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput10Value(event.target.value);
  };
  const handleInput11Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput7Value(event.target.value);
  };

  const handleInput12Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput8Value(event.target.value);
  };
  const handleInput13Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput9Value(event.target.value);
  };

  if (showNextPage2) {
    return (
      <Box>
        <Flex alignItems="Flex-start" justifyContent="center">
          <Flex direction="column" w="70%">
            <Heading textAlign="center" mb="5">
              PART 2
            </Heading>

            <FormControl id="input1" mb={4} mt={10}>
              <FormLabel>Power outages</FormLabel>
              <Input variant="flushed" value={input11Value} onChange={handleInput11Change} />
            </FormControl>
            <FormControl id="input2" mb={4}>
              <FormLabel>Shorted locations</FormLabel>

              <Input variant="flushed" value={input12Value} onChange={handleInput12Change} />
            </FormControl>
            <FormControl id="input3" mb={4}>
              <FormLabel mb="3">Earthed locations</FormLabel>
              <Input mb="3" variant="flushed" value={input13Value} onChange={handleInput13Change} />
            </FormControl>

            <Flex justifyContent="space-between">
              <Button colorScheme="teal" mb="5" variant="outline" w="45%">
                Previous
              </Button>
              <Button colorScheme="teal" mb="5" variant="solid" w="45%" onClick={handleNext2Click}>
                Next
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
  }
  if (showNextPage1) {
    return (
      <Box>
        <Flex alignItems="Flex-start" justifyContent="center">
          <Flex direction="column" w="70%">
            <FormControl id="input1" mb={4}>
              <FormLabel mt="10" mb="3">
                job description
              </FormLabel>
              <Input variant="flushed" value={input7Value} onChange={handleInput7Change} />
            </FormControl>
            <FormControl id="input2" mb={4}>
              <FormLabel mb="3">PTW allows for the above work</FormLabel>
              <InputGroup mb="3">
                <InputLeftAddon>PTW no.</InputLeftAddon>
                <Input placeholder="0000" value={input8Value} onChange={handleInput8Change} />
              </InputGroup>
            </FormControl>
            <FormControl id="input3" mb={4}>
              <FormLabel mb="3">Name of the officer/designation issuing the PTW</FormLabel>
              <Input mb="3" variant="flushed" value={input9Value} onChange={handleInput9Change} />
            </FormControl>
            <FormControl id="input4" mb={4}>
              <FormLabel mb="3">Name/designation of officer receiving PTW</FormLabel>
              <Input mb="3" variant="flushed" value={input10Value} onChange={handleInput10Change} />
            </FormControl>
            <Flex justifyContent="space-between">
              <Button colorScheme="teal" mb="5" variant="outline" w="45%">
                Previous
              </Button>
              <Button colorScheme="teal" mb="5" variant="solid" w="45%" onClick={handleNext2Click}>
                Next
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
  }

  return (
    <Box p="5">
      <Flex alignItems="Flex-start" justifyContent="center">
        <Flex direction="column" w="70%">
          <Heading textAlign="center" mb="5">
            PART 1
          </Heading>
          <Text fontWeight="bold" mb="3">
            Section
          </Text>
          <Input mb="3" variant="flushed" />
          <Text fontWeight="bold" mb="5">
            Nature of work
          </Text>
          <Stack spacing={5} direction="row" mb="3">
            <Checkbox colorScheme="teal" defaultChecked>
              Capital
            </Checkbox>
            <Checkbox colorScheme="teal" defaultChecked>
              Maintenance
            </Checkbox>
            <Checkbox colorScheme="teal" defaultChecked>
              Break down
            </Checkbox>
            <Checkbox colorScheme="teal" defaultChecked>
              Revenue
            </Checkbox>
          </Stack>
          <Text fontWeight="bold" mb="3">
            Job work reg.no./Complaint no.
          </Text>
          <Input mb="3" variant="flushed" />
          <Text fontWeight="bold" mb="5">
            Voltage of electric conductor{' '}
          </Text>
          <NumberInput mb="5" defaultValue={220} size="sm" maxW={24}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text fontWeight="bold">place of work</Text>
          <Input mb="3" variant="flushed" />
          <Text mb="3" fontWeight="bold">
            place of disconnection
          </Text>
          <Input mb="3" variant="flushed" />
          <Flex justifyContent="space-between">
            <Button colorScheme="teal" mb="5" variant="outline" w="45%">
              Cancel
            </Button>
            <Button colorScheme="teal" mb="5" variant="solid" w="45%" onClick={handleNext1Click}>
              Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
export default Home;
