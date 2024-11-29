'use client'

import { createClient } from "@/utils/supabase/client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Form, Button, Input, Select, Spin } from "antd"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

type FieldType = {
    group_code?: string;
    client_id?: string;
    selected_students?: any;
    group_id?: any;
}

export default function EditGroupForm({groupId}:any){
    const supabase = createClient()
    const router = useRouter()
    const [form] = Form.useForm()
    
    const [loading, setLoading] = useState(false)
    
    const [activeGroup, setActiveGroup]:any = useState(undefined)
    const [studentOptions, setStudentOptions]:any = useState(undefined) // Stores the list of available students to select
    const [clientOptions, setClientOptions]:any = useState(undefined) // Stores the list of available clients to select
    const [defaultClient, setDefaultClient]:any = useState(undefined)

    // Gets the initial options for the client and students selector
    async function getInitialOptions(groupId:any) { 

        let client_id:any = null
        let client_name:any = null

        // Get the active group information
        const { data: groupInfo, error: groupError } = await supabase.from('groups').select().eq('group_id', groupId)
        // Get client list
        const { data: clients, error: clientsError } = await supabase.from('clients').select()
        
        if(groupInfo){

            // Getting and adding client name
            client_name = clients?.find(client => client.client_id === groupInfo[0].client_id).client_name
            groupInfo[0] = {...groupInfo[0], client_name}
            
            setActiveGroup({...groupInfo[0]})

            console.log('Active group information: ', groupInfo[0])
            client_id = groupInfo[0].client_id
        }
        
        
        if(clients){
            console.log('Fetched clients: ', clients)
            setClientOptions(clients)
        }
        if(clientsError){console.log('Error fetching clients: ', clientsError)}

        // Get student list
        if(client_id !== null){
            const { data: students, error: studentsError } = await supabase.from('students').select().eq('client_id', client_id)
            if(students){
                console.log('Initial student options: ', students)
                let list:any = []
                students.map((student:any)=>{
                    list.push({
                        label: student.full_name,
                        value: student.student_id,
                    })
                })

                setStudentOptions(list)
            }
            if(studentsError){console.log('Error fetching students: ', studentsError)}
        }

        if(groupInfo !== null){
            form.setFieldValue('group_code', groupInfo[0].group_code)
        }

        setDefaultClient(client_name)

    }

    async function onFinish(e:FieldType){
        // Falta desarrollar xD
        console.log('Sent data: ', e)
    }

    useEffect(() => {
        getInitialOptions(groupId)
    }, [])

    useEffect(() => {
        if(defaultClient){
            form.setFieldValue('client_id', defaultClient)
        }
    }, [defaultClient])

    return(
        <Form 
            form={form}
            className="w-full"
            layout='vertical'
            size='large'
            onFinish={onFinish}
        >
            {/* Form header and submit button */}
            <div className='header-container flex justify-between items-center mb-6 w-full'>
                <div className='text-xl font-semibold flex items-center'>
                    <Link href={"/groups"}>
                        <ArrowBackRoundedIcon className='mr-2 text-black hover:text-black'/>
                    </Link>
                    Edit group 
                </div> 
                <Button 
                    type="primary" 
                    htmlType="submit"
                    className={`rounded-lg py-5 ${loading? "ih-button-disabled": "ih-button"} `}
                    disabled={loading}
                >
                    {loading? <Spin /> : <span>Save changes</span>}
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
                                <Select>
                                    {clientOptions?.map((client:any) =>(
                                        <Select.Option value={client.client_name.toString()} key={client.client_id}>
                                            {client.client_name}
                                        </Select.Option>
                                    ))}
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