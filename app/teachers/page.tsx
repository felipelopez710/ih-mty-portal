import { createClient } from '@/utils/supabase/server'

import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { Client, columns } from './columns';
import { DataTable } from './data-table';

export default async function Teachers() {
    const supabase = createClient()
    const { data: clients } = await supabase.from('teachers').select()

    return (
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>Teachers</div>
                        <button className='button flex items-center px-4 py-2 bg-ih-blue rounded-lg text-white font-medium'>
                            <AddOutlinedIcon className='mr-1.5'/>
                            New Teacher
                        </button>
                    </div>

                </div>

                <div className='px-7 wfull' style={{ height: 'auto', width: '100%' }}>
                    <DataTable columns={columns} data={clients}/>
                </div>
                
            </div>
        </main>
    )
}