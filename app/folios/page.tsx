import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

import FoliosTable from "./folios-table"

import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Link from 'next/link';
import dayjs from 'dayjs';

export default async function Folios() {
    const supabase = createClient()

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
    }

    const { data: folios } = await supabase.from('folios').select('*, groups(group_id, group_code), clients(client_id, client_name)')

    // console.log('Folios: ', folios)

    let formatedFolios:any = []

    folios?.map((folio:any)=>{
        formatedFolios.push({
            folio_id: folio.folio_id,
            group_code: folio.group_id !== null ? folio.groups.group_code : 'No group asigned',
            client_name: folio.client_id !== null ? folio.clients.client_name : '-',
            client_location: folio.client_location,
            start_date: dayjs(folio.start_date).format('MMMM D, YYYY'),
            end_date: dayjs(folio.end_date).format('MMMM D, YYYY'),
        })
    })

    console.log(formatedFolios)

    return (
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>Folios</div>
                        <Link href={'/folios/register'}>
                            <button className='button flex items-center px-4 py-2 bg-ih-blue rounded-lg text-white font-medium'>
                                <AddOutlinedIcon className='mr-1.5'/>
                                New Folio
                            </button>
                        </Link>
                    </div>

                    <div className='mt-7' style={{ height: 'auto', width: '100%' }}>
                        <FoliosTable rows={formatedFolios.reverse()} />
                    </div>

                </div>
                
            </div>
        </main>
    )
}