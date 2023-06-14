/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Center, useToast } from '@chakra-ui/react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useRouter } from 'next/router';
import { One, Two, NavigationButtons, Three } from '@app/views/form';
import { FinalForm, StepByStepForm } from '@app/views/validator';
import { DashBoardLayout } from '@app/layout';
import { surakshaAPI } from '@app/config';

type FormType = InferType<typeof FinalForm>;

const Home = () => {
  const toast = useToast();
  const router = useRouter();
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

  const onSubmit: SubmitHandler<FormType> = async (datas) => {
    if (isReadyForSubmission) {
      // send post request
      try {
        const { id } = router.query;
        // creating new form
        const { data } = await surakshaAPI.post(`/form?id=${id}`, {
          ...datas,
          typeofjob: datas.typeofjob.value,
          voltage: datas.voltage.value,
          status: 'WORKING',
        });
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
  };
  return (
    <Center w="full">
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

Home.Layout = DashBoardLayout;

export default Home;

// This gets called on every request
export const getServerSideProps = async (ctx: any) => {
  const id = ctx.query.id;
  if (!id) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  }
  const { data } = await surakshaAPI.get(`/issue/${id}`);
  if (!data.ok) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  }
  // Pass data to the page via props
  return { props: { data } };
};
