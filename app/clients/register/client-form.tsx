'use client'

import { jsClient } from '@/utils/supabase/form-server';

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Form, Button, Input, Select, DatePicker, Spin } from "antd";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState } from 'react';

type FieldType = {
    client_name?: string;
    client_type?: string;
    rfc?: string;
    join_date?: Date;
    termination_date?: Date;
    legal_representative?: string;
    email?: string;
    website?: string;
    phone_number?: string;
    phone_number_2?: string;
    phone_number_3?: string;
    address?: string,
    neighborhood?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    business_info?: string;
    notes?: string;
};

const { TextArea } = Input;

export default function RegistrationForm(){
    const supabase = jsClient

    const router = useRouter();

    const [loading, setLoading] = useState(false)

    async function onFinish(e:FieldType) {
        setLoading(true)
        console.log('Sent data:', e);

        const result = await supabase.from('clients').insert({
            client_name: e.client_name,
            client_type: e.client_type,
            rfc: e.rfc,
            join_date: e.join_date,
            termination_date: e.termination_date,
            legal_representative: e.legal_representative,
            email: e.email,
            website: e.website,
            phone_number: e.phone_number,
            phone_number_2: e.phone_number_2,
            phone_number_3: e.phone_number_3,
            address: e.address,
            neighborhood: e.neighborhood,
            city: e.city,
            state: e.state,
            zip_code: e.zip_code,
            business_info: e.business_info,
            notes: e.notes,
        })

        setTimeout(() => {
            router.push('/clients')
        }, 1000);
        // console.log(result)
        /* setTimeout(() => {
            router.push('/clients')
        }, 2500); */
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
                    <Link href={"/clients"}>
                        <ArrowBackRoundedIcon className='mr-2 text-black hover:text-black'/>
                    </Link>
                    New Client 
                </div> 
                <Button 
                    type="primary" 
                    htmlType="submit"
                    className={`rounded-lg py-5 ${loading? "ih-button-disabled": "ih-button"} `}
                    disabled={loading}
                >
                    {loading? <Spin /> : <span>Save client</span>}
                </Button>
            </div>

            {/* Form */}
            <div className='form-container flex gap-5'>

                <div className='left-section flex flex-col gap-5 w-2/3'>

                    {/* Client Information Section */}

                    <div className='client-information flex flex-col gap-2 w-full bg-white rounded-xl p-5 pb-0 border border-solid border-slate-300'>
                        <div className='text-base font-semibold mb-5'>Client Information</div>
                        <div className='fields w-full flex flex-col'>

                            {/* Client name field */}
                            <Form.Item<FieldType>
                                label="Client name"
                                name="client_name"
                                rules={[{ required: true, message: 'Please enter the client name' }]}
                            >
                                <Input />
                            </Form.Item>

                            <div className='field-row flex items-center gap-4'>

                                {/* Client type field */}
                                <Form.Item<FieldType> 
                                    className="flex-1" 
                                    label="Client Type"
                                    name="client_type"
                                    rules={[{ required: true, message: 'Please select the client type' }]}
                                >
                                    <Select>
                                        <Select.Option value="School">School</Select.Option>
                                        <Select.Option value="Company">Company</Select.Option>
                                    </Select>
                                </Form.Item>

                                {/* Client RFC field */}
                                <Form.Item<FieldType>
                                    className="flex-1"
                                    label="RFC"
                                    name="rfc"
                                    rules={[{ required: true, message: 'Please enter the RFC' }]}
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

                                {/* Termination date field */}
                                <Form.Item
                                    className="flex-1" 
                                    label="Termination Date"
                                    name="termination_date"
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

                            {/* Legal representative field */}
                            <Form.Item<FieldType>
                                label="Legal representative"
                                name="legal_representative"
                            >
                                <Input/>
                            </Form.Item>

                            <div className='field-row flex items-center gap-4'>

                                {/* Email */}
                                <Form.Item<FieldType>
                                    label="Email"
                                    name="email"
                                    className='flex-1'
                                >
                                    <Input />
                                </Form.Item>

                                {/* Website */}
                                <Form.Item<FieldType>
                                    label="Website"
                                    name="website"
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
                                
                                {/* Phone number 3 */}
                                <Form.Item<FieldType>
                                    label="Phone number 3"
                                    name="phone_number_3"
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

                        {/* Business info*/}
                        <Form.Item<FieldType>
                            label="Business info"
                            name="business_info"
                            className='flex-1'
                        >
                            <TextArea rows={3}  />
                        </Form.Item>

                        {/* Notes*/}
                        <Form.Item<FieldType>
                            label="Notes"
                            name="notes"
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