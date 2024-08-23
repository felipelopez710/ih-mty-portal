'use client'

import { useAppContext } from "@/context/context";
import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'

export default function Home() {

    const { userContext } = useAppContext()

    return (
        <main className='w-full'>
            {userContext !== undefined && 
                <>
                <Sidebar/>
                <div className='page-container w-full min-h-screen pl-52'>
            
                    <UtilityBar/>

                    <div className='w-full content px-8 py-7'>

                        <div className='page-header flex items-center justify-between'>
                            <div className='font-semibold text-xl'>Hello, {userContext.user_name}!</div>
                        </div>

                    </div>
                    
                </div>
                </>
            }
        </main>
    )
}