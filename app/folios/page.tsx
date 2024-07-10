import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

import FoliosTable from "./folios-table"

import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Link from 'next/link';

export default async function Folios() {
    const supabase = createClient()

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
    }

    const { data: folios } = await supabase.from('folio_details_view').select()

    return (
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>Folios</div>
                        <Link href={'/folios/new'}>
                            <button className='button flex items-center px-4 py-2 bg-ih-blue rounded-lg text-white font-medium'>
                                <AddOutlinedIcon className='mr-1.5'/>
                                New Folio
                            </button>
                        </Link>
                    </div>

                    <div className='mt-7' style={{ height: 'auto', width: '100%' }}>
                        <FoliosTable rows={folios} />
                    </div>

                </div>
                
            </div>
        </main>
    )
}