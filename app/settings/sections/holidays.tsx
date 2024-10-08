'use client'

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Drawer } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import NewHolidayForm from './components/new-holiday-modal';
import EditHolidayForm from './components/edit-holiday-modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

export default function HolidaysSection(){
    const supabase = createClient()
    const [holidaysList, setHolidaysList]:any = useState(undefined) // Stores the holidays list to show in the table
    const [drawerOpen, setDrawerOpen] = useState(false) // Controls the 'New holiday' modal (true = open)
    const [editDrawer, setEditDrawer] = useState(false) // Controls the 'Edit holiday' modal (true = open)
    const [createdHoliday, setCreatedHoliday]:any = useState(undefined) // State to store the latest API call (insert or update). This triggers the useEffect to update the holidays list
    const [defaulType, setDefaulType] = useState(undefined) // Delete later
    const [defaultValues, setDefaultValues] = useState(undefined) // Stores the initial values of the 'Edit holiday' form

    // Opens the 'New holiday' modal
    const openDrawer = (holidayType:any) => () => {
        setDrawerOpen(true);
    };

    // Closes the 'New holiday' modal
    const onClose = () => {
        setDrawerOpen(false)
        setDefaulType(undefined)
    }

    // Opens the 'Edit holiday' modal
    const openEditDrawer = (holiday:any) => () => {
        setDefaultValues(holiday)
        setEditDrawer(true);
    };

    // Closes the 'Edit holiday' modal
    const onEditDrawerClose = () => {
        setEditDrawer(false)
        setDefaultValues(undefined)
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
                        Holidays list
                    </div>
                    <div>
                        Set up holidays that will not be available to schedule classes. Make sure to set them ahead of time to avoid conflicts in class scheduling.
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
                                holidaysList?.map((holiday:any)=>(
                                    <div key={holiday.holiday_id} className='w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                        <div className='w-1/4'>{dayjs(holiday.date).format('MMMM D, YYYY')}</div>
                                        <div className='flex-1'>{holiday.description}</div>
                                        <div className='flex items-center gap-2 w-14 justify-end'>
                                            <div onClick={openEditDrawer(holiday)} className='cursor-pointer'>
                                                <EditOutlinedIcon/>
                                            </div>
                                            <RemoveCircleOutlineOutlinedIcon/>
                                        </div>
                                    </div>
                                ))
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
            <Drawer
                title={'Edit holiday'}
                width={500}
                open={editDrawer}
                onClose={onEditDrawerClose}
            >
                <EditHolidayForm setEditDrawer={setEditDrawer} setCreatedHoliday={setCreatedHoliday} defaultValues={defaultValues} />
            </Drawer>

        </div>
    )
}