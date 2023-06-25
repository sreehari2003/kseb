import React, { useState } from 'react'
import { supabaseClient} from "@app/config/supaBase"
import { useToast } from '@chakra-ui/react'
import { surakshaAPI } from '@app/config'

export const useIssueStatus = () => {
    const toast = useToast()
    const [isTodoLoading,setLoading] = useState(false)
      const getStatus = async (id:number) =>{
        try {
            const { data,error} = await supabaseClient.from("form").select("*").eq("issue_id",id)
            if(error){
                throw new Error()
            }
            return data[0].status
        }catch{
            // toast({
            //     title: 'failed to get data.',
            //     description: 'Something went wrong while getting form data',
            //     status: 'error',
            //     duration: 9000,
            //     isClosable: true,
            //   });

        }
      }

      const getMyStatus = async (id:number)=>{
        setLoading(true)
        try{
            const { data,error} = await supabaseClient.from("form").select("*").eq("employee1",id).eq("status","WORKING")
            if(error){
                throw new Error()
            }
            const {data:res} = await surakshaAPI.get(`/officials/${data[0].official_id}`)
            data[0].admin = res.data.name
            return data

        }catch{
            // toast({
            //     title: 'failed to get data.',
            //     description: 'Something went wrong while getting form data',
            //     status: 'error',
            //     duration: 9000,
            //     isClosable: true,
            //   });
        }finally{
            setLoading(false)
        }
      }
      return {getStatus,getMyStatus,isTodoLoading}
}

