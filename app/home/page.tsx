'use client'

import { useAppContext } from "@/context/context";
import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'
import GroupWorkOutlinedIcon from '@mui/icons-material/GroupWorkOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { amber, red, lime, pink } from '@mui/material/colors';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#27348B',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

const foliosProgress = [
    {
        id: 1,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 90,
    },
    {
        id: 2,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 75,
    }
    ,
    {
        id: 3,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 30,
    }
    ,
    {
        id: 4,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 55,
    }
    ,
    {
        id: 5,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 40,
    },
    {
        id: 6,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 20,
    }
    ,
    {
        id: 7,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 20,
    },
    {
        id: 8,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 15,
    },
    {
        id: 9,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 20,
    },
    {
        id: 10,
        folio: 'Folio 1234',
        level: '102 PRE-ELEMENTARY',
        progress: 5,
    }
]

const todaysClasses = [
    {
        id: 1,
        title: 'F. 16922 - 102 PRE-ELEMENTARY',
        teacher: 'Tom Morrisey',
        date: 'March 18 | 11:00 am - 1:00 pm'
    },
    {
        id: 2,
        title: 'F. 16922 - 102 PRE-ELEMENTARY',
        teacher: 'Tom Morrisey',
        date: 'March 18 | 11:00 am - 1:00 pm'
    },
    {
        id: 3,
        title: 'F. 16922 - 102 PRE-ELEMENTARY',
        teacher: 'Tom Morrisey',
        date: 'March 18 | 11:00 am - 1:00 pm'
    },
    {
        id: 4,
        title: 'F. 16922 - 102 PRE-ELEMENTARY',
        teacher: 'Tom Morrisey',
        date: 'March 18 | 11:00 am - 1:00 pm'
    },
    {
        id: 5,
        title: 'F. 16922 - 102 PRE-ELEMENTARY',
        teacher: 'Tom Morrisey',
        date: 'March 18 | 11:00 am - 1:00 pm'
    },
    {
        id: 6,
        title: 'F. 16922 - 102 PRE-ELEMENTARY',
        teacher: 'Tom Morrisey',
        date: 'March 18 | 11:00 am - 1:00 pm'
    },
]

export default function Home() {

    const { userContext } = useAppContext()

    return (
        <main className='w-full'>
            {userContext !== undefined && 
                <>
                <Sidebar/>
                <div className='page-container w-full h-screen pl-52 flex flex-col'>
            
                    <UtilityBar/>

                    <div className='w-full content px-8 py-7 flex justify-center flex-1'>

                        <div className="w-full max-w-5xl flex flex-col gap-5">

                            <div className='page-header flex flex-col justify-center justify-between gap-5'>
                                <div className='font-semibold text-xl'>Hello, {userContext.user_name}!</div>

                                <div className="indicators w-full flex items-center gap-5">
                                    <div className="indicator-card flex-1 flex flex-col gap-3 p-4 bg-white rounded-lg drop-shadow-card">
                                        <div className="icon-card w-10 h-10 rounded-lg flex items-center justify-center bg-amber-100">
                                            <GroupWorkOutlinedIcon sx={{ color: amber[600] }}/>
                                        </div>
                                        <div className="indiator-information flex flex-col">
                                            <span className="text-xl font-semibold">99</span>
                                            <span className="text-gray-500">Active Folios</span>
                                        </div>
                                    </div>

                                    <div className="indicator-card flex-1 flex flex-col gap-3 p-4 bg-white rounded-lg drop-shadow-card">
                                        <div className="icon-card w-10 h-10 rounded-lg flex items-center justify-center bg-red-100">
                                            <GroupsOutlinedIcon sx={{ color: red[600] }}/>
                                        </div>
                                        <div className="indiator-information flex flex-col">
                                            <span className="text-xl font-semibold">99</span>
                                            <span className="text-gray-500">Active Clients</span>
                                        </div>
                                    </div>

                                    <div className="indicator-card flex-1 flex flex-col gap-3 p-4 bg-white rounded-lg drop-shadow-card">
                                        <div className="icon-card w-10 h-10 rounded-lg flex items-center justify-center bg-lime-100">
                                            <BadgeOutlinedIcon sx={{ color: lime[600] }}/>
                                        </div>
                                        <div className="indiator-information flex flex-col">
                                            <span className="text-xl font-semibold">99</span>
                                            <span className="text-gray-500">Active Teachers</span>
                                        </div>
                                    </div>

                                    <div className="indicator-card flex-1 flex flex-col gap-3 p-4 bg-white rounded-lg drop-shadow-card">
                                        <div className="icon-card w-10 h-10 rounded-lg flex items-center justify-center bg-fuchsia-100">
                                            <SchoolOutlinedIcon sx={{ color: pink[600] }}/>
                                        </div>
                                        <div className="indiator-information flex flex-col">
                                            <span className="text-xl font-semibold">99</span>
                                            <span className="text-gray-500">Active Students</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bottom-section w-full flex-1 flex gap-5">
                                <div className="flex-1 h-full bg-white rounded-lg drop-shadow-card">
                                    <div className="list-header p-4 flex justify-between border-b border-gray-300">
                                        <span className="font-semibold">Folio progress</span>
                                        <span className="text-ih-blue underline">See all</span>
                                    </div>
                                    <ScrollArea className="w-full h-full h-home-bottom-card">
                                        {
                                            foliosProgress.map((folio) => {
                                                return(
                                                    <div key={folio.id} className="folio-card w-full flex items-center gap-5 px-5 py-4 border-b border-gray-200">
                                                        <div className="flex-1 flex flex-col">
                                                            <span className="font-semibold">{folio.folio}</span>
                                                            <span className="text-xs text-gray-400">{folio.level}</span>
                                                        </div>
                                                        <div className="flex-1 flex items-center gap-2">
                                                            <div className="progress-bar flex-1">
                                                                <BorderLinearProgress variant="determinate" value={folio.progress} />
                                                            </div>
                                                            <div className="progress-number text-xs text-gray-400">{folio.progress}%</div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </ScrollArea>
                                </div>

                                <div className="flex-1 h-full bg-white rounded-lg drop-shadow-card">
                                    <div className="list-header p-4 flex border-b border-gray-300">
                                        <span className="font-semibold">Today's classes</span>
                                    </div>
                                    <ScrollArea className="w-full h-full h-home-bottom-card">
                                        <div className="classes-container p-4 flex flex-col gap-3">

                                            {
                                                todaysClasses.map((clase) => {
                                                    return(
                                                        <div key={clase.id} className="class-card-container border border-gray-300 rounded-md">
                                                            <div className="class-card p-4 flex flex-col gap-1 rounded-md bg-white border-l-8 border-ih-blue">
                                                                <div className="font-semibold">F. 16922 - 102 PRE-ELEMENTARY</div>
                                                                <div className="flex flex-col">
                                                                    <div className="text-sm text-gray-500">Tom Morrissey</div>
                                                                    <div className="text-sm text-gray-500">March 18 | 11:00 am - 1:00 pm</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>

                        </div>

                    </div>
                    
                </div>
                </>
            }
        </main>
    )
}