'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import Loading from "@/app/uiComponents/loading"; 
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Button, Tabs, TabsProps } from "antd";
import DetailsTab from "./tabs-content/details/details";
import FoliosTab from "./tabs-content/folios/folios";
import dayjs from 'dayjs';

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Details',
    },
    {
      key: '2',
      label: 'Folios',
    },
];

export default function GroupDetail(){
    const supabase = createClient()
    const pathname = usePathname()

    const [activeGroup, setActiveGroup]:any = useState(null)
    const [foliosList, setFoliosList]:any = useState(null)
    const [activeTab, setActiveTab] = useState('1')

    const onTabChange = (key: string) => {
        setActiveTab(key)
    }

    async function getGroupDetail(group_id:any){
        // Get the group general information
        const { data: group, error: groupError } = await supabase.from('group_client_view').select().eq('group_id', group_id)
        console.log('Group information: ', group)
        group !== null && group.length > 0 ? setActiveGroup(group[0]) : setActiveGroup(undefined)

        // Get the lits of folios from this group
        const { data: foliosList, error: foliosError } = await supabase.from('folio_details_view').select().eq('group_id', group_id)
        console.log('Folios from this group: ', foliosList)
        if(foliosList){
            setFoliosList(foliosList)
        }
    }

    useEffect(() => {
        const pathPartition = pathname.split('/')
        const group_id = pathPartition.pop() || pathPartition.pop()

        getGroupDetail(group_id)
    }, [])

    return(
        <main className={`w-full ${activeTab == '2' ? 'h-screen' : 'min-h-screen'}`}>

            <Sidebar/>

            {
                activeGroup === null ?
                <div className="loading-page w-full pl-52 h-screen flex flex-col">
                    <UtilityBar/>
                    <div className="flex-1 flex items-center justify-center">
                        <Loading/>
                    </div>
                </div>
                :
                <>
                    {
                        activeGroup === undefined ?
                        <div className="p-10 pl-52 text-center">This group doesn't exists</div>
                        :
                        <div className={`page-content w-full pl-52 flex flex-col`}>

                            <div className="top-section flex flex-col">
                                <UtilityBar/>

                                <div className='header-container flex justify-between items-center w-full px-8 pt-7 pb-4'>
                                    <div className='text-xl font-semibold flex items-center'>
                                        <Link href={"/groups"}>
                                            <ArrowBackRoundedIcon className='mr-2'/>
                                        </Link>
                                        {`Group ${activeGroup.group_code}`}
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
                                    <Tabs className="h-full flex flex-col" defaultActiveKey="1" items={items} onChange={onTabChange} />
                                </div>
                            </div>

                            <div className="bottom-section px-8 h-full">
                                
                                { activeTab === '1' && <DetailsTab groupInformation={activeGroup} /> }

                                { activeTab === '2' && <FoliosTab folios={foliosList} /> }

                            </div>

                        </div>
                    }
                </>
            }


        </main>
    )
}