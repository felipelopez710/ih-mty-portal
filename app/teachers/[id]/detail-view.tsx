'use client'

import { useState } from "react"
import Link from "next/link";

import TeacherInfromation from "./tabs-content/teacher-information/teacher-information";
import TeacherCalendar from "./tabs-content/teacher-calendar/teacher_calendar";

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Button, Tabs, TabsProps } from "antd";

export default function DetailView({ teacherInfo, teacherClasses }: any){

    const [activeTab, setActiveTab] = useState('1')

    const onChange = (key: string) => {
        console.log(key);
        setActiveTab(key)
    };

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Teacher information',
        },
        {
          key: '2',
          label: 'Calendar',
        },
    ];

    return(
        <div className="w-full flex flex-col gap-7">
            <div className='header-container flex justify-between items-center w-full'>
                <div className='text-xl font-semibold flex items-center'>
                    <Link href={"/teachers"}>
                        <ArrowBackRoundedIcon className='mr-2'/>
                    </Link>
                    {teacherInfo.full_name}
                </div> 
                <Button 
                    icon={<ExpandMoreOutlinedIcon />}
                    className="export-button"
                    iconPosition="end"
                >
                    Export
                </Button>
            </div>

            <div className="w-full flex justify-center gap-5">
                <Tabs className="w-full flex flex-col" defaultActiveKey="1" items={items} onChange={onChange} />
                {/* <div className="w-2/5">
                    <TeacherInfo teacherInfo={teacherInfo}/>
                </div>
                <div className="w-3/5">
                    <FoliosInfo/>
                </div> */}
            </div>

            <div className="bottom-section w-full flex justify-center">
                                
                {activeTab == '1' && <TeacherInfromation teacherInfo={teacherInfo} />}

                {activeTab == '2' && <TeacherCalendar teacherClasses={teacherClasses} />}

            </div>
        </div>
    )
}