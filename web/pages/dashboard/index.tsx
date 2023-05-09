import React from 'react';
import { NextPageWithLayout } from 'next';
import { BaseLayout } from '@app/layout';
import { MdDashboard, MdPeople } from 'react-icons/md';
import { RiTodoFill } from 'react-icons/ri';
import { HiUserCircle } from 'react-icons/hi';
import { AiOutlineLogout, AiOutlineBell, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';

import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const Dashboard: NextPageWithLayout = () => (
  <Flex>
    <Flex
      height="580px"
      width="293px"
      mt="10px"
      ml="10px"
      mb="10px"
      backgroundColor="#D9D9D9;"
      flexDirection="column"
      borderRadius="20px"
    >
      <Flex width="293px" h="58px" mt="10px" flexDirection="column">
        <Flex h="58px" flexDirection="row" justifyContent="center" alignItems="center" pl="34px">
          <Box>
            <MdDashboard width="30px" height="30px" />
          </Box>
          <Heading
            ml="27.49px"
            mt="0px"
            size="30.82px"
            lineHeight="46.24px"
            fontWeight="light"
            width="187.46px"
            height="45.13px"
          >
            Dashboard
          </Heading>
        </Flex>
        <Grid alignItems="center" justifyContent="center">
          <GridItem w="264px" h="1px" bg="white " />
        </Grid>
      </Flex>
      <Flex width="293px" h="60px" mt="2px" flexDirection="column">
        <Flex h="58px" flexDirection="row" justifyContent="center" alignItems="center" pl="34px">
          <Box>
            <HiUserCircle width="30px" height="30px" />
          </Box>
          <Heading
            ml="27.49px"
            mt="0px"
            size="30.82px"
            lineHeight="46.24px"
            fontWeight="light"
            width="187.46px"
            height="45.13px"
          >
            <Link href={'/dashboard/profile'}>Profile</Link>
          </Heading>
        </Flex>
        <Grid alignItems="center" justifyContent="center">
          <GridItem w="264px" h="1px" bg="white " />
        </Grid>
      </Flex>
      <Flex width="293px" h="60px" mt="2px" flexDirection="column">
        <Flex h="58px" flexDirection="row" justifyContent="center" alignItems="center" pl="34px">
          <Box>
            <MdPeople width="30px" height="30px" />
          </Box>
          <Heading
            ml="27.49px"
            mt="0px"
            size="30.82px"
            lineHeight="46.24px"
            fontWeight="light"
            width="187.46px"
            height="45.13px"
          >
            Team
          </Heading>
        </Flex>
        <Grid alignItems="center" justifyContent="center">
          <GridItem w="264px" h="1px" bg="white " />
        </Grid>
      </Flex>
      <Flex width="293px" h="60px" mt="2px" flexDirection="column">
        <Flex h="58px" flexDirection="row" justifyContent="center" alignItems="center" pl="34px">
          <Box>
            <BsGraphUp width="30px" height="30px" />
          </Box>
          <Heading
            ml="27.49px"
            mt="0px"
            size="30.82px"
            lineHeight="46.24px"
            fontWeight="light"
            width="187.46px"
            height="45.13px"
          >
            Overview
          </Heading>
        </Flex>
        <Grid alignItems="center" justifyContent="center">
          <GridItem w="264px" h="1px" bg="white " />
        </Grid>
      </Flex>
      <Flex width="293px" h="60px" mt="2px" flexDirection="column">
        <Flex h="58px" flexDirection="row" justifyContent="center" alignItems="center" pl="34px">
          <Box>
            <RiTodoFill width="30px" height="30px" />
          </Box>
          <Heading
            ml="27.49px"
            mt="0px"
            size="30.82px"
            lineHeight="46.24px"
            fontWeight="light"
            width="187.46px"
            height="45.13px"
          >
            Todo
          </Heading>
        </Flex>
        <Grid alignItems="center" justifyContent="center">
          <GridItem w="264px" h="1px" bg="white " />
        </Grid>
      </Flex>
      <Flex width="293px" h="60px" mt="195px" flexDirection="column">
        <Grid alignItems="center" justifyContent="center">
          <GridItem w="264px" h="1px" bg="white " />
        </Grid>
        <Flex h="58px" flexDirection="row" justifyContent="center" alignItems="center" pl="34px">
          <Box>
            <AiOutlineLogout width="30px" height="30px" />
          </Box>
          <Heading
            ml="27.49px"
            mt="0px"
            size="30.82px"
            lineHeight="46.24px"
            fontWeight="light"
            width="187.46px"
            height="45.13px"
          >
            Log out
          </Heading>
        </Flex>
      </Flex>
    </Flex>

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
          <AiOutlineBell width="40px" height="40px" size="25px"></AiOutlineBell>
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
          <AiOutlineLeft size="25px" color="#D9D9D9"></AiOutlineLeft>{' '}
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
          ></Box>
          <Box
            border="1px"
            borderColor="#0000001f"
            borderRadius="20px"
            width="250px"
            height="150px"
            ml="20px"
          ></Box>
          <Box
            border="1px"
            borderColor="#0000001f"
            borderRadius="20px"
            width="250px"
            height="150px"
            ml="20px"
          ></Box>
        </Flex>
        <Box width="25px" height="25px" ml="5px">
          {' '}
          <AiOutlineRight values="" size="25px" color="#D9D9D9"></AiOutlineRight>
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
          ></Box>
          <Box
            width="850px"
            height="70px"
            bg="red"
            mt="5px"
            borderRadius="10px"
            bgColor="#DCDCDC"
          ></Box>
          <Box
            width="850px"
            height="70px"
            bg="red"
            mt="5px"
            borderRadius="10px"
            bgColor="#DCDCDC"
          ></Box>
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
        ></GridItem>
      </Grid>
    </Flex>
  </Flex>
);
Dashboard.Layout = BaseLayout;
export default Dashboard;
