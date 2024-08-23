'use client'

import React from 'react';
import Image from "next/image";
import { usePathname } from 'next/navigation'
import Link from 'next/link';

import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';


const menuItems = [
    {
        icon: CalendarMonthOutlinedIcon,
        label: 'My Calendar',
        slug: '/my-calendar'
    },
    {
        icon: ClassOutlinedIcon,
        label: 'My classes',
        slug: '/my-classes'
    },
]

export default function TeacherSidebar() {

    const pathname = usePathname()

    return(
        <div className='sidebar fixed top-0 left-0 bottom-0 bg-ih-blue h-screen w-52 flex flex-col py-4 px-2'>
            <div className='w-full px-1.5'>
            <Image
                src="/ih-logo-light.png"
                width={116}
                height={36}
                alt="IH Monterrey"
            />
            </div>
            <div className='mt-6 flex flex-col'>
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                    <Link href={item.slug} key={index}>
                      <div className={`px-2 py-2 rounded-lg flex items-center text-light-white ${pathname.includes(item.slug) ? 'text-white bg-ih-overlay-blue drop-shadow font-semibold' : ''}`}>
                        <Icon sx={{ fontSize: 20 }} />
                        <div className='pl-2'> {item.label} </div>
                      </div>
                    </Link>
                )
              })}
            </div>
        </div>
    )

}