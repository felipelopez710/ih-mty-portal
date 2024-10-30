'use client'

import { createClient } from "@/utils/supabase/client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import EditFolioForm from "./edit-folio-form"

export default function EditFolio(){
    const supabase = createClient()
    const pathname = usePathname()

    const [initialInformation, setInitialInformation]:any = useState(undefined)

    async function getFolioInformation(folioId:any){
        const { data: folio, error: folioError } = await supabase.from('folios').select('*, groups(group_id, group_code), levels(level_id, level), sublevels(sublevel_id, sublevel), materials(material_id, material_description), coordinators(coordinator_id, full_name)').eq('folio_id', folioId)

        if(folio){
            console.log('Folio information: ', folio[0])
            setInitialInformation(folio[0])
        }
        if(folioError){
            console.log('Error fecthing the folio: ', folioError)
        }
    }

    useEffect(()=>{
        const pathPartition = pathname.split('/')
        const folioId = pathPartition.pop() || pathPartition.pop()

        getFolioInformation(folioId)
    }, [])

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-5xl'>

                        <EditFolioForm initialValues={initialInformation} />

                    </div>
                </div>

            </div>
        </main>
    )
}