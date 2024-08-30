'use client'

import { jsClient } from '@/utils/supabase/form-server';
import { redirect, usePathname } from "next/navigation";
import Sidebar from '@/app/uiComponents/sidebar';
import UtilityBar from '@/app/uiComponents/utilityBar';
import Loading from '@/app/uiComponents/loading';
import DetailView from './detail-view';
import { useEffect, useState } from 'react';

export default function TeacherDetial(){
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
        const teacherId = pathPartition.pop() || pathPartition.pop()

        getTeacherDetail(teacherId)
    }, [])

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
                <UtilityBar/>

                {
                    teacherInfo !== undefined ?
                    <div className='w-full content px-8 py-7 flex justify-center'>
                        <DetailView teacherInfo={teacherInfo} />
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