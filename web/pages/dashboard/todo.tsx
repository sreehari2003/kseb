import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Grid, GridItem, Button } from '@chakra-ui/react';
import { DashBoardLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';
import { TodoCard } from '@app/views/dashboard';
import { useIssueStatus } from '@app/hooks/api/useIssueStatus';
import { supabaseClient } from '@app/config/supaBase';
import { useAuthCtx } from '@app/hooks';

const Todo: NextPageWithLayout = () => {
  const {getMyStatus} = useIssueStatus()
  const {data:user} = useAuthCtx()
  const [task,setTask] = useState<any[] | null>(null)
  useEffect(()=>{
    (async ()=>{
      const data = await getMyStatus(user?.ID)
      setTask(data as any[])
    })()
  },[])

  const finish =async (id:string)=>{
     await supabaseClient.from("form").update({"status":"COMPLETED"}).eq("id",id)
     setTimeout(()=>{},2000)
    const data = await getMyStatus(user?.id)
    setTask(data as any[])
  }

  return (
  <Box>
    <Heading
      mt="20px"
      ml="20px"
      lineHeight="44px"
      fontSize="3xl"
      fontWeight="extrabold"
      height="71.13px"
    >
      Todo list
    </Heading>
    <Grid ml="10px" mt="-20px" alignItems="center" justifyContent="center">
      <GridItem  h="3px" bg="#D1D1D180" />
    </Grid>
    <Flex flexWrap="wrap" gap="20px" p="20px" flexDir={{base:"column",lg:"row"}} alignItems={{base:"center",md:"normal"}} justifyContent={{base:"center",md:"normal"}}>
      {
       task &&  task?.map((el,index)=>(
        <Box key={el.id}>
          <TodoCard admin={el.admin} date={el.created_at} desc={el.description} location={el.location} number={index+1} finish={()=>finish(el.id)}/>
        </Box>
        ))
      }
      {!task && (
        <>
          <Heading textAlign="center">No Tasks Yet</Heading>
        </>
      )}
    </Flex>
  </Box>
);
  }
Todo.Layout = DashBoardLayout;

export default Todo;
