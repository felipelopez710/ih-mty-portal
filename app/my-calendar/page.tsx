'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useEffect } from 'react';
import TeacherSidebar from '../uiComponents/teacherSidebar';
import UtilityBar from '../uiComponents/utilityBar';
import { useAppContext } from "@/context/context";
import { createClient } from "@/utils/supabase/client";

export default function MyCalendar(){
    const supabase = createClient();
    const { userContext, setUserContext } = useAppContext()
    const router = useRouter()

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

    useEffect(() => {
      validateUser()
    }, [])

    return(
        <main className='w-full'>
            <TeacherSidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 py-7'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>My Calendar</div>
                    </div>

                </div>
                
            </div>
        </main>
    )
}