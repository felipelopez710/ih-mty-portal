'use client'

import { useState } from 'react';

import Sidebar from '../uiComponents/sidebar'
import UtilityBar from '../uiComponents/utilityBar'
//Import tabs sections
import LevelsSection from './sections/levels';
import MaterialsSection from './sections/materials';
import HolidaysSection from './sections/holidays';
import CoordinatorsSection from './sections/coordinators';
import UsersSection from './sections/users';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Levels',
    },
    {
      key: '2',
      label: 'Materials',
    },
    {
      key: '3',
      label: 'Holidays',
    },
    {
        key: '4',
        label: 'Coordinators',
    },
    {
        key: '5',
        label: 'Users',
    },
];

export default function Settings(){

    const [activeTab, setActiveTab] = useState('1')

    const onChange = (key: string) => {
        setActiveTab(key)
    }

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full content px-8 pt-7 pb-4'>

                    <div className='page-header flex items-center justify-between'>
                        <div className='font-semibold text-xl'>Settings</div>
                    </div>

                </div>

                <div className="px-8">
                    <Tabs className="h-full flex flex-col" defaultActiveKey="1" items={items} onChange={onChange} />
                </div>

                <div className='section-container px-8'>
                    {activeTab === '1' && <LevelsSection/>}
                    {activeTab === '2' && <MaterialsSection/>}
                    {activeTab === '3' && <HolidaysSection/>}
                    {activeTab === '4' && <CoordinatorsSection/>}
                    {activeTab === '5' && <UsersSection/>}
                </div>
                
            </div>
        </main>
    )
}