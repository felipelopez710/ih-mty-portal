import { createClient } from '@/utils/supabase/server';

import Sidebar from '@/app/uiComponents/sidebar';
import UtilityBar from '@/app/uiComponents/utilityBar';

import StudentsForm from './students-form';

export default async function NewStudent(){
    const supabase = createClient()

    const { data: clients } = await supabase.from('client_view').select()

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-5xl'>
                        <StudentsForm clients={clients} />
                    </div>
                </div>
                
            </div>
        </main>
    )
}