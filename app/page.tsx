'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useAppContext } from "@/context/context";
import { createClient } from "@/utils/supabase/client";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Home() {
  const supabase = createClient();
  const { userContext, setUserContext } = useAppContext()
  const router = useRouter()

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

          // Verifica qué rol tiene el usuario y lo envía a su ruta
          switch(user_role[0].role){
            case 'teacher':
              router.push('/my-classes')
              break
            case 'admin':
              router.push('/home')
              break
            default:
              router.push('not-found')
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

          // Verifica qué rol tiene el usuario y lo envía a su ruta
          switch(user_role[0].role){
            case 'teacher':
              router.push('/my-classes')
              break
            case 'admin':
              router.push('/home')
              break
            default:
              router.push('not-found')
          }
        }
      } else {
        // Verifica qué rol tiene el usuario y lo envía a su ruta
        switch(userContext.user_role[0].role){
          case 'teacher':
            router.push('/my-classes')
            break
          case 'admin':
            router.push('/home')
            break
          default:
            router.push('not-found')
        }
      }
    }
  }

  useEffect(() => {
    validateUser()
  }, [])

  return (
      <main className='w-full h-screen flex items-center justify-center'>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </main>
    )
}