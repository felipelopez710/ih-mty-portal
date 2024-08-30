'use client'

import { useAppContext } from "@/context/context";
import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'
import Image from "next/image";

export default function Reports(){
    const { userContext } = useAppContext()

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full h-screen pl-52 flex flex-col'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7 flex items-center justify-center flex-1'>

                    <div className="w-full max-w-96 flex flex-col items-center justify-center gap-8">
                        <div className="logo-container">
                            <Image
                                src="/wip.png"
                                width={180}
                                height={180}
                                alt="logo-ih"
                            />
                        </div>
                        <div className="w-full text-center font-medium text-base">
                            This page is under construction
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </main>
    )
}