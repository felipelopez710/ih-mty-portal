'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link"
import dayjs from 'dayjs';
import { Form, Button, Input, Select, DatePicker, Spin, TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const dayOptions = [
    {
        label: "Mon",
        value: "Monday",
    },
    {
        label: "Tue",
        value: "Tuesday",
    },
    {
        label: "Wed",
        value: "Wednesday",
    },
    {
        label: "Thu",
        value: "Thursday",
    },
    {
        label: "Fri",
        value: "Friday",
    },
    {
        label: "Sat",
        value: "Saturday",
    },
    {
        label: "Sun",
        value: "Sunday",
    },
]

type FieldType = {
    status?: string;
    group?: string;
    client?: string;
    client_location?: string;
    modality?: string;
    level?: string;
    sublevel?: string;
    material?: string;
    coordinator?: string;
    contracted_hours?: string;
    scheduled_hours?:string;
    amount_to_invoice?: string;
    price_type?: string,
    general_comments?: string;
    academic_comments?: string;
    material_covered?: string;
    frecuency_lines?: any;
    start_date?: any;
};

const { TextArea } = Input;

export default function EditFolioForm({initialValues}:any){
    const supabase = createClient()
    const router = useRouter()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const [materialOptions, setMaterialOptions]:any = useState(undefined)
    const [coordinatorOptions, setCoordinatorOptions]:any = useState(undefined)

    async function onFinish(e:FieldType){
        console.log('Updated information: ', e)
        setLoading(true)

        const { data: updatedFolio, error: folioError } = await supabase.from('folios').update({
            client_location: e.client_location,
            modality: e.modality,
            material_id: Number.isInteger(e.material) ? e.material : null,
            start_date: e.start_date,
            contracted_hours: e.contracted_hours,
            amount_to_invoice: e.amount_to_invoice,
            coordinator_id: e.coordinator,
            status: e.status,
            comments: e.general_comments,
            academic_comments: e.academic_comments,
            material_covered: e.material_covered,
        })
        .eq('folio_id', initialValues.folio_id)
        .select()

        if(updatedFolio){
            const { data: updatedFrequencyLines, error: frequencyError } = await supabase
            .from('folio_teacher_relationship')
            .update({status: e.status})
            .eq('folio_id', initialValues.folio_id)
            .select()
        }

        setTimeout(() => {
            router.push(`/folios/${initialValues.folio_id}`)
        }, 1000);
    }

    async function getDefaultValues(){
        const { data: materials, error: materialsError } = await supabase.from('materials').select().eq('sublevel_id', initialValues.sublevel_id)
        const { data: coordinators, error: coordinatorsError } = await supabase.from('coordinators').select().eq('coordinator_id', initialValues.coordinator_id)
        
        if(materials){
            setMaterialOptions(materials)
        }
        if(materialsError){
            console.log('Error fetching the materials: ', materialsError)
        }

        if(coordinators){
            setCoordinatorOptions(coordinators)
        }
        if(coordinatorsError){
            console.log('Error fetching the coordinators: ', coordinatorsError)
        }

        form.setFieldValue('group', initialValues.groups.group_code)
        form.setFieldValue('client', initialValues.client_name)
        form.setFieldValue('client_location', initialValues.client_location)
        form.setFieldValue('modality', initialValues.modality)
        form.setFieldValue('level', initialValues.levels?.level ?? initialValues.level_ref)
        form.setFieldValue('sublevel', initialValues.sublevels?.sublevel ?? "")
        form.setFieldValue('material', initialValues.material_id?.toString() ?? initialValues.material_ref)
        form.setFieldValue('start_date', dayjs(initialValues.start_date))
        form.setFieldValue('contracted_hours', initialValues.contracted_hours)
        form.setFieldValue('amount_to_invoice', initialValues.amount_to_invoice)
        form.setFieldValue('coordinator', initialValues.coordinator_id?.toString())
        form.setFieldValue('status', initialValues.status)
        form.setFieldValue('general_comments', initialValues.comments)
        form.setFieldValue('academic_comments', initialValues.academic_comments)
        form.setFieldValue('material_covered', initialValues.material_covered)
    }

    useEffect(() => {
        if(initialValues){
            getDefaultValues()
        }
    }, [initialValues])
    

    return(
        <Form
            form={form} 
            className="w-full"
            layout='vertical'
            size='large'
            onFinish={onFinish}
        >

            {/* Form header and submit button */}
            <div className='header-container flex justify-between items-center mb-6 w-full'>
                <div className='text-xl font-semibold flex items-center'>
                    <Link href={"/folios"}>
                        <ArrowBackRoundedIcon className='mr-2 text-black hover:text-black'/>
                    </Link>
                    Edit Folio {initialValues?.folio_id}
                </div> 
                <Button 
                    type="primary" 
                    htmlType="submit"
                    className="ih-button rounded-lg py-5"
                >
                    {loading? <Spin /> : <span>Save changes</span>}
                </Button>
            </div>

            <div className="form-container flex flex-col gap-5">

                <div className="top-section flex gap-5">

                    <div className='left-section flex flex-col gap-5 w-2/3'>

                        {/* Folio Information Section */}
                        <div className='client-information flex flex-col gap-2 w-full bg-white rounded-xl p-5 pb-0 border border-solid border-slate-300'>
                            <div className='text-base font-semibold mb-5'>Folio Information</div>
                            <div className='fields w-full flex flex-col'>

                                <div className='field-row flex items-center gap-4'>

                                    {/* Group code */}
                                    <Form.Item<FieldType>
                                        className="flex-1"
                                        label="Group"
                                        name="group"
                                    >
                                        <Input disabled />
                                    </Form.Item>

                                    {/* Client field */}
                                    <Form.Item<FieldType>
                                        className="flex-1"
                                        label="Client"
                                        name="client"
                                    >
                                        <Input disabled />
                                    </Form.Item>

                                </div>

                                <div className='field-row flex items-center gap-4'>

                                    {/* Client Location field */}
                                    <Form.Item<FieldType>
                                        className="flex-1"
                                        label="Client location"
                                        name="client_location"
                                    >
                                        <Input />
                                    </Form.Item>

                                </div>

                                <div className='field-row flex items-center gap-4'>

                                    {/* Modality */}
                                    <Form.Item<FieldType> 
                                        className="flex-1" 
                                        label="Modality"
                                        name="modality"
                                        rules={[{ required: true, message: 'Please select the modality' }]}
                                    >
                                        <Select>
                                            <Select.Option value="F2F">F2F</Select.Option>
                                            <Select.Option value="Online">Online</Select.Option>
                                        </Select>
                                    </Form.Item>

                                    {/* Level */}
                                    <Form.Item<FieldType>
                                        className="flex-1"
                                        label="Level"
                                        name="level"
                                    >
                                        <Input disabled />
                                    </Form.Item>

                                </div>

                                <div className='field-row flex items-center gap-4'>

                                    {/* Sublevel */}
                                    <Form.Item<FieldType>
                                        className="flex-1"
                                        label="Sublevel"
                                        name="sublevel"
                                    >
                                        <Input disabled />
                                    </Form.Item>

                                    {/* Materials */}
                                    <Form.Item<FieldType> 
                                        className="flex-1" 
                                        label="Materials"
                                        name="material"
                                        rules={[{ required: true, message: 'Please select the modality' }]}
                                    >
                                        <Select>
                                            {materialOptions?.map((material:any)=>{
                                                return(
                                                    <Select.Option value={material.material_id.toString()} key={material.material_id}>
                                                       {material.material_description}
                                                    </Select.Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>

                                </div>

                                <div className='field-row flex items-center gap-4'>

                                    {/* Start date field */}
                                    <Form.Item
                                        className="flex-1" 
                                        label="Start Date"
                                        name="start_date"
                                    >
                                        <DatePicker className="w-full" format="MMM D, YYYY"/>
                                    </Form.Item>

                                    {/* Contracted hours */}
                                    <Form.Item<FieldType>
                                        className="flex-1"
                                        label="Contracted hours"
                                        name="contracted_hours"
                                        rules={[{ required: true, message: 'Please enter the contracted hours' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                </div>

                                <div className='field-row flex items-center gap-4'>

                                    {/* Amount to be invoiced */}
                                    <Form.Item<FieldType>
                                        className="flex-1"
                                        label="Amount to be invoiced"
                                        name="amount_to_invoice"
                                    >
                                        <Input />
                                    </Form.Item>

                                    {/* Coordinator */}
                                    <Form.Item<FieldType> 
                                        className="flex-1" 
                                        label="Coordinator"
                                        name="coordinator"
                                        rules={[{ required: false, message: 'Please select the level' }]}
                                    >
                                        <Select>
                                            {coordinatorOptions?.map((coordinator:any)=>{
                                                return(
                                                    <Select.Option value={coordinator.coordinator_id.toString()} key={coordinator.coordinator_id}>
                                                        Alejandro Gorosabel
                                                    </Select.Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>

                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Comments Section */}
                    
                    <div className="left-section w-1/3 h-min flex flex-col gap-5">
                        
                        <div className="status bg-white rounded-xl p-5 pb-0 flex flex-col gap-5 border border-solid border-slate-300">
                            <div className='text-base font-semibold'>Folio status</div>
                            <Form.Item<FieldType> 
                                className="flex-1" 
                                label="Status"
                                name="status"
                                rules={[{ required: true, message: 'Please select the status' }]}
                            >
                                <Select>
                                    <Select.Option value="ative">Active</Select.Option>
                                    <Select.Option value="inactive">Inactive</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className='comments-section bg-white rounded-xl p-5 pb-0 flex flex-col gap-5 border border-solid border-slate-300'>
                            <div className='text-base font-semibold'>Comments</div>
                            <div className='fields flex flex-col'>

                                {/* General comments */}
                                <Form.Item<FieldType>
                                    className="flex-1"
                                    label="General comments"
                                    name="general_comments"
                                >
                                    <TextArea rows={2} />
                                </Form.Item>

                                {/* Academic comments */}
                                <Form.Item<FieldType>
                                    className="flex-1"
                                    label="Academic"
                                    name="academic_comments"
                                >
                                    <TextArea rows={2} />
                                </Form.Item>

                                {/* Material covered */}
                                <Form.Item<FieldType>
                                    className="flex-1"
                                    label="Material covered"
                                    name="material_covered"
                                >
                                    <TextArea rows={2} />
                                </Form.Item>

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </Form>
    )
}