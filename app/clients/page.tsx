import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

import ClientTable from './client-table.js';

import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Link from 'next/link.js';

export default async function Clients() {
    const supabase = createClient()

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
    }
    
    const { data: clients } = await supabase.from('clients').select()

    return (
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>Clients</div>
                        <Link href="/clients/new">
                            <button className='button flex items-center px-4 py-2 bg-ih-blue rounded-lg text-white font-medium'>
                                <AddOutlinedIcon className='mr-1.5'/>
                                New Client
                            </button>
                        </Link>
                    </div>

                    <div className='mt-7' style={{ height: 'auto', width: '100%' }}>
                        <ClientTable rows={clients} />
                    </div>

                </div>
                
            </div>
        </main>
    )
}