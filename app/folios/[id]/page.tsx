'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import { jsClient } from '@/utils/supabase/form-server';
import Link from "next/link";
import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import Loading from "@/app/uiComponents/loading";
import DetailView from "./tabs-content/detail-view/detail-view";
import CalendarTab from "./tabs-content/calendar/calendar";
import Attendance from "./tabs-content/attendance/attendance";
import Grades from "./tabs-content/grades/grades";
import Payroll from "./tabs-content/payroll/payroll";
import Invoices from "./tabs-content/invoices/invoices";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Button, Tabs, TabsProps } from "antd";

export default function FolioDetail(){
    const supabase = jsClient
    const pathname = usePathname()

    const [activeFolio, setActiveFolio] : any = useState(null)
    const [groupInformation, setGroupInformation] : any = useState(undefined)
    const [folioFrequency, setFolioFrequency] : any = useState(undefined)
    const [listOfClasses, setListOfClasses] : any = useState(undefined)

    async function getFolioDetail(folioId : any) {

        // Get the folio general information
        const { data: folio, error: folioError } = await supabase.from('folio_information_view').select().eq('folio_id', folioId)
        //console.log('Folios:', folio)
        folio !== null && folio.length > 0 ? setActiveFolio(folio[0]) : setActiveFolio(undefined)
        
        // Get the frequency lines from this folio
        const { data: frequencyLines, error: frequencyError } = await supabase.from('frequency_lines_view').select().eq('folio_id', folioId)
        //console.log('Frequency lines: ', frequencyLines)
        frequencyLines !== null && frequencyLines.length > 0 ? setFolioFrequency(frequencyLines) : setFolioFrequency(undefined)

        // Gets the list of classes form this folio
        const { data: classes, error: classesError } = await supabase.from('classes_view').select().eq('folio_id', folioId)
        console.log('Classes: ', classes)
        classes !== null && classes.length > 0 ? setListOfClasses(classes) : setListOfClasses(undefined)

    }

    useEffect(() => {
        const pathPartition = pathname.split('/')
        const folioId = pathPartition.pop() || pathPartition.pop()

        getFolioDetail(folioId)
    }, [])
    

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

            {
                activeFolio === null ?
                <div className="loading-page w-full pl-52 h-screen flex flex-col">
                    <UtilityBar/>
                    <div className="flex-1 flex items-center justify-center">
                        <Loading/>
                    </div>
                </div>
                :
                <>
                    {
                        activeFolio === undefined ?
                        <div className="p-10 pl-52 text-center">This folio doesn't exists</div>
                        :
                        <div className={`page-content w-full pl-52 flex flex-col ${activeTab == '2' ? 'h-full' : ''}`}>

                            <div className="top-section flex flex-col">
                                <UtilityBar/>

                                <div className='header-container flex justify-between items-center w-full px-8 pt-7 pb-4'>
                                    <div className='text-xl font-semibold flex items-center'>
                                        <Link href={"/folios"}>
                                            <ArrowBackRoundedIcon className='mr-2'/>
                                        </Link>
                                        {`Folio ${activeFolio.folio_id}`}
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
                                
                                {activeTab == '1' ? <DetailView folioInformation={activeFolio} folioFrequency={folioFrequency} /> : ''}

                                {activeTab == '2' && listOfClasses!== undefined ? <CalendarTab folioFrequency={folioFrequency}  listOfClasses={listOfClasses} /> : ''}

                                {activeTab == '3' ? <Attendance/> : ''}
                                
                                {activeTab == '4' ? <Grades/> : ''}

                                {activeTab == '5' ? <Payroll/> : ''}

                                {activeTab == '6' ? <Invoices/> : ''}

                            </div>

                        </div>
                    }
                </>
            }


        </main>
    )
}