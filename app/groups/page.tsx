import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

import Link from 'next/link';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import Sidebar from "../uiComponents/sidebar"
import UtilityBar from "../uiComponents/utilityBar"
import GroupsTable from './groups-tabe';

const groups = [
    {
        groupID: "IH0001",
        client: "Vitro Corporativo",
        members: 10,
        folios: 2,
        created: "April 1, 2024",
        status: "Active"
    },
    {
        groupID: "IH0002",
        client: "IENU - Instituto de Educación Naciones Unidas",
        members: 12,
        folios: 2,
        created: "March 1, 2024",
        status: "Active"
    },
    {
        groupID: "IH0003",
        client: "Vitro FAMA",
        members: 10,
        folios: 2,
        created: "February 1, 2024",
        status: "Active"
    },
    {
        groupID: "IH0004",
        client: "Everest Academy",
        members: 20,
        folios: 2,
        created: "January 1, 2024",
        status: "Active"
    }
]

export default async function Groups() {
    const supabase = createClient()

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
    }

    const { data: groups } = await supabase.from('groups').select('*, clients(client_id, client_name)')

    // console.log(groups)

    let formatedGroupList:any = []

    groups?.map((group:any)=>{
        formatedGroupList.push({
            group_id: group.group_id,
            created_at: group.created_at,
            status: group.status,
            group_code: group.group_code,
            members: group.members,
            folios_couunt: group.folios_count,
            client_id: group.client_id,
            client_name: group.client_id !== null ? group.clients.client_name : ''
        })
    })

    console.log(formatedGroupList)

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>Groups</div>
                        <Link href="/groups/register">
                            <button className='button flex items-center px-4 py-2 bg-ih-blue rounded-lg text-white font-medium'>
                                <AddOutlinedIcon className='mr-1.5'/>
                                Create Group
                            </button>
                        </Link>
                    </div>

                    <GroupsTable groups={formatedGroupList?.reverse()} />

                </div>
                
            </div>
        </main>
    )
}