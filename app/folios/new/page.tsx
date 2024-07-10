import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import FoliosForm from "./folios-form"

export default function NewFolio(){
    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-5xl'>
                        <FoliosForm/>
                    </div>
                </div>
                
            </div>
        </main>
    )
}