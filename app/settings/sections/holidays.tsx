'use client'

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Drawer } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import NewHolidayForm from './components/new-holiday-modal';

export default function HolidaysSection(){
    const supabase = createClient()
    const [holidaysList, setHolidaysList]:any = useState(undefined)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [createdHoliday, setCreatedHoliday]:any = useState(undefined)
    const [defaulType, setDefaulType] = useState(undefined)

    const openDrawer = (holidayType:any) => () => {
        setDrawerOpen(true);
        setDefaulType(holidayType)
    };

    const onClose = () => {
        setDrawerOpen(false)
        setDefaulType(undefined)
    }

    async function getHolidays(){
        const { data: holidays, error: holidaysError } = await supabase.from('holidays').select()
        if(holidays){
            setHolidaysList(holidays)
        }
        if(holidaysError){
            console.log('Error:', holidaysError)
        }
    }

    useEffect(() => {
        getHolidays()
    }, [createdHoliday])
    

    return(
        <div className='w-full flex flex-col gap-5 pb-5'>
            <div className="section-container w-full py-4 flex gap-5">
                <div className="w-1/3 sub-section-title flex flex-col gap-2">
                    <div className="font-semibold text-lg">
                        Fixed holidays
                    </div>
                    <div>
                        Set the holidays that will recur year after year
                    </div>
                    <div className='flex gap-2 pt-4'>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            className={'rounded-lg py-5 ih-button'}
                            icon={<AddOutlinedIcon/>}
                            onClick={openDrawer('fixed')}
                        >
                            New holiday
                        </Button>
                        <Button 
                            htmlType="submit"
                            className={'rounded-lg py-5'}
                            icon={<FileUploadOutlinedIcon/>}
                        >
                            Import CSV
                        </Button>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="w-full flex flex-col gap-4">
                        <div className='table-header w-full flex px-6'>
                            <div className='w-1/4'>Day of year</div>
                            <div className='flex-1'>Description</div>
                            <div className='w-12 text-center'>Action</div>
                        </div>
                        <div className='table-content w-full flex flex-col gap-2'>
                            {
                                holidaysList?.map((holiday:any)=>{
                                    if(holiday.type === 'fixed'){
                                        return(
                                            <div key={holiday.holiday_id} className='w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                                <div className='w-1/4'>{dayjs(holiday.date).format('MMMM D')}</div>
                                                <div className='flex-1'>{holiday.description}</div>
                                                <div className='w-12 text-center'>
                                                    <MoreVertOutlinedIcon/>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='divider border border gray-300'></div>

            <div className="section-container w-full py-4 flex gap-5">
                <div className="w-1/3 sub-section-title flex flex-col gap-2">
                    <div className="font-semibold text-lg">
                        Variable holidays
                    </div>
                    <div>
                        Set up holidays that will not repeat year after year. Make sure to set them ahead of time to avoid conflicts in class scheduling.
                    </div>
                    <div className='flex gap-2 pt-4'>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            className={'rounded-lg py-5 ih-button'}
                            icon={<AddOutlinedIcon/>}
                            onClick={openDrawer('variable')}
                        >
                            New holiday
                        </Button>
                        <Button 
                            htmlType="submit"
                            className={'rounded-lg py-5'}
                            icon={<FileUploadOutlinedIcon/>}
                        >
                            Import CSV
                        </Button>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="w-full flex flex-col gap-4">
                        <div className='table-header w-full flex px-6'>
                            <div className='w-1/4'>Date</div>
                            <div className='flex-1'>Description</div>
                            <div className='w-12 text-center'>Action</div>
                        </div>
                        <div className='table-content w-full flex flex-col gap-2'>
                            {
                                holidaysList?.map((holiday:any)=>{
                                    if(holiday.type === 'variable'){
                                        return(
                                            <div key={holiday.holiday_id} className='w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                                <div className='w-1/4'>{dayjs(holiday.date).format('MMMM D, YYYY')}</div>
                                                <div className='flex-1'>{holiday.description}</div>
                                                <div className='w-12 text-center'>
                                                    <MoreVertOutlinedIcon/>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                title={'New holiday'}
                width={500}
                open={drawerOpen}
                onClose={onClose}
            >
                <NewHolidayForm setDrawerOpen={setDrawerOpen} setCreatedHoliday={setCreatedHoliday} defaulType={defaulType} />
            </Drawer>
        </div>
    )
}