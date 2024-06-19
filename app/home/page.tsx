import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'

export default async function Home() {

    return (
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>Home</div>
                    </div>

                </div>
                
            </div>
        </main>
    )
}