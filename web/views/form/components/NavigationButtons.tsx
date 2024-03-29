import React from 'react';
import { Button, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { NextState } from './types';

export const NavigationButtons = ({ currentStep, prevStep }: NextState) => {
  const router = useRouter();
  return (
    <Center justifyContent="space-between" gap="14px" w="100%" mb="30px">
      {currentStep > 1 && (
        <Button colorScheme="teal" variant="outline" onClick={prevStep} w="100%">
          Previous
        </Button>
      )}
      {currentStep === 1 && (
        <Button
          colorScheme="teal"
          variant="outline"
          w="100%"
          onClick={() => router.push('/dashboard')}
        >
          Close
        </Button>
      )}
      <Button colorScheme="teal" variant="solid" w="100%" type="submit">
        {currentStep === 3 ? 'Submit' : 'Next'}
      </Button>
    </Center>
  );
};
