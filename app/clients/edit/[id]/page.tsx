'use client'

import { jsClient } from '@/utils/supabase/form-server';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import Loading from '@/app/uiComponents/loading';
import EditForm from "./edit-form"

export default function ClientEdition(){
    const supabase = jsClient
    const pathname = usePathname()

    const [clientInfo, setClientInfo] = useState(undefined)

    async function getClientDetial(clientID : any) {
        const { data: clients } = await supabase.from('clients').select().eq("client_id", clientID)
        console.log("Clients:", clients)

        clients !== null ?  setClientInfo(clients[0]) : setClientInfo(undefined)
    }

    useEffect(() => {
        const pathPartition = pathname.split('/')
        const clientID = pathPartition.pop() || pathPartition.pop()

        getClientDetial(clientID)
    }, [])

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-5xl'>

                        <EditForm clientInfo={clientInfo} />

                    </div>
                </div>

            </div>
        </main>
    )
}