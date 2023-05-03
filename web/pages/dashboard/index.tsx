import React from 'react'
import { NextPageWithLayout } from 'next';
import { BaseLayout } from '@app/layout';
import {MdDashboard,MdPeople} from 'react-icons/md'
import {RiTodoFill } from 'react-icons/ri'
import {HiUserCircle} from 'react-icons/hi'
import {AiOutlineLogout} from 'react-icons/ai'
import {BsGraphUp} from 'react-icons/bs'


import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react'

const Dashboard:NextPageWithLayout = () => {
  return (
    <Flex
    
      height="860px"
      width="293px"
      mt="10px"
      ml="10px"
      mb="10px"
      backgroundColor="#D9D9D9;"
      flexDirection="column"
      borderRadius="20px"
      
      
     >
    <Flex 
    width="293px"
    h="67px"
    mt="20px"
    flexDirection="column"
    >
       <Flex
       h="74px"
       flexDirection="row"
       justifyContent="center"
       alignItems="center"
       pl="34px"
       
       >
        <Box>
        <MdDashboard 
        width="30px"
        height="30px"
        ></MdDashboard>
        </Box>
       <Heading
        ml="27.49px"
        mt="0px"
        size="30.82px"
        lineHeight="46.24px"
        fontWeight="light"
        width="187.46px"
        height="45.13px"


        >Dashboard</Heading>
       </Flex>
    <Grid alignItems="center"
    justifyContent="center">
        <GridItem
        w='264px' 
        h='1px'
        bg='white '>

        </GridItem>
      </Grid>
    </Flex>
    <Flex 
    width="293px"
    h="76px"
    mt="2px"
    flexDirection="column"
    >
       <Flex
       h="74px"
       flexDirection="row"
       justifyContent="center"
       alignItems="center"
       pl="34px"
       
       >
        <Box>
        <HiUserCircle 
        width="30px"
        height="30px"
        ></HiUserCircle>
        </Box>
       <Heading
        ml="27.49px"
        mt="0px"
        size="30.82px"
        lineHeight="46.24px"
        fontWeight="light"
        width="187.46px"
        height="45.13px"


        >Profile</Heading>
       </Flex>
    <Grid alignItems="center"
    justifyContent="center">
        <GridItem
        w='264px' 
        h='1px'
        bg='white '>

        </GridItem>
      </Grid>
    </Flex>
    <Flex 
    width="293px"
    h="76px"
    mt="2px"
    flexDirection="column"
    >
       <Flex
       h="74px"
       flexDirection="row"
       justifyContent="center"
       alignItems="center"
       pl="34px"
       
       >
        <Box>
        <MdPeople
        width="30px"
        height="30px"
        ></MdPeople>
        </Box>
       <Heading
        ml="27.49px"
        mt="0px"
        size="30.82px"
        lineHeight="46.24px"
        fontWeight="light"
        width="187.46px"
        height="45.13px"


        >Team</Heading>
       </Flex>
    <Grid alignItems="center"
    justifyContent="center">
        <GridItem
        w='264px' 
        h='1px'
        bg='white '>

        </GridItem>
      </Grid>
    </Flex>
    <Flex 
    width="293px"
    h="76px"
    mt="2px"
    flexDirection="column"
    >
       <Flex
       h="74px"
       flexDirection="row"
       justifyContent="center"
       alignItems="center"
       pl="34px"
       
       >
        <Box>
        <BsGraphUp
        width="30px"
        height="30px"
        ></BsGraphUp>
        </Box>
       <Heading
        ml="27.49px"
        mt="0px"
        size="30.82px"
        lineHeight="46.24px"
        fontWeight="light"
        width="187.46px"
        height="45.13px"


        >Overview</Heading>
       </Flex>
    <Grid alignItems="center"
    justifyContent="center">
        <GridItem
        w='264px' 
        h='1px'
        bg='white '>

        </GridItem>
      </Grid>
    </Flex>
    <Flex 
    width="293px"
    h="76px"
    mt="2px"
    flexDirection="column"
    >
       <Flex
       h="74px"
       flexDirection="row"
       justifyContent="center"
       alignItems="center"
       pl="34px"
       
       >
        <Box>
        <RiTodoFill 
        width="30px"
        height="30px"
        ></RiTodoFill>
        </Box>
       <Heading
        ml="27.49px"
        mt="0px"
        size="30.82px"
        lineHeight="46.24px"
        fontWeight="light"
        width="187.46px"
        height="45.13px"


        >Todo</Heading>
       </Flex>
    <Grid alignItems="center"
    justifyContent="center">
        <GridItem
        w='264px' 
        h='1px'
        bg='white '>

        </GridItem>
      </Grid>
    </Flex>
    <Flex 
    width="293px"
    h="76px"
    mt="380px"
    flexDirection="column"
    >
       <Flex
       h="74px"
       flexDirection="row"
       justifyContent="center"
       alignItems="center"
       pl="34px"
       
       >
        <Box>
        <AiOutlineLogout
        width="30px"
        height="30px"
        ></AiOutlineLogout>
        </Box>
       <Heading
        ml="27.49px"
        mt="0px"
        size="30.82px"
        lineHeight="46.24px"
        fontWeight="light"
        width="187.46px"
        height="45.13px"


        >Log out</Heading>
       </Flex>
    </Flex>


    </Flex>
  )
}
Dashboard.Layout=BaseLayout
export default Dashboard
