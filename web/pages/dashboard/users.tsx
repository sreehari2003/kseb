import React, { useState, useEffect } from 'react';
import { DashBoardLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Heading,
  useToast,
  Skeleton,
} from '@chakra-ui/react';
import { surakshaAPI } from '@app/config';

const ROLES: Record<string, string> = {
  AE: 'Assistent Engineer',
  SE: 'Sub Engineer',
  LM: 'Line Man',
  OV: 'Overseer',
};

const Users: NextPageWithLayout = () => {
  const [isUserLoading, setUserLoading] = useState<boolean>(false);
  const [data, setUserData] = useState<Record<string, any> | null>(null);
  const toast = useToast();
  const getUsers = async () => {
    try {
      setUserLoading(true);
      const { data: response } = await surakshaAPI.get('/officials/all');
      if (!response.ok) {
        throw new Error();
      }
      setUserData(response.data);
    } catch {
      toast({
        title: 'Failed to get all issues',
        description: 'Request to get issues returned error',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getUsers();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box w="full">
      <Heading mt="20px" mb="20px" ml="30">
        All Users
      </Heading>
      <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" ml="30">
        <TableContainer>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr bg="gray.200">
                <Th>Name</Th>
                <Th>id</Th>
                <Th>phone number</Th>
                <Th>location </Th>
                <Th>designation</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isUserLoading &&
                data &&
                data.map((el: any) => (
                  <Tr>
                    <Td>{el.name}</Td>
                    <Td>{el.id}</Td>
                    <Td>{el.phone}</Td>
                    <Td>{el.location}</Td>
                    <Td>{ROLES[el.Role]}</Td>
                  </Tr>
                ))}
              {isUserLoading && (
                <>
                  <Tr>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                  </Tr>
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
Users.Layout = DashBoardLayout;

export default Users;
