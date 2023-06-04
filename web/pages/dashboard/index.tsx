import React from 'react';
import { NextPageWithLayout } from 'next';
import { AiOutlineBell, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { DashBoardLayout } from '@app/layout';

const Dashboard: NextPageWithLayout = () => (
  <Flex>
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
            Good morning, james!
          </Heading>
        </Box>
        <Box ml="400px" height="40px" width="40px" mt="10px">
          <AiOutlineBell width="40px" height="40px" size="25px" />
        </Box>
      </Flex>
      <Flex
        width="900px"
        height="180px"
        mt="23px"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
      >
        <Box width="25px" height="25px" mr="5px">
          <AiOutlineLeft size="25px" color="#D9D9D9" />{' '}
        </Box>
        <Flex
          width="790px"
          height="150px"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
        >
          <Box
            border="1px"
            borderColor="#0000001f"
            borderRadius="20px"
            width="250px"
            height="150px"
          />
          <Box
            border="1px"
            borderColor="#0000001f"
            borderRadius="20px"
            width="250px"
            height="150px"
            ml="20px"
          />
          <Box
            border="1px"
            borderColor="#0000001f"
            borderRadius="20px"
            width="250px"
            height="150px"
            ml="20px"
          />
        </Flex>
        <Box width="25px" height="25px" ml="5px">
          {' '}
          <AiOutlineRight values="" size="25px" color="#D9D9D9" />
        </Box>
      </Flex>

      <Flex
        bgColor="white"
        width="900px"
        height="280px"
        mt="23px"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        border="1px"
        borderColor="#0000001f"
        borderRadius="20px"
      >
        <Flex
          width="850px"
          height="250px"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="column"
          ml="-20px"
        >
          <Heading size="xs" lineHeight="20px" fontWeight="light">
            Recent Issues
          </Heading>
          <Grid alignItems="center" justifyContent="center">
            <GridItem w="850px" h="1px" bg="#0000003f" />
          </Grid>
          <Box
            width="850px"
            height="70px"
            bg="red"
            mt="10px"
            borderRadius="10px"
            bgColor="#418E9E"
          />
          <Box
            width="850px"
            height="70px"
            bg="red"
            mt="5px"
            borderRadius="10px"
            bgColor="#DCDCDC"
          />
          <Box
            width="850px"
            height="70px"
            bg="red"
            mt="5px"
            borderRadius="10px"
            bgColor="#DCDCDC"
          />
        </Flex>
      </Flex>
      <Grid alignItems="center" justifyContent="center">
        <GridItem
          w="870px"
          h="1px"
          bg="#0000003f"
          border="1px"
          borderColor="#0000001f"
          borderRadius="20px"
          mt="-2px"
        />
      </Grid>
    </Flex>
  </Flex>
);
Dashboard.Layout = DashBoardLayout;
export default Dashboard;
