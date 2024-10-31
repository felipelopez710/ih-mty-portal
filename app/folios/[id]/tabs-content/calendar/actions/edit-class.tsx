'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, Form, Input, Select, DatePicker, Spin, TimePicker } from "antd";

dayjs.extend(customParseFormat);

type FieldType = {
    material_description?: string;
    price_to_public?: string;
    level_id?: string;
    sublevel_id?: string;
};

export default function EditClassForm({ activeClass, onClose, setUpdatedClass }:any){
    const supabase = createClient()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    
    const [teacherOptions, setTeacherOptions]:any = useState(undefined)

    async function onFinish(e:any){
        console.log('Sent data: ', e)
        setLoading(true)
        
        const { data: updatedClass, error: classError } = await supabase.from('classes').update({
            date: e.date,
            start_time: dayjs(e.start_time).format('h:mm A'),
            end_time: dayjs(e.end_time).format('h:mm A'),
            teacher_id: e.teacher
        })
        .eq('class_id', activeClass.class_id)
        .select()

        if(updatedClass){
            console.log('Class updated: ', updatedClass)
        }
        if(classError){
            console.log('Error updating class: ', classError)
        }

        setTimeout(() => {
            form.resetFields()
            onClose()
            setUpdatedClass(updatedClass)
            setLoading(false)
        }, 1000);
    }

    async function getDefaultValues(){
        const { data: teachers, error: teachersError } = await supabase.from('teachers').select()
        if(teachers){
            console.log('Fetched teachers:', teachers)
            setTeacherOptions(teachers)
        }
        if(teachersError){
            console.log('Error fetching teachers: ', teachersError)
        }

        form.setFieldValue('date', dayjs(activeClass.date))
        form.setFieldValue('start_time', dayjs(activeClass.start_time, 'h:mm A'))
        form.setFieldValue('end_time', dayjs(activeClass.end_time, 'h:mm A'))
        form.setFieldValue('teacher', activeClass.teacher_id)
    }

    useEffect(() => {
        // Checks if the defualt values exists.
        if(activeClass){
            getDefaultValues()
        }
    }, [activeClass]) 

    return (
        <div>
            <Form
                form={form}
                className="w-full"
                layout='vertical'
                size='large'
                onFinish={onFinish}
            >
                {/* Form starts */}
                <div className="form-container flex flex-col gap-2 pb-5">
                    <Form.Item
                        label='Class date'
                        name='date'
                        rules={[{ required: true, message: 'A class date is needed' }]}
                    >
                        <DatePicker className="w-full" format="MMM D, YYYY"/>
                    </Form.Item>

                    <div className="time-pickers-container flex items-center gap-5">
                        <Form.Item
                            label='Start time'
                            name='start_time'
                            className="flex-1"
                            rules={[{ required: true, message: 'A start time is needed' }]}
                        >
                            <TimePicker className="w-full"  defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
                        </Form.Item>
                        <Form.Item
                            label='End time'
                            name='end_time'
                            className="flex-1"
                            rules={[{ required: true, message: 'An end time is needed' }]}
                        >
                            <TimePicker className="w-full"  defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
                        </Form.Item>
                    </div>

                    <Form.Item 
                        className="flex-1" 
                        label="Teacher"
                        name="teacher"
                        rules={[{ required: true, message: 'Please select a level for the material' }]}
                    >
                        <Select>
                            {
                                teacherOptions?.map((teacher:any)=>(
                                    <Select.Option key={teacher.teacher_id} value={teacher.teacher_id}>{teacher.full_name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <div className='action-buttons flex gap-2 items-center justify-end py-5 border-t border-gray-300'>
                        <Button onClick={() => onClose()}>Cancel</Button>
                        <Button 
                            type="primary"
                            htmlType="submit"
                        >
                            {loading? <Spin /> : <span>Save changes</span>}
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}