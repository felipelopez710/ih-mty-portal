'use client'

import Link from 'next/link';
import type { FormProps } from 'antd';
import { Form, Button, Input, Select, DatePicker, Spin } from "antd";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

type FieldType = {
    client_name?: string;
    client_type?: string;
    rfc?: string;
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

const initialClientValues = {
    client_name: "IENU - Insitituto de Educación de las Naciones Unidas",
    client_type: "School",
    rfc: "IENU0001",
    join_date: "1963-10-14",
    termination_date: "1999-10-07",
}

const { TextArea } = Input;

export default function EditForm({ clientInfo }:any){

    const [loading, setLoading] = useState(false)

    const onFinish = (e:FieldType) => {
        setLoading(true)
        //console.log('Success:', e);
        //console.log("Client Detail: ", clientInfo)
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
                    <Link href={clientInfo !== undefined ? `/clients/${clientInfo.client_id}` : "/clients"}>
                        <ArrowBackRoundedIcon className='mr-2'/>
                    </Link>
                    Edit Client 
                </div> 
                <Button 
                    type="primary" 
                    htmlType="submit"
                    className="ih-button rounded-lg py-5"
                >
                    {loading? <Spin /> : <span>Save changes</span>}
                </Button>
            </div>

            {clientInfo !== undefined ?            
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
                                initialValue={clientInfo !== undefined ? clientInfo.client_name : null}
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
                                    <Select defaultValue={clientInfo !== undefined ? clientInfo.client_type : null} >
                                        <Select.Option value="School">School</Select.Option>
                                        <Select.Option value="Business">Business</Select.Option>
                                    </Select>
                                </Form.Item>

                                {/* Client RFC field */}
                                <Form.Item<FieldType>
                                    className="flex-1"
                                    label="RFC"
                                    name="rfc"
                                    initialValue={clientInfo !== undefined ? clientInfo.rfc : null}
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
                                    <DatePicker 
                                        className="w-full" 
                                        format="MMM D, YYYY"
                                        defaultValue={(clientInfo !== undefined && clientInfo.join_date !== null) ? dayjs(clientInfo.join_date, "YYYY-MM-DD") : null}
                                    />
                                </Form.Item>

                                {/* Termination date field */}
                                <Form.Item
                                    className="flex-1" 
                                    label="Termination Date"
                                    name="termination_date"
                                >
                                    <DatePicker 
                                        className="w-full" 
                                        format="MMM D, YYYY"
                                        defaultValue={(clientInfo !== undefined && clientInfo.termination_date !== null) ? dayjs(clientInfo.termination_date, "YYYY-MM-DD") : null}
                                    />
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
                                initialValue={clientInfo !== undefined ? clientInfo.legal_representative : null}
                            >
                                <Input />
                            </Form.Item>

                            <div className='field-row flex items-center gap-4'>

                                {/* Email */}
                                <Form.Item<FieldType>
                                    label="Email"
                                    name="email"
                                    className='flex-1'
                                    initialValue={clientInfo !== undefined ? clientInfo.email : null}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Website */}
                                <Form.Item<FieldType>
                                    label="Website"
                                    name="website"
                                    className='flex-1'
                                    initialValue={clientInfo !== undefined ? clientInfo.website : null}
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
                                    initialValue={clientInfo !== undefined ? clientInfo.phone_number : null}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Phone number 2 */}
                                <Form.Item<FieldType>
                                    label="Phone number 2"
                                    name="phone_number_2"
                                    className='flex-1'
                                    initialValue={clientInfo !== undefined ? clientInfo.phone_number_2 : null}
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
                                    initialValue={clientInfo !== undefined ? clientInfo.address : null}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Neighborhood */}
                                <Form.Item<FieldType>
                                    label="Neighborhood"
                                    name="neighborhood"
                                    className='flex-1'
                                    initialValue={clientInfo !== undefined ? clientInfo.neighborhood : null}
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
                                    initialValue={clientInfo !== undefined ? clientInfo.city : null}
                                >
                                    <Input />
                                </Form.Item>

                                {/* State */}
                                <Form.Item<FieldType>
                                    label="State"
                                    name="state"
                                    className='flex-1'
                                    initialValue={clientInfo !== undefined ? clientInfo.state : null}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Zip Code */}
                                <Form.Item<FieldType>
                                    label="Zip Code"
                                    name="zip_code"
                                    className='flex-1'
                                    initialValue={clientInfo !== undefined ? clientInfo.zip_code : null}
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
                            initialValue={clientInfo !== undefined ? clientInfo.business : null}
                        >
                            <TextArea rows={3}  />
                        </Form.Item>

                        {/* Notes*/}
                        <Form.Item<FieldType>
                            label="Notes"
                            name="notes"
                            className='flex-1'
                            initialValue={clientInfo !== undefined ? clientInfo.comments : null}
                        >
                            <TextArea rows={3}  />
                        </Form.Item>

                    </div>
                </div>

            </div>
            :
            <div></div>
            }
        </Form>
    )
}