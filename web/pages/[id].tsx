/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Center } from '@chakra-ui/react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { One, Two, NavigationButtons, Three } from '@app/views/form';
import { FinalForm, StepByStepForm } from '@app/views/validator';
import { BaseLayout } from '@app/layout';

type FormType = InferType<typeof FinalForm>;

const Home = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const isReadyForSubmission = currentStep === 3;
  const methods = useForm<FormType>({
    mode: 'all',
    resolver: yupResolver(StepByStepForm[currentStep]),
  });
  const nextStep = () => {
    setCurrentStep((el) => el + 1);
  };

  const prevStep = () => {
    setCurrentStep((el) => el - 1);
  };

  const onSubmit: SubmitHandler<FormType> = (data) => {
    if (isReadyForSubmission) {
      // send post request
      console.log(data);
    } else {
      nextStep();
    }
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
