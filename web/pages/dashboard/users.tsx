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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
} from '@chakra-ui/react';
import { surakshaAPI } from '@app/config';
import { Skelton } from '@app/views/dashboard';

const ROLES: Record<string, string> = {
  AE: 'Assistent Engineer',
  SE: 'Sub Engineer',
  LM: 'Line Man',
  OV: 'Overseer',
};

const Users: NextPageWithLayout = () => {
  const [isUserLoading, setUserLoading] = useState<boolean>(false);
  const [data, setUserData] = useState<Record<string, any> | null>(null);
  const [pendingUsers, setPendingUsers] = useState<Record<string, any> | null>(null);

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
        title: 'Failed to get all users',
        description: 'Request to get users returned error',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setUserLoading(false);
    }
  };

  const getPendingUsers = async () => {
    if (pendingUsers) return;
    try {
      setUserLoading(true);
      const { data: response } = await surakshaAPI.get('/officials/pending');
      if (!response.ok) {
        throw new Error();
      }
      setPendingUsers(response.data);
    } catch {
      toast({
        title: 'Failed to get all users',
        description: 'Request to get users returned error',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setUserLoading(false);
    }
  };

  const verifyUser = async (id: string) => {
    try {
      const { data: response } = await surakshaAPI.patch(`/officials/verify?id=${id}`);
      if (!response.ok) {
        throw new Error();
      }
      setPendingUsers(null);
      getPendingUsers();
    } catch {
      toast({
        title: 'Failed to verify the user',
        description: 'Request to verify returned error',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Verified Users</Tab>
            <Tab onClick={getPendingUsers}>Verification Requests</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
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
                    {isUserLoading && <Skelton />}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
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
                      pendingUsers &&
                      pendingUsers.map((el: any) => (
                        <Tr>
                          <Td>{el.name}</Td>
                          <Td>{el.id}</Td>
                          <Td>{el.phone}</Td>
                          <Td>{el.location}</Td>
                          <Td>{ROLES[el.Role]}</Td>
                          <Td>
                            <Button
                              colorScheme="teal"
                              variant="outline"
                              onClick={() => verifyUser(el.id)}
                            >
                              Verify
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    {isUserLoading && <Skelton />}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
Users.Layout = DashBoardLayout;

export default Users;
