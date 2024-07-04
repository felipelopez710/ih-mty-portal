'use client'

import React from 'react';
import Image from "next/image";
import { usePathname } from 'next/navigation'
import Link from 'next/link';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import GroupWorkOutlinedIcon from '@mui/icons-material/GroupWorkOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const menuItems = [
  {
    icon: HomeOutlinedIcon,
    label: 'Home',
    slug: '/home'
  },
  {
    icon: ClassOutlinedIcon,
    label: 'Folios',
    slug: '/folios'
  },
  {
    icon: GroupWorkOutlinedIcon,
    label: 'Groups',
    slug: '/groups'
  },
  {
    icon: GroupsOutlinedIcon,
    label: 'Clients',
    slug: '/clients'
  },
  {
    icon: BadgeOutlinedIcon,
    label: 'Teachers',
    slug: '/teachers'
  },
  {
    icon: SchoolOutlinedIcon,
    label: 'Students',
    slug: '/students'
  },
  {
    icon: AssessmentOutlinedIcon,
    label: 'Reports',
    slug: '/reports'
  },
  {
    icon: SettingsOutlinedIcon,
    label: 'Settings',
    slug: '/settings'
  },
]

export default function Sidebar() {

    const pathname = usePathname()

    return(
        <div className='sidebar fixed top-0 left-0 bottom-0 bg-white h-screen w-52 flex flex-col py-4 px-2'>
            <div className='w-full px-1.5'>
            <Image
                src="/logo-ih.png"
                width={116}
                height={36}
                alt="IH Monterrey"
            />
            </div>
            <div className='mt-6 flex flex-col'>
            {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                    <Link href={item.slug}>
                      <div className={`px-2 py-1.5 rounded-lg flex items-center ${pathname.includes(item.slug) ? 'bg-slate-100 font-semibold' : ''}`}>
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