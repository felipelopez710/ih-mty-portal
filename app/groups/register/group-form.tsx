'use client'

import { jsClient } from '@/utils/supabase/form-server';

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Form, Button, Input, Select, DatePicker, Spin } from "antd";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState } from 'react';

type FieldType = {
    group_code?: string;
    client_id?: string;
    selected_students?: any;
    group_id?: any;
}

export default function GroupForm({ clients } : any){
    const supabase = jsClient

    const [loading, setLoading] = useState(false)

    const [selectedClient, setSelectedClient] = useState(undefined)

    const [studentOptions, setStudentOptions] = useState(null)

    async function onFinish(e:FieldType){
        // console.log("The form was sent")

        console.log('Group information: ', e)

        let selected_client = null

        if(e.client_id !== undefined){
            console.log('Client ID: ', parseInt(e.client_id))
            selected_client = parseInt(e.client_id)
        }

        const { data: created_group, error } : any = await supabase
        .from('groups')
        .insert({
            group_code: e.group_code,
            client_id: selected_client,
            members: e.selected_students.length,
            folios_count: 0
        })
        .select()

        if (created_group) {
            console.log('INSERT RESPONSE: ', created_group)

            let students_to_sign:any = []

            e.selected_students.map((student:any) => {
                students_to_sign.push({
                    group_id: created_group[0].group_id,
                    student_id: parseInt(student)
                })
            })

            console.log('Students to sign: ', students_to_sign)

            const { data, error } = await supabase
            .from('student_per_group')
            .insert(students_to_sign)
            .select()

            if (data){
                console.log('Success: ', data)
            }
            if (error){
                console.log('Error: ', error)
            }
        }
    }

    async function handleClientChange(value : any) {
        console.log("Client id:", value)
        
        setStudentOptions(null)

        const { data, error } = await supabase
        .from('students')
        .select()
        .eq('client_id', parseInt(value))

        console.log("Student list: ", data)

        let options:any = []

        data?.map((student:any) =>{
            options.push({
                label: student.full_name,
                value: student.student_id.toString()
            })
        })

        setStudentOptions(options)
    }

    return(
        <Form 
            className="w-full"
            layout='vertical'
            size='large'
            onFinish={onFinish}
        >
            {/* Form header and submit button */}
            <div className='header-container flex justify-between items-center mb-6 w-full'>
                <div className='text-xl font-semibold flex items-center'>
                    <Link href={"/clients"}>
                        <ArrowBackRoundedIcon className='mr-2 text-black hover:text-black'/>
                    </Link>
                    New Group 
                </div> 
                <Button 
                    type="primary" 
                    htmlType="submit"
                    className={`rounded-lg py-5 ${loading? "ih-button-disabled": "ih-button"} `}
                    disabled={loading}
                >
                    {loading? <Spin /> : <span>Save group</span>}
                </Button>
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
                        >
                            <Select onChange={handleClientChange}>
                                {clients.map((client:any) =>{
                                    return(
                                        <Select.Option value={client.client_id.toString()} key={client.client_id}>
                                            {client.client_name}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>

                    </div>
                </div>

                {
                    studentOptions !== null ?

                    <div className='select-students flex flex-col gap-5 w-full bg-white rounded-xl p-5 pb-0 border border-solid border-slate-300'>
                        <div className='flex flex-col gap-1'>
                            <div className='text-base font-semibold'>Students</div>
                            <div>Choose the students who will be in the group</div>
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

                    :

                    <span></span>

                }

            </div>
        </Form>
    )
}