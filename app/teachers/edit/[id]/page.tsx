'use client'

import { jsClient } from '@/utils/supabase/form-server';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import Loading from '@/app/uiComponents/loading';
import EditForm from './edit-form';

export default function TeacherEdition(){
    const supabase = jsClient
    const pathname = usePathname()

    const [teacherInfo, setTeacherInfo] = useState(undefined)

    async function getTeacherDetail(teacherId : any) {
        const { data: teachers } = await supabase.from('teachers').select().eq("teacher_id", teacherId)
        console.log("Teachers:", teachers)

        teachers !== null ?  setTeacherInfo(teachers[0]) : setTeacherInfo(undefined)
    }

    useEffect(() => {
        const pathPartition = pathname.split('/')
        const clientID = pathPartition.pop() || pathPartition.pop()

        getTeacherDetail(clientID)
    }, [])


    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-5xl'>

                        <EditForm teacherInfo={teacherInfo} />

                    </div>
                </div>

            </div>
        </main>
    )
}