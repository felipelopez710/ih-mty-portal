'use client'

import dynamic from 'next/dynamic';

// Luego usa estos componentes de manera normal

import React from 'react';

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Sidebar from '@/app/uiComponents/sidebar';
import UtilityBar from '@/app/uiComponents/utilityBar';
import Timetable from './timetable-component';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Select, Space } from 'antd';

import TeacherSchedule from '@/components/pdfDocs/teacherSchedule';
/* const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });
const Document = dynamic(() => import('@react-pdf/renderer').then(mod => mod.Document), { ssr: false });
import { usePDF, Page, Text } from '@react-pdf/renderer'; */

export default function TimeableViewer() {
    const supabase = createClient();

    /* const [instance, updateInstance] = usePDF({ document: <TeacherSchedule /> }) */

    const [frequencyLoading, setFrequencyLoading] = useState(false)
    const [teachersList, setTeachersList]:any = useState([])
    const [frequencyLines, setFrequencyLines]:any = useState(undefined)
    const [activeTeacher, setActiveTeacher]:any = useState(undefined)

    async function getTeachers(){
        const { data: teachers, error: teachersError } = await supabase.from('teachers').select('teacher_id,full_name')

        if(teachers){
            console.log('Teachers list:', teachers)

            let teacherOptions:any = []

            teachers.map((teacher:any)=>{
                teacherOptions.push({
                    value: teacher.teacher_id,
                    label: teacher.full_name
                })
            })

            setTeachersList(teacherOptions)
        }
        if(teachersError){
            console.log('Error: ', teachersError)
        }
    }

    useEffect(() => {
        getTeachers()
    }, [])
    

    const handleChange = async(value: string) => {
        setFrequencyLoading(true)
        setFrequencyLines(undefined)
        console.log(`Selected: ${value}`);

        setActiveTeacher(value)
        
        const { data: classes, error: classesError } = await supabase.from('frequency_lines').select('*, folios(start_date, end_date, client_name, groups(group_code), levels(level))').eq('teacher_id', value) 
        if(classes){
            console.log('Teacher timetable: ', classes)
            setFrequencyLoading(false)
            setFrequencyLines(classes)
        }
        if(classesError){
            console.log('Error:', classesError)
        }
    };

    return(
        <main className='w-full'>

            <Sidebar/>

            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-6xl flex flex-col gap-5'>

                        <div className='flex flex-col gap-2'>
                            <div className='w-full flex gap-2 items-center'>
                                <ArrowBackRoundedIcon/>
                                <div className='font-semibold text-xl'>Timetable Viewer</div>
                            </div>
                            <div>
                                Select a teacher to view their current timetable 
                            </div>
                        </div>
                        
                        <div className='teacher-selector p-5 rounded-lg bg-white border border-gray-200 flex items-center justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div>Teacher:</div>
                                <Select
                                    style={{ width: 240 }}
                                    onChange={handleChange}
                                    options={teachersList}
                                />
                            </div>

                            <div className=''>
                                {/* {
                                    activeTeacher !== undefined &&
                                    <PDFDownloadLink document={<TeacherSchedule activeTeacher={activeTeacher} />} fileName="reporte.pdf">
                                        {
                                            instance.loading ? 'Loading' : 'Export'
                                        }
                                    </PDFDownloadLink>
                                } */}
                            </div>
                        </div>

                        <div className='timetable-table w-full flex flex-col gap-2 items-center'>

                            {
                                (frequencyLoading) && <div>Loading...</div>
                            }

                            {
                                (frequencyLines !== undefined && frequencyLines.length > 0) &&
                                <Timetable frequencyLines={frequencyLines} />
                            }

                            {
                                (frequencyLines !== undefined && frequencyLines.lenght == 0) &&
                                <div>
                                    No classes to show
                                </div>
                            }

                        </div>

                    </div>
                </div>

            </div>

        </main>
    )
}