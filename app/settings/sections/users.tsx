'use client'

import { createClient } from '@/utils/supabase/client';
import { Button } from 'antd';
import Link from 'next/link';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useState, useEffect } from 'react';

export default function UsersSection(){
    const supabase = createClient()

    const [teacherList, setTeacherList]:any = useState(undefined)
    const [adminList, setAdminList]:any = useState(undefined)

    async function getTeachers(){
        const { data: teachers, error: teachersError } = await supabase.from('teachers').select()
        if(teachers){
            console.log(teachers)
            setTeacherList(teachers)
        }
        if (teachersError){
            console.log('Error: ', teachersError)
        }
    }

    async function getAdmins(){
        const { data: admins, error: adminsError } = await supabase.from('admin_users').select()
        if(admins){
            console.log(admins)
            setAdminList(admins)
        }
        if (adminsError){
            console.log('Error: ', adminsError)
        }
    }

    useEffect(() => {
      getTeachers()
      getAdmins()
    }, [])
    
    return(
        <div className='w-full flex flex-col gap-5 pb-5'>
            
            <div className="section-container w-full py-4 flex gap-5">
                <div className="w-1/3 sub-section-title flex flex-col gap-2">
                    <div className="font-semibold text-lg">
                        Teachers
                    </div>
                    <div className='flex gap-2 pt-4'>
                        <Link href="/settings/register-teacher">
                            <Button 
                                type="primary" 
                                className={'rounded-lg py-5 ih-button'}
                                icon={<AddOutlinedIcon/>}
                            >
                                New teacher
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="w-full flex flex-col gap-4">
                        <div className='table-header w-full flex px-6'>
                            <div className='flex-1'>Teacher</div>
                            <div className='w-1/5'>Alias</div>
                            <div className='w-2/5'>Mail</div>
                            <div className='w-12 text-center'>Action</div>
                        </div>
                        <div className='table-content w-full flex flex-col gap-2'>
                            {
                                teacherList?.map((teacher:any) => (
                                    <div key={teacher.teacher_id} className='table-content w-full flex flex-col gap-2'>
                                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                            <div className='flex-1 flex items-center gap-2'>
                                                <BadgeOutlinedIcon/>
                                                <span>{teacher.full_name}</span>
                                            </div>
                                            <div className='w-1/5'>{teacher.alias}</div>
                                            <div className='w-2/5'>{teacher.email}</div>
                                            <div className='w-12 text-center'>
                                                <MoreVertOutlinedIcon/>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='divider border border gray-300'></div>

            <div className="section-container w-full py-4 flex gap-5">
                <div className="w-1/3 sub-section-title flex flex-col gap-2">
                    <div className="font-semibold text-lg">
                        Administrative staff
                    </div>
                    <div className='flex gap-2 pt-4'>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            className={'rounded-lg py-5 ih-button'}
                            icon={<AddOutlinedIcon/>}
                        >
                            New admin
                        </Button>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="w-full flex flex-col gap-4">
                        <div className='table-header w-full flex px-6'>
                            <div className='flex-1'>User</div>
                            <div className='w-1/5'>Alias</div>
                            <div className='w-2/5'>Mail</div>
                            <div className='w-12 text-center'>Action</div>
                        </div>
                        <div className='table-content w-full flex flex-col gap-2'>
                            {
                                adminList?.map((admin:any) => (
                                    <div key={admin.id} className='table-content w-full flex flex-col gap-2'>
                                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                            <div className='flex-1 flex items-center gap-2'>
                                                <BadgeOutlinedIcon/>
                                                <span>{`${admin.name} ${admin.surname}`}</span>
                                            </div>
                                            <div className='w-1/5'>{admin.alias}</div>
                                            <div className='w-2/5'>{admin.email}</div>
                                            <div className='w-12 text-center'>
                                                <MoreVertOutlinedIcon/>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}