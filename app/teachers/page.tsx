import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
import Link from 'next/link';
import TeachersTable from './teachers-table'
import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default async function Teachers() {
    const supabase = createClient()

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
    }

    const { data: teachers } = await supabase.from('teachers').select()

    return (
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>Teachers</div>
                        <Link href={"/teachers/register"}>
                            <button className='button flex items-center px-4 py-2 bg-ih-blue rounded-lg text-white font-medium'>
                                <AddOutlinedIcon className='mr-1.5'/>
                                New Teacher
                            </button>
                        </Link>
                    </div>

                </div>

                <div className='px-7 wfull' style={{ height: 'auto', width: '100%' }}>
                    <TeachersTable rows={teachers?.reverse()} />
                </div>
                
            </div>
        </main>
    )
}