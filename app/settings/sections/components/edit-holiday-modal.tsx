'use client'

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Select, DatePicker, Spin } from "antd";
import dayjs from "dayjs";

type FieldType = {
    date?: Date;
    description?: string;
    type?: string;
};

export default function EditHolidayForm({setEditDrawer, setCreatedHoliday, defaultValues}:any){
    const supabase = createClient()
    const router = useRouter();
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false) // If true, the form was sent and it's disabled

    async function onFinish(e:FieldType) {
        setLoading(true)
        console.log('Sent data:', e);

        const { data: updatedHolidays, error: holidayError } = await supabase.from('holidays').update({
            date: e.date,
            description: e.description,
        })
        .eq('holiday_id', defaultValues.holiday_id)
        .select()

        setTimeout(() => {
            form.resetFields()
            setEditDrawer(false)
            setCreatedHoliday(updatedHolidays)
            setLoading(false)
        }, 1000);
    };

    useEffect(() => {
        console.log('Default value: ', defaultValues)
        if (defaultValues){
            form.setFieldValue('date', dayjs(defaultValues.date))
            form.setFieldValue('description', defaultValues.description)
        }else{
            form.resetFields();
        }
    }, [defaultValues])

    return(
        <div className="">
            <Form 
                form={form}
                className="w-full"
                layout='vertical'
                size='large'
                onFinish={onFinish}
            >
                {/* Form */}
                <div className="form-container flex flex-col gap-2 pb-5">
                    <Form.Item
                        className="flex-1" 
                        label="Date to block"
                        name="date"
                        rules={[{ required: true, message: 'Please select a date' }]}
                    >
                        <DatePicker className="w-full" format="MMM D, YYYY"/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Description"
                        name="description"
                    >
                        <Input />
                    </Form.Item>
                </div>
                
                <div className='action-buttons flex gap-2 items-center justify-end py-5 border-t border-gray-300'>
                    <Button onClick={() => setEditDrawer(false)}>Cancel</Button>
                    <Button 
                        type="primary"
                        htmlType="submit"
                    >
                        {loading? <Spin /> : <span>Save changes</span>}
                    </Button>
                </div>
            </Form>

        </div>
    )
}