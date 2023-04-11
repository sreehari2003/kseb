import React from 'react';
import { Button, Center } from '@chakra-ui/react';
import { NextState } from './types';

export const NavigationButtons = ({ currentStep, prevStep, nextStep }: NextState) => (
  <Center justifyContent="space-between" gap="14px" w="100%" mb="30px">
    {currentStep > 1 && (
      <Button colorScheme="teal" variant="outline" onClick={prevStep} w="100%">
        Previous
      </Button>
    )}
    <Button colorScheme="teal" variant="solid" onClick={nextStep} w="100%">
      Next
    </Button>
  </Center>
);
