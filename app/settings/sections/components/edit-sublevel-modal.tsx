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

export default function EditSubLevelForm({setEditSublevelDrawer, setCreatedSublevel, levelList, defaultValues}:any){
    const supabase = createClient()
    const router = useRouter();
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false) // If true, the form was sent and it's disabled

    async function onFinish(e:FieldType) {
        setLoading(true)
        console.log('Sent data:', e);

        const { data: updatedSublevel, error: sublevelError } = await supabase.from('sublevels').update({
            sublevel: e.sublevel,
            description: e.description,
            level_id: e.level_id,
        })
        .eq('sublevel_id', defaultValues.sublevel_id)
        .select()

        setTimeout(() => {
            form.resetFields()
            setEditSublevelDrawer(false)
            setCreatedSublevel(updatedSublevel)
            setLoading(false)
        }, 1000);
    };

    useEffect(() => {
        if(defaultValues){
            form.setFieldValue('sublevel', defaultValues.sublevel)
            form.setFieldValue('description', defaultValues.description)
            form.setFieldValue('level_id', defaultValues.level_id)
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
                    <Button onClick={()=>setEditSublevelDrawer(false)}>Cancel</Button>
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