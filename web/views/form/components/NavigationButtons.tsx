import React from 'react';
import { Button, Center } from '@chakra-ui/react';
import { NextState } from './types';

export const NavigationButtons = ({ currentStep, prevStep, nextStep }: NextState) => (
  <Center justifyContent="space-between" px="220px">
    {currentStep === 1 && (
      <Button colorScheme="teal" mb="5" variant="outline" w="45%" onClick={prevStep}>
        Previous
      </Button>
    )}
    <Button colorScheme="teal" mb="5" variant="solid" w="45%" onClick={nextStep}>
      Next
    </Button>
  </Center>
);
