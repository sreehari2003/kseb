/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Center, useToast } from '@chakra-ui/react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { One, Two, NavigationButtons, Three } from '@app/views/form';
import { FinalForm, StepByStepForm } from '@app/views/validator';
import { BaseLayout } from '@app/layout';
import { surakshaAPI } from '@app/config';

type FormType = InferType<typeof FinalForm>;

const Home = () => {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const isReadyForSubmission = currentStep === 3;
  const methods = useForm<FormType>({
    mode: 'all',
    resolver: yupResolver(StepByStepForm[currentStep]),
  });

  console.log(methods.formState.errors);

  const nextStep = () => {
    setCurrentStep((el) => el + 1);
  };

  const prevStep = () => {
    setCurrentStep((el) => el - 1);
  };

  const onSubmit: SubmitHandler<FormType> = async (datas) => {
    if (isReadyForSubmission) {
      // send post request
      try {
        const { data } = await surakshaAPI.post('/form', datas);
        if (!data.ok) {
          throw new Error();
        } else {
          toast({
            title: 'Form Submission Successfull.',
            description: 'Form was submitted successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
      } catch {
        toast({
          title: 'Form Submission failed.',
          description: 'Something went wrong while submitting form',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      nextStep();
    }
    console.log(datas);
  };
  return (
    <Center>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {currentStep === 1 && <One />}
          {currentStep === 2 && <Two />}
          {currentStep === 3 && <Three />}
          <NavigationButtons prevStep={prevStep} currentStep={currentStep} />
        </form>
      </FormProvider>
    </Center>
  );
};

Home.Layout = BaseLayout;

export default Home;
