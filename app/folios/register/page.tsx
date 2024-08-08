import { createClient } from '@/utils/supabase/server';

import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import RegistrationForm from "./folio-form"

export default async function RegisterFolio(){
    const supabase = createClient()

    const { data: groups } = await supabase.from('group_options_view').select()

    const { data: levels } = await supabase.from('levels').select()

    const { data: coordinators } = await supabase.from('coordinators').select()

    return(
        <main className='w-full'>

            <Sidebar/>

            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-5xl'>

                        <RegistrationForm groups={groups} levels={levels} coordinators={coordinators} />

                    </div>
                </div>

            </div>

        </main>
    )
}