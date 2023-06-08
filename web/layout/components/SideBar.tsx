import { Flex, Heading, Grid, GridItem, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { AiOutlineLogout } from 'react-icons/ai';
import { HiUserCircle } from 'react-icons/hi';
import { MdDashboard, MdPeople } from 'react-icons/md';
import { RiTodoFill } from 'react-icons/ri';

const Data = [
  {
    name: 'DashBoard',
    route: '/dashboard',
    logo: MdDashboard,
  },
  {
    name: 'Profile',
    route: '/dashboard/profile',
    logo: HiUserCircle,
  },
  {
    name: 'Users',
    route: '/dashboard/users',
    logo: MdPeople,
  },
  // {
  //   name: 'OverView',
  //   route: '/dashboard/overview',
  //   logo: BsGraphUp,
  // },
  {
    name: 'Todo',
    route: '/dashboard/todo',
    logo: RiTodoFill,
  },
];

export const SideBar = () => (
  <Flex
    height="84vh"s
    width="293px"
    m="10px"
    backgroundColor="rgba(217, 217, 217, 1)"
    flexDirection="column"
    borderRadius="25px"
    position="sticky"
    top="10"
    justifyContent="space-between"
  >
    {Data.map((el) => (
      <Flex width="293px" h="58px" mt="10px" flexDirection="column">
        <Flex h="58px" flexDirection="row" justifyContent="center" alignItems="center" pl="34px">
          <Link href={el.route}>
            <Box alignItems="center" display="flex" _hover={{ textDecor: 'none' }}>
              <el.logo width="60px" height="30px" fontWeight="400" fontSize="30px" />
              <Heading
                ml="27.49px"
                mt="0px"
                fontSize="30px"
                lineHeight="46.24px"
                width="187.46px"
                height="45.13px"
                fontWeight="400"
              >
                {el.name}
              </Heading>
            </Box>
          </Link>
        </Flex>
        <Grid alignItems="center" justifyContent="center">
          <GridItem w="264px" h="1px" bg="white " />
        </Grid>
      </Flex>
    ))}
    <Flex width="293px" h="60px" mt="195px" flexDirection="column">
      <Grid alignItems="center" justifyContent="center">
        <GridItem w="264px" h="1px" bg="white " />
      </Grid>
      <Flex h="58px" flexDirection="row" justifyContent="center" alignItems="center" pl="34px">
        <Box>
          <AiOutlineLogout width="30px" height="30px" fontWeight="400" fontSize="30px" />
        </Box>
        <Heading
          ml="27.49px"
          mt="0px"
          size="30.82px"
          lineHeight="46.24px"
          width="187.46px"
          height="45.13px"
          fontWeight="400"
          fontSize="30px"
        >
          Log out
        </Heading>
      </Flex>
    </Flex>
  </Flex>
);
