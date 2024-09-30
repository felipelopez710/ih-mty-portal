'use client'

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Select, DatePicker, Spin } from "antd";

type FieldType = {
    sublevel?: string;
    description?: string;
    level_id?: string;
};

export default function NewSubLevelForm({setSublevelDrawerOpen, setCreatedSublevel, levelList, activeLevel}:any){
    const supabase = createClient()
    const router = useRouter();
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false) // If true, the form was sent and it's disabled

    async function onFinish(e:FieldType) {
        setLoading(true)
        console.log('Sent data:', e);

        const { data: newSublevel, error: sublevelError } = await supabase.from('sublevels').insert({
            sublevel: e.sublevel,
            description: e.description,
            level_id: e.level_id,
        })
        .select()

        setTimeout(() => {
            form.resetFields()
            setSublevelDrawerOpen(false)
            setCreatedSublevel(newSublevel)
            setLoading(false)
        }, 1000);
    };

    useEffect(() => {
        form.setFieldValue('level_id', activeLevel)
    }, [activeLevel])
    

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
                        label="Sublevel"
                        name="sublevel"
                        rules={[{ required: true, message: 'Please enter a name for the sublevel' }]}
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
                        label="Parent level"
                        name="level_id"
                        rules={[{ required: true, message: 'Please select a parent level' }]}
                        initialValue={activeLevel}
                    >
                        <Select>
                            {
                                levelList.map((level:any)=>(
                                    <Select.Option key={level.level_id} value={level.level_id}>{level.level}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </div>
                
                <div className='action-buttons flex gap-2 items-center justify-end py-5 border-t border-gray-300'>
                    <Button>Cancel</Button>
                    <Button 
                        type="primary"
                        htmlType="submit"
                    >
                        {loading? <Spin /> : <span>Save sublevel</span>}
                    </Button>
                </div>
            </Form>

        </div>
    )
}