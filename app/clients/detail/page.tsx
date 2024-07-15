import Sidebar from '@/app/uiComponents/sidebar';
import UtilityBar from '@/app/uiComponents/utilityBar';
import DetailForm from './detail-form';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Link from 'next/link.js';

export default function ClientDetail(){
    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>
                    <DetailForm/>
                </div>
            </div>
        </main>
    )
}