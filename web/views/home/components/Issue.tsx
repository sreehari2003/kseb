/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Flex,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { issueValidator } from '@app/views/validator';
import { surakshaAPI } from '@app/config';
import { Issue } from '@app/types';
import { FileInput } from './File';

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  setData: React.Dispatch<any>;
}

type Event = InferType<typeof issueValidator>;

export const IssueModal = ({ isOpen, onClose, setData }: Prop) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Event>({
    mode: 'onSubmit',
    resolver: yupResolver(issueValidator),
  });
  const handleFormData: SubmitHandler<Event> = async (datas) => {
    try {
      const { data } = await surakshaAPI.post('/issue', datas);
      if (!data.ok) {
        throw new Error();
      } else {
        setData((el: Issue[]) => [...el, data.data]);
        toast({
          title: 'Issue creation Successfull.',
          description: 'Issue was created successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
      // close modal after submission
      onClose();
    } catch {
      toast({
        title: 'Issue creation failed.',
        description: 'Something went wrong when creating issue',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose} scrollBehavior="outside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <form onSubmit={handleSubmit(handleFormData)}>
          <ModalHeader>
            <Heading as="h2" fontSize="30px">
              Create a issue
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody rowGap="30px" display="flex" flexDir="column">
            <FormControl isInvalid={!!errors.title}>
              <FormLabel fontSize="14px">Title</FormLabel>
              <Input type="string" placeholder="issue" {...register('title')} />
              <FormErrorMessage>title should not be empty</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.desc}>
              <FormLabel fontSize="14px">Description</FormLabel>
              <Textarea placeholder="Enter a description" {...register('desc')} />
              <FormErrorMessage>description should not be empty</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="14px">Your cover image</FormLabel>
              <FileInput />
              <FormErrorMessage>image should not be empty</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel fontSize="14px">Post Number</FormLabel>
              <Input type="string" placeholder="KN/76/10" {...register('post_id')} />
              <FormErrorMessage>Post number should not be empty</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <Flex justifyContent="space-around" mt="20px" mb="20px">
            <Button colorScheme="teal" w="40%" variant="outline" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button colorScheme="teal" w="40%" type="submit" isLoading={isSubmitting}>
              Confirm
            </Button>
          </Flex>
        </form>
      </ModalContent>
    </Modal>
  );
};
