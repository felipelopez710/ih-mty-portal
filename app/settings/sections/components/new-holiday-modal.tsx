'use client'

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Select, DatePicker, Spin } from "antd";

type FieldType = {
    date?: Date;
    description?: string;
    type?: string;
};

export default function NewHolidayForm({setDrawerOpen, setCreatedHoliday, defaulType}:any){
    const supabase = createClient()
    const router = useRouter();
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false) // If true, the form was sent and it's disabled

    async function onFinish(e:FieldType) {
        setLoading(true)
        console.log('Sent data:', e);

        const { data: newHoliday, error: holidayError } = await supabase.from('holidays').insert({
            date: e.date,
            description: e.description,
            type: e.type,
        })
        .select()

        setTimeout(() => {
            form.resetFields()
            setDrawerOpen(false)
            setCreatedHoliday(newHoliday)
            setLoading(false)
        }, 1000);
    };

    useEffect(() => {
        form.setFieldValue('type', defaulType)
    }, [defaulType])

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

                    <Form.Item<FieldType> 
                        className="flex-1" 
                        label="Holiday type"
                        name="type"
                        rules={[{ required: true, message: 'Please select the type' }]}
                    >
                        <Select>
                            <Select.Option value="fixed">Fixed</Select.Option>
                            <Select.Option value="variable">Variable</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                
                <div className='action-buttons flex gap-2 items-center justify-end py-5 border-t border-gray-300'>
                    <Button>Cancel</Button>
                    <Button 
                        type="primary"
                        htmlType="submit"
                    >
                        {loading? <Spin /> : <span>Save level</span>}
                    </Button>
                </div>
            </Form>

        </div>
    )
}