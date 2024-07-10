import Sidebar from "@/app/uiComponents/sidebar"
import UtilityBar from "@/app/uiComponents/utilityBar"
import NewGroupForm from './new-group-form';

export default function NewGroup(){

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7 flex justify-center'>
                    
                    
                    <div className='w-full max-w-2xl'>

                        <NewGroupForm/>

                    </div>

                </div>
                
            </div>
        </main>
    )
}