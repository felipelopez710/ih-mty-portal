import { createClient } from '@/utils/supabase/server';

import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import RegistrationForm from "./folio-form"

export default async function RegisterFolio(){
    const supabase = createClient()

    const { data: groups } = await supabase.from('groups').select('*, clients(client_id, client_name, address, neighborhood, city, state)')

    const { data: levels } = await supabase.from('levels').select()

    const { data: coordinators } = await supabase.from('coordinators').select()

    const { data: teachers } = await supabase.from('teachers').select()

    const { data: holidays } = await supabase.from('holidays').select()

    return(
        <main className='w-full'>

            <Sidebar/>

            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-5xl'>

                        <RegistrationForm groups={groups} levels={levels} coordinators={coordinators} teachers={teachers} holidays={holidays} />

                    </div>
                </div>

            </div>

        </main>
    )
}