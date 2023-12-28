import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from 'next';
import { AiFillExclamationCircle } from 'react-icons/ai';

import {
  Box,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Step,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useDisclosure,
  useSteps,
  useToast,
} from '@chakra-ui/react';

import { DashBoardLayout } from '@app/layout';
import { BsFillCheckCircleFill, BsRecordCircle } from 'react-icons/bs';
import { Issue } from '@app/types';
import { surakshaAPI } from '@app/config';
import { IssueModal, Loader, Card } from '@app/views/home';
import { useAuthCtx } from '@app/hooks';

const Dashboard: NextPageWithLayout = () => {
  const toast = useToast();
  const { isOpen, onClose } = useDisclosure();
  const { data: userData } = useAuthCtx();
  const { isOpen: isStatusOpen, onOpen: onStatusOpen, onClose: onStatusClose } = useDisclosure();
  const [data, setData] = useState<Issue[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const steps = [{ title: 'Waiting' }, { title: 'On Working' }, { title: 'Completed' }];
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const showStatus = async (id: number) => {
    onStatusOpen();
    const res = 'WORKING';
    if (res === 'WORKING') {
      setActiveStep(2);
    }
    if (res === 'COMPLETED') {
      setActiveStep(3);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: dats } = await surakshaAPI.get('/issue');
        if (!dats.ok) {
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
    <Flex
      width="900px"
      height=""
      bgColor=""
      mt="10px"
      ml="40px"
      mb="15px"
      borderRadius="20px"
      flexDirection="column"
    >
      <Flex
        height="44px"
        mt="23px"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="row"
      >
        <Box width="440px" height="44px">
          <Heading
            mt="0px"
            lineHeight="44px"
            fontSize="3xl"
            fontWeight="light"
            width="438px"
            height="71.13px"
          >
            Hello, {`${userData && userData.name}!`}
          </Heading>
        </Box>
      </Flex>
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
            data.map((el: Issue) => (
              <Card
                desc={el.desc}
                title={el.title}
                CreatedAt={el.CreatedAt}
                DeletedAt={el.DeletedAt}
                post_id={el.post_id}
                ID={el.ID}
                UpdatedAt={el.UpdatedAt}
                onClick={() => showStatus(el.ID)}
                isAdmin
              />
            ))}
          {data?.length === 0 && (
            <Center h="70vh">
              <Heading>Nothing To See Here</Heading>
            </Center>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};
Dashboard.Layout = DashBoardLayout;
export default Dashboard;
