import React from 'react';
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
  Tfoot,
  Box,
  Heading,
  Button,
} from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';

const Users: NextPageWithLayout = () => (
  <Box>
    <Heading mt="20px" mb="20px" ml="30">
      Team members
    </Heading>
    <Box width="100%" p={4} borderWidth={1} borderRadius="md" boxShadow="md" ml="30">
      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr bg="gray.200">
              <Th>Name</Th>
              <Th>id</Th>
              <Th>phone number</Th>
              <Th>location </Th>
              <Th>designation</Th>
              <Th>option</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Thomas K P</Td>
              <Td>123 </Td>
              <Td>944654</Td>
              <Td>Ulliyeri</Td>
              <Td>foreman grade 1</Td>
              <Td>
                <Button leftIcon={<FaEye />}>View</Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Lakshmi</Td>
              <Td>456</Td>
              <Td>96678</Td>
              <Td>Naduvanur</Td>
              <Td>Asst. engineer</Td>
              <Td>
                <Button leftIcon={<FaEye />}>View</Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Mahadevan</Td>
              <Td>789</Td>
              <Td>91444</Td>
              <Td>Balussery</Td>
              <Td>Asst. engineer</Td>
              <Td>
                <Button leftIcon={<FaEye />}>View</Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Midhun P</Td>
              <Td>11239</Td>
              <Td>944</Td>
              <Td>Perambra</Td>
              <Td>Electricity worker</Td>
              <Td>
                <Button leftIcon={<FaEye />}>View</Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Freddy Honnai</Td>
              <Td>343</Td>
              <Td>81444</Td>
              <Td>kuttiadi</Td>
              <Td>Electricity worker</Td>
              <Td>
                <Button leftIcon={<FaEye />}>View</Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Rajan.k</Td>
              <Td>994</Td>
              <Td>94544</Td>
              <Td>kozhikode</Td>
              <Td>Electricity worker</Td>
              <Td>
                <Button leftIcon={<FaEye />}>View</Button>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Box>
  </Box>
);

Users.Layout = DashBoardLayout;

export default Users;
