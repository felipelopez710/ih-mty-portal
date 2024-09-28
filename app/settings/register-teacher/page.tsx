import Sidebar from '@/app/uiComponents/sidebar';
import UtilityBar from '@/app/uiComponents/utilityBar';
import TeacherForm from './teacher-form';

export default function TeacherRegistration() {
    return(
        <main className='w-full'>

            <Sidebar/>

            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-5xl'>

                        <TeacherForm/>

                    </div>
                </div>

            </div>

        </main>
    )
}