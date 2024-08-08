import { createClient } from '@/utils/supabase/server';

import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import GroupForm from "./group-form"

export default async function RegisterGroup(){
    const supabase = createClient()

    const { data: clients } = await supabase.from('client_view').select()

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7 flex justify-center'>
                    
                    
                    <div className='w-full max-w-2xl'>

                        <GroupForm clients={clients} />

                    </div>

                </div>
                
            </div>
        </main>
    )
}