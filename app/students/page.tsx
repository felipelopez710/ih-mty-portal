import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

import StudentsTable from "./students-table"

import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default async function Students() {
    const supabase = createClient()

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
    }
    
    const { data: students } = await supabase.from('students_view').select()

    return (
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>Students</div>
                        <button className='button flex items-center px-4 py-2 bg-ih-blue rounded-lg text-white font-medium'>
                            <AddOutlinedIcon className='mr-1.5'/>
                            New Student
                        </button>
                    </div>

                    <div className='mt-7' style={{ height: 'auto', width: '100%' }}>
                        <StudentsTable rows={students} />
                    </div>

                </div>
                
            </div>
        </main>
    )
}