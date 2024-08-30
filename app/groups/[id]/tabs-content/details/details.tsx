'use client'

import { createClient } from "@/utils/supabase/client"

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Form, Button, Input, Select, DatePicker, Spin } from "antd";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useState } from 'react';

type FieldType = {
    group_code?: string;
    client_id?: string;
    selected_students?: any;
    group_id?: any;
}

const studentOptions = [
    {
        label: "Student 1",
        value: "Student 1",
    },
    {
        label: "Student 2",
        value: "Student 2",
    },
    {
        label: "Student 3",
        value: "Student 3",
    },
]

export default function DetailsTab({groupInformation}:any){
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function onFinish(e:FieldType){
        console.log('Submitted: ', e)
    }
    return(
        <div className="details-container w-full flex items-center justify-center py-5">
            <div className="w-full max-w-2xl">
                <Form 
                    className="w-full"
                    layout='vertical'
                    size='large'
                    onFinish={onFinish}
                >
                    {/* Form header and submit button */}
                    <div className='header-container flex justify-between items-center mb-6 w-full'>
                        <div className='text-xl font-semibold flex items-center'>
                            Group Detail 
                        </div> 

                        <div className="flex gap-1 items-center text-ih-blue">
                            <div className='font-medium'>
                                Edit
                            </div>
                            <ModeEditOutlinedIcon fontSize="small" />
                        </div>
                        {/* <Button 
                            type="primary" 
                            htmlType="submit"
                            className={`rounded-lg py-5 ${loading? "ih-button-disabled": "ih-button"} `}
                            disabled={loading}
                        >
                            {loading? <Spin /> : <span>Save group</span>}
                        </Button> */}
                    </div>

                    {/* Form */}
                    <div className='form-container flex flex-col gap-5'>

                        {/* Group Information Section */}

                        <div className='group-information flex flex-col gap-2 w-full bg-white rounded-xl p-5 pb-0 border border-solid border-slate-300'>
                            <div className='text-base font-semibold mb-5'>Group Information</div>

                            <div className='field-row flex items-center gap-4'>

                                {/* Group code field */}
                                <Form.Item<FieldType>
                                    className="flex-1"
                                    label="Group code"
                                    name="group_code"
                                    initialValue={groupInformation.group_code}
                                    rules={[{ required: true, message: 'Please enter a group code' }]}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Client field */}
                                <Form.Item<FieldType> 
                                    className="flex-1" 
                                    label="Client"
                                    name="client_id"
                                    rules={[{ message: 'Select a client' }]}
                                    initialValue={groupInformation.client_id}
                                >
                                    <Select>
                                        <Select.Option value={groupInformation.client_id}>{groupInformation.client_name}</Select.Option>
                                    </Select>
                                </Form.Item>

                            </div>
                        </div>

                        <div className='select-students flex flex-col gap-5 w-full bg-white rounded-xl p-5 pb-0 border border-solid border-slate-300'>
                            <div className='flex flex-col gap-1'>
                                <div className='text-base font-semibold'>Students</div>
                                <div>Students in this group</div>
                            </div>

                            {/* Select students field */}
                            <Form.Item<FieldType> 
                                className="flex-1" 
                                name="selected_students"
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    options={studentOptions}
                                />
                            </Form.Item>
                        </div>

                    </div>
                </Form>
            </div>
        </div>
    )
}