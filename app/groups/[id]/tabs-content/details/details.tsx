'use client'

import { createClient } from "@/utils/supabase/client"

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Form, Button, Input, Select, DatePicker, Spin } from "antd";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

type FieldType = {
    group_code?: string;
    client_id?: string;
    selected_students?: any;
    group_id?: any;
}

const studentOptions = [
    {
        label: "Student 1",
        value: "Student 1",
    },
    {
        label: "Student 2",
        value: "Student 2",
    },
    {
        label: "Student 3",
        value: "Student 3",
    },
]

export default function DetailsTab({groupInformation, groupStudents, folios}:any){
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    return(
        <div className="details-container w-full flex items-center justify-center py-5">
            <div className="w-full max-w-3xl">
                <div className='header-container flex justify-between items-center mb-6 w-full'>
                    <div className='text-xl font-semibold flex items-center'>
                        Group Detail 
                    </div> 

                    <Link href={`/groups/edit/${groupInformation.group_id}`}>
                        <div className="flex gap-1 items-center text-ih-blue">
                            <div className='font-medium'>
                                Edit
                            </div>
                            <ModeEditOutlinedIcon fontSize="small" />
                        </div>
                    </Link>
                </div>

                <div className="information-container w-full flex gap-5">
                    <div className="group-info-container flex-1">
                        <div className="w-full bg-white rounded-xl p-5 border border-gray-200 flex flex-col gap-5">
                            <div className="text-base font-semibold">Group information</div>
                            <div className="information-lines flex flex-col gap-2">
                                <div className="info-line w-full flex gap-2">
                                    <div className="w-1/3 text-slate-400">Group code</div>
                                    <div className="w-2/3">{groupInformation?.group_code}</div>
                                </div>
                                <div className="info-line w-full flex gap-2">
                                    <div className="w-1/3 text-slate-400">Client</div>
                                    <div className="w-2/3">{groupInformation?.client_name}</div>
                                </div>
                                <div className="info-line w-full flex gap-2">
                                    <div className="w-1/3 text-slate-400">Folios</div>
                                    <div className="w-2/3">{folios?.length}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="students flex-1">
                        <div className="w-full bg-white rounded-xl p-5 border border-gray-200 flex flex-col gap-5">
                            <div className="text-base font-semibold">Students</div>
                            <div className="students-section w-full flex flex-col gap-2">
                                {
                                    groupStudents?.map((student:any)=>(
                                        <div className="w-full border border-gray-200 px-4 py-3 rounded-xl flex gap-3 items-center">
                                            <div className="avatar">
                                                <AccountCircleOutlinedIcon/>
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <div className="font-semibold">{student.students.full_name}</div>
                                                <div className="text-slate-500">{student.students.email}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}