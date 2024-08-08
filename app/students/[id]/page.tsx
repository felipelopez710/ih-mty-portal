'use client'

import { jsClient } from '@/utils/supabase/form-server';
import { redirect, usePathname } from "next/navigation";
import Sidebar from '@/app/uiComponents/sidebar';
import UtilityBar from '@/app/uiComponents/utilityBar';
import Loading from '@/app/uiComponents/loading';
import DetailView from './detail-vew';
import { useEffect, useState } from 'react';

export default function StudentDetail(){
    const supabase = jsClient
    const pathname = usePathname()

    const [studentInfo, setStudentInfo] = useState(undefined)

    async function getStudentDetail(studentID: any){
        const { data: students } = await supabase.from('students').select().eq("student_id", studentID)
        console.log("Students: ", students)

        students !== null ? setStudentInfo(students[0]) : setStudentInfo(undefined)
    }

    useEffect(() => {
        const pathPartition = pathname.split('/')
        const studentID = pathPartition.pop() || pathPartition.pop()

        getStudentDetail(studentID)
    }, [])
    

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
                <UtilityBar/>

                {
                    studentInfo !== undefined ?
                    <div className='w-full content px-8 py-7 flex justify-center'>
                        <DetailView studentInfo={studentInfo} />
                    </div>
                    :
                    <Loading/>
                }

                
            </div>
        </main>
    )
}