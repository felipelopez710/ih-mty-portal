'use client'

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Select, DatePicker, Spin } from "antd";

type FieldType = {
    material_description?: string;
    price_to_public?: string;
    level_id?: string;
    sublevel_id?: string;
};

export default function EditMaterialForm({setEditDrawer, setCreatedMaterial, defaultValues}:any){
    const supabase = createClient()
    const router = useRouter();
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false) // If true, the form was sent and it's disabled

    const [levelsOptions, setLevelsOptions]:any = useState(undefined)
    const [sublevelsOptions, setSublevelsOptions]:any = useState([])

    async function onFinish(e:FieldType) {
        setLoading(true)
        console.log('Sent data:', e);

        const { data: updatedMaterial, error: materialError } = await supabase.from('materials').update({
            material_description: e.material_description,
            price_to_public: e.price_to_public,
            level_id: e.level_id,
            sublevel_id: e.sublevel_id,
        })
        .eq('material_id', defaultValues.material_id)
        .select()

        setTimeout(() => {
            form.resetFields()
            setEditDrawer(false)
            setCreatedMaterial(updatedMaterial)
            setLoading(false)
        }, 1000);
    };

    async function getLevels(){
        const { data: levels, error: levelsError } = await supabase.from('levels').select()
        if (levels){
            setLevelsOptions(levels)
        }
        if(levelsError){
            console.log('Error:', levelsError)
        }
        const { data: sublevels, error: sublevelsError } = await supabase.from('sublevels').select().eq('level_id', defaultValues.level_id)
        if (sublevels){
            setSublevelsOptions(sublevels)
        }
        if(sublevelsError){
            console.log('Error: ', sublevelsError)
        }

        form.setFieldValue('material_description', defaultValues.material_description)
        form.setFieldValue('price_to_public', defaultValues.price_to_public)
        form.setFieldValue('level_id', defaultValues.level_id)
        form.setFieldValue('sublevel_id', defaultValues.sublevel_id)
    }

    const onLevelChange = async (value: string) => {
        const { data:sublevels, error: sublevelsError } = await supabase.from('sublevels').select().eq('level_id', value)

        if(sublevels){
            setSublevelsOptions(sublevels)
        }
        if(sublevelsError){
            console.log('Error: ', sublevelsError)
        }
    };

    useEffect(() => {
        // Checks if the defualt values exists.
        if(defaultValues){
            getLevels()
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
                        label="Material description"
                        name="material_description"
                        rules={[{ required: true, message: 'Please enter a description for the material' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Price to public"
                        name="price_to_public"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> 
                        className="flex-1" 
                        label="Level"
                        name="level_id"
                        rules={[{ required: true, message: 'Please select a level for the material' }]}
                    >
                        <Select onChange={onLevelChange}>
                            {
                                levelsOptions?.map((level:any)=>(
                                    <Select.Option key={level.level_id} value={level.level_id}>{level.level}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item<FieldType> 
                        className="flex-1" 
                        label="Sublevel"
                        name="sublevel_id"
                        rules={[{ required: true, message: 'Please select a sublevel for the material' }]}
                    >
                        <Select>
                            {
                                sublevelsOptions.map((sublevel:any)=>(
                                    <Select.Option key={sublevel.sublevel_id} value={sublevel.sublevel_id}>{sublevel.sublevel}</Select.Option>
                                ))
                            }                           
                        </Select>
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