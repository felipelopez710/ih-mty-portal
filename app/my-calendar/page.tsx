'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import TeacherSidebar from '../uiComponents/teacherSidebar';
import UtilityBar from '../uiComponents/utilityBar';
import PersonalCalendar from './calendar';
import { useAppContext } from "@/context/context";
import { createClient } from "@/utils/supabase/client";
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const localizer = dayjsLocalizer(dayjs)

export default function MyCalendar(){
    const supabase = createClient();
    const { userContext, setUserContext } = useAppContext()
    const router = useRouter()

    const [listOfClasses, setListOfClasses]:any = useState(undefined)

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
            console.log(user)

            if (userContext === undefined) {
                console.log('Entra a flujo de creación de contexto de usuario')
                // Se obtiene el rol del usuario.
                const { data : user_role } = await supabase.from('user_roles').select().eq('user_id', user.id)
                console.log('Rol de usuario: ', user_role)

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
                console.log('Contexto de usuario diferente al loggeado')
                // Se obtiene el rol del usuario.
                const { data : user_role } = await supabase.from('user_roles').select().eq('user_id', user.id)
                console.log('Rol de usuario: ', user_role)

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

    async function getClasses(){
        const { data: teacher, error: teacherError } = await supabase.from('teachers').select().eq('user_id', userContext.user_id)
        console.log('Teacher:', teacher)
        if(teacher){
            const { data: classes, error: classesError } = await supabase.from('classes_view').select().eq('teacher_id', teacher[0].teacher_id)
            console.log('Classes: ', classes)
            classes !== null && classes.length > 0 ? setListOfClasses(classes) : setListOfClasses(undefined)
        }
    }

    useEffect(() => {
      validateUser()

      if (userContext !== undefined) {
        getClasses()
      }
    }, [])

    return(
        <main className='w-full min-h-screen'>
            <TeacherSidebar/>
            <div className='page-container w-full min-h-screen pl-52 flex flex-col'>
        
                <UtilityBar/>

                <div className='w-full h-full content px-8 py-7 flex-1 flex flex-col gap-5'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>My Calendar</div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center w-full border border-slate-100 rounded-xl bg-white">
                        {
                            listOfClasses !== undefined ?
                            <PersonalCalendar listOfClasses={listOfClasses} />
                            :
                            <Calendar
                                localizer={localizer}
                                className='flex-1 w-full'
                            />
                        }
                        
                    </div>
                </div>
                
            </div>
        </main>
    )
}