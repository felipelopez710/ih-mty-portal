'use client'

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Select, DatePicker, Spin } from "antd";

type FieldType = {
    level?: string;
    description?: string;
    area_level?: string;
};

export default function NewLevelForm({setLevelDrawerOpen, setCreatedLevel}:any){
    const supabase = createClient()
    const router = useRouter();
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false) // If true, the form was sent and it's disabled

    async function onFinish(e:FieldType) {
        setLoading(true)
        console.log('Sent data:', e);

        const { data: newLevel, error: levelError } = await supabase.from('levels').insert({
            level: e.level,
            description: e.description,
            area_level: e.area_level,
        })
        .select()

        setTimeout(() => {
            form.resetFields()
            setLevelDrawerOpen(false)
            setCreatedLevel(newLevel)
            setLoading(false)
        }, 1000);
    };

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
                    <Form.Item<FieldType>
                        label="Level"
                        name="level"
                        rules={[{ required: true, message: 'Please enter a name for the level' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Description"
                        name="description"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> 
                        className="flex-1" 
                        label="Area level"
                        name="area_level"
                        rules={[{ required: true, message: 'Please select the area level' }]}
                        initialValue={'English'}
                    >
                        <Select>
                            <Select.Option value="English">English</Select.Option>
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