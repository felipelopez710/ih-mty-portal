'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import Loading from "@/app/uiComponents/loading";
import DetailView from "./tabs-content/detail-view/detail-view";
import CalendarView from "./tabs-content/calendar/calendar";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Button, Tabs, TabsProps } from "antd";

const testFolios = [
    {
        group_code: "1",
        client: "Vitro Corporativo",
        client_location: "Monterrey, N.L.",
        modality: "In person",
        level: "300 PRE-INTERMEDIATE",
        material: "MATERIAL 1",
        coordinator: "Alejandro Gorosabel",
        contracted_hours: "50",
        amount_to_invoice: "10,000",
        price_type: "Group",
        general_comments: "Lorem",
        academic_comments: "Ipsum",
        material_covered: "Amet",
        calendar_confirmed: false,
        frecuency_lines: [
            {
                frecuency: ["Monday", "Wednesday"],
                start_date: "2024-08-05",
                start_time: "12:00:00",
                end_time: "14:00:00",
                teacher_id: "1",
            },
            {
                frecuency: ["Friday"],
                start_date: "2024-08-05",
                start_time: "12:00:00",
                end_time: "14:00:00",
                teacher_id: "2",
            }
        ]
    }
]

export default function FolioDetail(){

    const [activeTab, setActiveTab] = useState('1')

    const onChange = (key: string) => {
        console.log(key);
        setActiveTab(key)
    };

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Details',
        },
        {
          key: '2',
          label: 'Calendar',
        },
        {
          key: '3',
          label: 'Attendance',
        },
        {
            key: '4',
            label: 'Grades',
        },
        {
            key: '5',
            label: 'Payroll',
        },
        {
            key: '6',
            label: 'Invoices',
        },
    ];

    return(
        <main className={`w-full ${activeTab == '2' ? 'h-screen' : 'min-h-screen'}`}>

            <Sidebar/>

            <div className={`page-content w-full pl-52 flex flex-col ${activeTab == '2' ? 'h-full' : ''}`}>

                <div className="top-section flex flex-col">
                    <UtilityBar/>

                    <div className='header-container flex justify-between items-center w-full px-8 pt-7 pb-4'>
                        <div className='text-xl font-semibold flex items-center'>
                            <Link href={"/folios"}>
                                <ArrowBackRoundedIcon className='mr-2'/>
                            </Link>
                            Folio 00001
                        </div> 
                        <Button 
                            type="primary" 
                            icon={<ExpandMoreOutlinedIcon />}
                            className="export-button"
                            iconPosition="end"
                        >
                            Export
                        </Button>
                    </div>

                    <div className="px-8">
                        <Tabs className="h-full flex flex-col" defaultActiveKey="1" items={items} onChange={onChange} />
                    </div>
                </div>

                <div className="bottom-section px-8 h-full">
                    
                    {activeTab == '1' ? <DetailView/> : ''}

                    {activeTab == '2' ? <CalendarView/> : ''}

                </div>

            </div>


            {/* <Sidebar/>
            <div className={`page-container w-full pl-52 ${activeTab == '2' ? 'h-screen' : 'min-h-screen'}`}>
                {
                    testFolios !== undefined ?
                    <div className="flex flex-col w-full h-full">
                        <UtilityBar/>

                        <div className='w-full content px-8 py-7 flex flex-col gap-2 items-center'>
                            <div className="top-section flex flex-col gap-2 w-full">
                                <div className='header-container flex justify-between items-center w-full'>
                                    <div className='text-xl font-semibold flex items-center'>
                                        <Link href={"/folios"}>
                                            <ArrowBackRoundedIcon className='mr-2'/>
                                        </Link>
                                        Folio 00001
                                    </div> 
                                    <Button 
                                        type="primary" 
                                        icon={<ExpandMoreOutlinedIcon />}
                                        className="export-button"
                                        iconPosition="end"
                                    >
                                        Export
                                    </Button>
                                </div>
                            </div>
                                <Tabs className="w-full h-full flex flex-col" defaultActiveKey="1" items={items} onChange={onChange} />
                        </div>
                    </div>
                    :
                    <Loading/>
                }

            </div> */}
        </main>
    )
}