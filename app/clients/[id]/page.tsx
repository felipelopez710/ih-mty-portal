'use client'

import { jsClient } from '@/utils/supabase/form-server';
import { redirect, usePathname } from "next/navigation";
import Sidebar from '@/app/uiComponents/sidebar';
import UtilityBar from '@/app/uiComponents/utilityBar';
import Loading from '@/app/uiComponents/loading';
import DetailView from './detail-view';
import { useEffect, useState } from 'react';

export default function ClientDetail(){
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

                {
                    clientInfo !== undefined ?
                    <div className='w-full content px-8 py-7 flex justify-center'>
                        <DetailView clientInfo={clientInfo} />
                    </div>
                    :
                    <div className="loading-page w-full pl-52 h-screen flex flex-col">
                        <UtilityBar/>
                        <div className="flex-1 flex items-center justify-center">
                            <Loading/>
                        </div>
                    </div>
                }

                
            </div>
        </main>
    )
}