'use client'

import { createClient } from '@/utils/supabase/client';
import { adminAuthClient } from '@/utils/supabase/admin-client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Form, Button, Input, Select, DatePicker, Spin } from "antd";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState } from 'react';

type FieldType = {
    name?: string;
    surname?: string;
    alias?:string;
    gender?: string;
    code_ih?: string;
    date_of_birth?: Date;
    nationality?: string;
    native_language?: string;
    rfc?: string;
    curp?: string;
    join_date?: Date;
    quit_date?: Date;
    email?: string;
    mobile?: string,
    phone_number?: string;
    phone_number_2?: string;
    address?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    comments?: string;
};

const { TextArea } = Input;

export default function TeacherForm(){
    const supabase = createClient();
    const supabaseAdmin = adminAuthClient;

    const router = useRouter();

    const [loading, setLoading] = useState(false)

    async function onFinish(e:FieldType) {
        setLoading(true)
        console.log('Sent data:', e);
        let createdUser

        // Create a new user
        if(e.email !== undefined){
            const { data: newUser, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
                email: e.email,
                password: 'IH.mty2024',
                email_confirm: true,
            })
            createdUser = newUser

            if(newUser){
                console.log('User: ', newUser)
                console.log('User ID: ', newUser.user?.id)
                // Create a new role for the user
                const { data: newRole, error: roleError } = await supabase
                .from('user_roles')
                .insert({
                   user_id: newUser.user?.id,
                   user_name: `${e.name} ${e.surname}`,
                   role: 'teacher' 
                })

                // Create a new Teacher for the user
                const { data, error } = await supabase
                .from('teachers')
                .insert({
                    user_id: newUser.user?.id,
                    full_name: `${e.name} ${e.surname}`,
                    name: e.name,
                    surname: e.surname,
                    alias:e.alias,
                    gender: e.gender,
                    code_ih: e.code_ih,
                    date_of_birth: e.date_of_birth,
                    nationality: e.nationality,
                    native_language: e.native_language,
                    rfc: e.rfc,
                    curp: e.curp,
                    join_date: e.join_date,
                    quit_date: e.quit_date,
                    email: e.email,
                    mobile: e.mobile,
                    phone_number: e.phone_number,
                    phone_number_2: e.phone_number_2,
                    address: e.address,
                    neighborhood: e.neighborhood,
                    city: e.city,
                    state: e.state,
                    zip_code: e.zip_code,
                    comments: e.comments,
                })
                .select()
            }
            if(signUpError){
                console.log('Error: ', signUpError)
            }
        }

        setTimeout(() => {
            router.push('/settings')
        }, 1000);
    };

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
                    <Link href={"/settings"}>
                        <ArrowBackRoundedIcon className='mr-2 text-black hover:text-black'/>
                    </Link>
                    New teacher 
                </div> 
                <Button 
                    type="primary" 
                    htmlType="submit"
                    className="ih-button rounded-lg py-5"
                >
                    {loading? <Spin /> : <span>Save teacher</span>}
                </Button>
            </div>

            {/* Form */}
            <div className='form-container flex gap-5'>

                <div className='left-section flex flex-col gap-5 w-2/3'>

                    {/* Client Information Section */}

                    <div className='teacher-information flex flex-col gap-2 w-full bg-white rounded-xl p-5 pb-0 border border-solid border-slate-300'>
                        <div className='text-base font-semibold mb-5'>Teacher Information</div>
                        <div className='fields w-full flex flex-col'>

                            <div className='field-row flex items-center gap-4'>

                                {/* Name field */}
                                <Form.Item<FieldType>
                                    label="Name"
                                    name="name"
                                    className="flex-1" 
                                    rules={[{ required: true, message: 'First name' }]}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Surname field */}
                                <Form.Item<FieldType>
                                    label="Surname"
                                    name="surname"
                                    className="flex-1" 
                                    rules={[{ required: true, message: 'Last name' }]}
                                >
                                    <Input />
                                </Form.Item>

                            </div>

                            <div className='field-row flex items-center gap-4'>

                                {/* Alias field */}
                                <Form.Item<FieldType>
                                    label="Alias"
                                    name="alias"
                                    className="flex-1" 
                                >
                                    <Input />
                                </Form.Item>

                                {/* Gender field */}
                                <Form.Item<FieldType> 
                                    className="flex-1" 
                                    label="Gender"
                                    name="gender"
                                    rules={[{ message: 'Select a gender' }]}
                                >
                                    <Select>
                                        <Select.Option value="Female">Female</Select.Option>
                                        <Select.Option value="Male">Male</Select.Option>
                                    </Select>
                                </Form.Item>

                            </div>

                            <div className='field-row flex items-center gap-4'>

                                {/* Code IH field */}
                                <Form.Item<FieldType>
                                    label="CODEIH"
                                    name="code_ih"
                                    className="flex-1" 
                                >
                                    <Input />
                                </Form.Item>

                                {/* Date of birth field */}
                                <Form.Item
                                    className="flex-1" 
                                    label="Date of birth"
                                    name="date_of_birth"
                                >
                                    <DatePicker className="w-full" format="MMM D, YYYY"/>
                                </Form.Item>

                            </div>

                            <div className='field-row flex items-center gap-4'>

                                {/* Nationality field */}
                                <Form.Item<FieldType> 
                                    className="flex-1" 
                                    label="Naionality"
                                    name="nationality"
                                    rules={[{ message: 'Select a nationality' }]}
                                >
                                    <Select>
                                        <Select.Option value="Mexican">Mexican</Select.Option>
                                        <Select.Option value="American">American</Select.Option>
                                        <Select.Option value="Other">Other</Select.Option>
                                    </Select>
                                </Form.Item>

                                {/* Native language field */}
                                <Form.Item<FieldType> 
                                    className="flex-1" 
                                    label="Native Language"
                                    name="native_language"
                                    rules={[{ message: 'Select a nationality' }]}
                                >
                                    <Select>
                                        <Select.Option value="Spanish">Spanish</Select.Option>
                                        <Select.Option value="English">English</Select.Option>
                                        <Select.Option value="Other">Other</Select.Option>
                                    </Select>
                                </Form.Item>

                            </div>

                            <div className='field-row flex items-center gap-4'>

                                {/* RFC field */}
                                <Form.Item<FieldType>
                                    label="RFC"
                                    name="rfc"
                                    className="flex-1" 
                                >
                                    <Input />
                                </Form.Item>

                                {/* CURP field */}
                                <Form.Item<FieldType>
                                    label="CURP"
                                    name="curp"
                                    className="flex-1" 
                                >
                                    <Input />
                                </Form.Item>

                            </div>

                            <div className='field-row flex items-center gap-4'>

                                {/* Join date field */}
                                <Form.Item
                                    className="flex-1" 
                                    label="Join Date"
                                    name="join_date"
                                >
                                    <DatePicker className="w-full" format="MMM D, YYYY"/>
                                </Form.Item>

                                {/* Quit date field */}
                                <Form.Item
                                    className="flex-1" 
                                    label="Quit Date"
                                    name="quit_date"
                                >
                                    <DatePicker className="w-full" format="MMM D, YYYY"/>
                                </Form.Item>

                            </div>

                        </div>
                    </div>

                    {/* Contact Information Section */}

                    <div className='contact-information flex flex-col gap-3 w-full bg-white rounded-xl p-5 pb-0 border border-solid border-slate-300'>
                        <div className='text-base font-semibold mb-5'>Contact Information</div>
                        <div className='fields w-full flex flex-col'>

                            <div className='field-row flex items-center gap-4'>

                                {/* Email */}
                                <Form.Item<FieldType>
                                    label="Email"
                                    name="email"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                                {/* Mobile number */}
                                <Form.Item<FieldType>
                                    label="Mobile number"
                                    name="mobile"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                            </div>

                            <div className='field-row flex items-center gap-4'>

                                {/* Phone number */}
                                <Form.Item<FieldType>
                                    label="Phone number"
                                    name="phone_number"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                                {/* Phone number 2 */}
                                <Form.Item<FieldType>
                                    label="Phone number 2"
                                    name="phone_number_2"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                            </div>

                            <div className='field-row flex items-center gap-4'>

                                {/* Address field */}
                                <Form.Item<FieldType>
                                    label="Address"
                                    name="address"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                                {/* Neighborhood */}
                                <Form.Item<FieldType>
                                    label="Neighborhood"
                                    name="neighborhood"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                            </div>

                            <div className='field-row flex items-center gap-4'>

                                {/* City field */}
                                <Form.Item<FieldType>
                                    label="City"
                                    name="city"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                                {/* State */}
                                <Form.Item<FieldType>
                                    label="State"
                                    name="state"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                                {/* Zip Code */}
                                <Form.Item<FieldType>
                                    label="Zip Code"
                                    name="zip_code"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                            </div>

                        </div>
                    </div>

                </div>

                {/* Comments Section */}

                <div className='comments-section w-1/3 bg-white rounded-xl p-5 pb-0 h-min flex flex-col gap-5 border border-solid border-slate-300'>
                    <div className='text-base font-semibold'>Comments</div>
                    <div className='flex flex-col'>
                        {/* General comments*/}
                        <Form.Item<FieldType>
                            label="General comments"
                            name="comments"
                            className='flex-1'
                        >
                            <TextArea rows={3}  />
                        </Form.Item>
                    </div>
                </div>

            </div>

        </Form>
    )
}