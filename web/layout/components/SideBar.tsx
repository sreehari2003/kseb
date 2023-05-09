import { Flex, Heading, Grid, GridItem, Box, Link } from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';
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
    name: 'Team',
    route: '/dashboard/team',
    logo: MdPeople,
  },
  {
    name: 'OverView',
    route: '/dashboard/overview',
    logo: BsGraphUp,
  },
  {
    name: 'Todo',
    route: '/dashboard/todo',
    logo: RiTodoFill,
  },
];

export const SideBar = () => (
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
    {Data.map((el) => (
      <Flex width="293px" h="58px" mt="10px" flexDirection="column">
        <Flex h="58px" flexDirection="row" justifyContent="center" alignItems="center" pl="34px">
          <Link href={el.route} alignItems="center" display="flex" _hover={{ textDecor: 'none' }}>
            <el.logo width="60px" height="30px" fontWeight="bold" />
            <Heading
              ml="27.49px"
              mt="0px"
              size="30.82px"
              lineHeight="46.24px"
              width="187.46px"
              height="45.13px"
              fontWeight="bold"
            >
              {el.name}
            </Heading>
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
);
