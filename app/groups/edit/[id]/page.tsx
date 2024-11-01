'use client'

import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import EditGroupForm from "./edit-group-form"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";


export default function EditGroup(){
    const pathname = usePathname()

    const [groupId, setGroupId]:any = useState(undefined)

    useEffect(() => {
        const pathPartition = pathname.split('/')
        const group = pathPartition.pop() || pathPartition.pop()
        
        setGroupId(group)
    }, [])

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7 flex justify-center'>
                    
                    
                    <div className='w-full max-w-2xl'>

                        {groupId !== undefined && <EditGroupForm groupId={groupId} />}

                    </div>

                </div>
                
            </div>
        </main>
    )
}