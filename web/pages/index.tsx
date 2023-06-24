import {
  Box,
  Button,
  Flex,
  Center,
  Icon,
  useDisclosure,
  useToast,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Step,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { Card, IssueModal, Loader, Error } from '@app/views/home';
import { Issue } from '@app/types';
import { BsRecordCircle, BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { surakshaAPI } from '@app/config';
import { NextPageWithLayout } from 'next';
import { BaseLayout } from '@app/layout';

const App: NextPageWithLayout = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isStatusOpen, onOpen: onStatusOpen, onClose: onStatusClose } = useDisclosure();
  const [data, setData] = useState<Issue[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const steps = [{ title: 'Waiting' }, { title: 'On Working' }, { title: 'Completed' }];
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  useEffect(() => {
    (async () => {
      try {
        setError(false);
        const { data: dats } = await surakshaAPI.get('/issue');
        if (!dats.ok) {
          // @ts-ignore
          throw new Error();
        }
        setData(dats.data);
      } catch {
        toast({
          title: 'Failed to get all issues',
          description: 'Request to get issues returned error',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <IssueModal isOpen={isOpen} onClose={onClose} setData={setData} />
      <Box minH="100vh">
        <Flex
          flexWrap="wrap"
          position="relative"
          flexDir={{ base: 'column', md: 'row' }}
          columnGap="50px"
          rowGap="50px"
          p="6"
        >
          <Modal isOpen={isStatusOpen} onClose={onStatusClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>View Status</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stepper index={activeStep} orientation="vertical" height="400px" gap="0">
                  {steps.map((step, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<BsRecordCircle />}
                          incomplete={<BsFillCheckCircleFill />}
                          active={<AiFillExclamationCircle />}
                        />
                      </StepIndicator>

                      <Box flexShrink="0">
                        <StepTitle>{step.title}</StepTitle>
                      </Box>

                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </ModalBody>
            </ModalContent>
          </Modal>
          {data &&
            data.map((el) => (
              <Card
                desc={el.title}
                title={el.title}
                CreatedAt={el.CreatedAt}
                DeletedAt={el.DeletedAt}
                post_id={el.post_id}
                id={el.ID}
                ID={el.ID}
                UpdatedAt={el.UpdatedAt}
                onClick={onStatusOpen}
              />
            ))}
          {isError && <Error />}
          {data?.length === 0 && (
            <Center h="70vh" w="full">
              <Heading>Nothing To See Here</Heading>
            </Center>
          )}

          <Button
            colorScheme="teal"
            shadow="lg"
            rounded="full"
            right={{ base: '10', md: '90' }}
            bottom="10"
            position="fixed"
            p="6"
            onClick={() => onOpen()}
          >
            <Icon as={GrAdd} color="white" fontSize="20px" />
          </Button>
        </Flex>
      </Box>
    </>
  );
};

App.Layout = BaseLayout;

export default App;
