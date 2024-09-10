'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import TeacherSidebar from '@/app/uiComponents/teacherSidebar';
import UtilityBar from '@/app/uiComponents/utilityBar';
import { useAppContext } from "@/context/context";
import { createClient } from "@/utils/supabase/client";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button, Tabs, TabsProps } from "antd";
import CourseCalendar from './tabs-content/course-calendar';
import dayjs from 'dayjs'

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Course calendar',
    },
    {
      key: '2',
      label: 'Attendance',
    },
    {
      key: '3',
      label: 'Evaluations',
    },
    {
        key: '4',
        label: 'Feedback',
    }
];

export default function CourseDetail(){
    const supabase = createClient();
    const { userContext, setUserContext } = useAppContext()
    const router = useRouter()
    const pathname = usePathname()
    const [courseClasses, setCourseClasses] : any = useState(undefined)
    const [activeFolioId, setActiveFolioId] : any = useState(undefined)

    // Checks if there is a user logged in. 
    // If not, takes the user back to the login page
    // If yes, checks if the app context already has the user information.
    // If not, the user information is passed to the app context
    async function validateUser(){
        const {
            data: { user },
        } = await supabase.auth.getUser();
        
        if (!user) {
            // No hay usuario loggeado
            return router.push("/login");
        } else {
            // Existe un usuario loggeado. Se muestra
            //console.log(user)

            if (userContext === undefined) {
                //console.log('Entra a flujo de creación de contexto de usuario')
                // Se obtiene el rol del usuario.
                const { data : user_role } = await supabase.from('user_roles').select().eq('user_id', user.id)
                //console.log('Rol de usuario: ', user_role)

                if(user_role){
                    setUserContext({
                        user_id: user.id,
                        user_role: user_role[0].role,
                        user_name: user_role[0].user_name
                    })

                    // Verifica que el usuario tenga el rol de maestro. Si no, lo devuelve al panel de aministración
                    if(user_role[0].role !== 'teacher'){
                        router.push('home')
                    }
                }
            } else if (userContext.user_id !== user.id) {
                //console.log('Contexto de usuario diferente al loggeado')
                // Se obtiene el rol del usuario.
                const { data : user_role } = await supabase.from('user_roles').select().eq('user_id', user.id)
                //console.log('Rol de usuario: ', user_role)

                if(user_role){
                    setUserContext({
                        user_id: user.id,
                        user_role: user_role[0].role,
                        user_name: user_role[0].user_name
                    })

                    // Verifica que el usuario tenga el rol de maestro. Si no, lo devuelve al panel de aministración
                    if(user_role[0].role !== 'teacher'){
                        router.push('/home')
                    }
                }
            } else if(userContext.user_role !== 'teacher'){
                router.push('home')
            }
        }
    }

    async function getClasses(folioId:any){        
        const { data: classes, error: classesError } = await supabase
        .from('classes')
        .select()
        .eq('folio_id', folioId)

        setCourseClasses(classes)
    }

    useEffect(() => {
        validateUser()

        const pathPartition = pathname.split('/')
        const folioId = pathPartition.pop() || pathPartition.pop()
        setActiveFolioId(folioId)

        if (userContext !== undefined){

            getClasses(folioId)
        }

    }, [userContext])

    const [activeTab, setActiveTab] = useState('1')
        const onTabChange = (key: string) => {
        setActiveTab(key)
    };

    return(
        <main className='w-full'>
            <TeacherSidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between mb-5'>
                        <div className='text-xl font-semibold flex items-center'>
                            <Link href={"/my-classes"}>
                                <ArrowBackRoundedIcon className='mr-2'/>
                            </Link>
                            {`Folio ${activeFolioId}`}
                        </div> 
                    </div>

                    <div>
                        <Tabs className="h-full flex flex-col" defaultActiveKey="1" items={items} onChange={onTabChange} />
                    </div>

                    <div className='tab-content pt-5'>

                        {(activeTab == '1' && courseClasses !== undefined) && <CourseCalendar courseClasses={courseClasses} /> }

                        {activeTab == '2' && <div>Course Attendance</div> }

                        {activeTab == '3' && <div>Course Evaluations</div> }
                        
                        {activeTab == '4' && <div>Course Feedback</div> }

                    </div>

                </div>
                
            </div>
        </main>
    )
}