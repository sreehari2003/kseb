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
  FormErrorMessage,
} from '@chakra-ui/react';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { issueValidator } from '@app/views/validator';
import { FileInput } from './File';

interface Prop {
  isOpen: boolean;
  onClose: () => void;
}

type Event = InferType<typeof issueValidator>;

export const IssueModal = ({ isOpen, onClose }: Prop) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>({
    mode: 'onSubmit',
    resolver: yupResolver(issueValidator),
  });

  const handleFormData: SubmitHandler<Event> = (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose} scrollBehavior="outside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <form onSubmit={handleSubmit(handleFormData)}>
          <ModalHeader>
            <Heading as="h2" fontSize="30px">
              Create a Issue
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody rowGap="30px" display="flex" flexDir="column">
            <FormControl isInvalid={!!errors.title}>
              <FormLabel fontSize="14px">Tile</FormLabel>
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
              <FormErrorMessage>image should not be empmty</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel fontSize="14px">Post Number</FormLabel>
              <Input type="string" placeholder="KN/76/10" {...register('post_id')} />
              <FormErrorMessage>Post number should not be empty</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <Flex justifyContent="space-around" mt="20px" mb="20px">
            <Button colorScheme="blue" w="40%" variant="outline" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button colorScheme="purple" w="40%" type="submit">
              Confirm
            </Button>
          </Flex>
        </form>
      </ModalContent>
    </Modal>
  );
};
