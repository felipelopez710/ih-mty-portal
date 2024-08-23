'use client'

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useAppContext } from "@/context/context";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function UtilityBar() {
  const supabase = createClient()
  const { userContext, setUserContext } = useAppContext()

  const logout = async () => {
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className='utlity-bar py-4 px-6 bg-white flex justify-end border-b border-light-blue'>
      <div className='user flex items-center rounded-xl bg-light-blue text-ih-blue'>
        <div className='avatar w-8 h-8 bg-ih-blue flex items-center justify-center text-white font-semibold rounded-xl'>
          <PersonOutlineOutlinedIcon/>
        </div>
        <div className='px-3'>
          { userContext!== undefined && `${userContext.user_name} - ${userContext.user_role}` }
        </div>
      </div>
      <form action={logout}>
        <button className='logout ml-2 w-8 h-8 bg-light-blue flex items-center justify-center text-ih-blue rounded-xl'>
          <LogoutOutlinedIcon/>
        </button>
      </form>
    </div>
  )

}