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
} from '@chakra-ui/react';

import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineAddAPhoto } from 'react-icons/md';

export const Profile = () => (
  <Box p="10">
    <form>
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
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" variant="flushed" />
          </FormControl>
          <FormControl id="id">
            <FormLabel mt="5">ID</FormLabel>
            <Input type="number" variant="flushed" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl id="phone number" mt="20">
            <FormLabel>Phone Number</FormLabel>

            <Input type="number" variant="flushed" />
          </FormControl>
          <FormControl id="location" mt="10">
            <FormLabel>Location</FormLabel>
            <Input type="text" variant="flushed" />
          </FormControl>
          <FormControl id="designation" mt="10">
            <FormLabel>Designation</FormLabel>
            <Input type="text" variant="flushed" />
          </FormControl>
        </GridItem>
      </Grid>
      <Flex align="center" justify="center" mt="50">
        <Button variant="outline" w="70%">
          Submit
        </Button>
      </Flex>
    </form>
  </Box>
);
