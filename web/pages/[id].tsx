/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Center } from '@chakra-ui/react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { One, Two, NavigationButtons, Three } from '@app/views/form';
import { formOne } from '@app/views/validator';
import { BaseLayout } from '@app/layout';

type FormType = InferType<typeof formOne>;

const Home = () => {
  const methods = useForm<FormType>({
    mode: 'all',
    resolver: yupResolver(formOne),
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const nextStep = () => {
    setCurrentStep((el) => el + 1);
  };

  const prevStep = () => {
    setCurrentStep((el) => el - 1);
  };

  const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);
  return (
    <Center>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {currentStep === 1 && <One />}
          {currentStep === 2 && <Two />}
          {currentStep === 3 && <Three />}
          <NavigationButtons nextStep={nextStep} prevStep={prevStep} currentStep={currentStep} />
        </form>
      </FormProvider>
    </Center>
  );
};

Home.Layout = BaseLayout;

export default Home;
