import React from 'react';
import { Button, Center } from '@chakra-ui/react';
import { NextState } from './types';

export const NavigationButtons = ({ currentStep, changeStep }: NextState) => (
  <Center justifyContent="space-between" px="220px">
    {currentStep > 0 && (
      <Button
        colorScheme="teal"
        mb="5"
        variant="outline"
        w="45%"
        onClick={() => changeStep((el: number) => el - 1)}
      >
        Previous
      </Button>
    )}
    <Button
      colorScheme="teal"
      mb="5"
      variant="solid"
      w="45%"
      onClick={() => changeStep((el: number) => el + 1)}
    >
      Next
    </Button>
  </Center>
);
