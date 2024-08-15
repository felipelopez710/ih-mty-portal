'use client'

import { jsClient } from '@/utils/supabase/form-server';

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Form, Button, Input, Select, DatePicker, Spin, Space, TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState } from 'react';
import dayjs from 'dayjs';

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
    group?: string;
    client?: string;
    client_location?: string;
    modality?: string;
    level?: string;
    material?: string;
    coordinator?: string;
    contracted_hours?: string;
    amount_to_invoice?: string;
    price_type?: string,
    general_comments?: string;
    academic_comments?: string;
    material_covered?: string;
    frecuency_lines?: any;
    start_date?: any;
};

const { TextArea } = Input;

export default function RegistrationForm({ groups, levels, coordinators, teachers, holidays }:any){
    const supabase = jsClient

    const router = useRouter();

    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    const [materialOptions, setMaterialOptions] = useState([])

    async function onFinish(e:FieldType) {
        setLoading(true)
        console.log('Folio information:', e);

        console.log('Frecuency lines: ', e.frecuency_lines);

        let classesPerDay:any = []

        let listOfClasses: any = []

        e.frecuency_lines.map((line:any)=>{

            line.frequency.map((day:any)=>{
                classesPerDay.push({
                    dayOfWeek: day,
                    startTime: dayjs(line.start_date_end_date[0]).format('h:mm A'),
                    endTime: dayjs(line.start_date_end_date[1]).format('h:mm A'),
                    duration: dayjs(line.start_date_end_date[1]).diff(line.start_date_end_date[0], 'hour', true),
                    teacherId: line.teacher,
                })
            })

        })

        console.log('Classes per day:', classesPerDay)

        let currentDate = new Date(e.start_date)
        let cumulativeHours = 0
        let absenceDays = []
        let courseHours
        if(e.contracted_hours !== undefined){
            courseHours = parseFloat(e.contracted_hours)
        }
        
        // Función para convertir el nombre del día a un número (0 = Domingo, 1 = Lunes, etc.)
        function dayToNumber(day:any) {
            const days:any = {
                "sunday": 0,
                "monday": 1,
                "tuesday": 2,
                "wednesday": 3,
                "thursday": 4,
                "friday": 5,
                "saturday": 6
            };

            return days[day.toLowerCase()];
        }

        // Convierte la lista de días de la semana a números
        let numericClassesPerDay = classesPerDay.map((day:any) => ({
            dayOfWeek: dayToNumber(day.dayOfWeek),
            startTime: day.startTime,
            endTime: day.endTime,
            duration: day.duration,
            teacherId: day.teacherId
        }))

        if(e.contracted_hours){
            console.log('Contracted hours: ', parseFloat(e.contracted_hours))
            while (cumulativeHours < parseFloat(e.contracted_hours)) {
                // Busca el día de la semana actual en la lista de días
                let currentDay = numericClassesPerDay.find((day:any) => day.dayOfWeek === currentDate.getDay());
                
                if (currentDay) {
                    let classDate = new Date(currentDate);

                    let absenceDate = holidays.find((holiday:any) => (holiday.date) === dayjs(classDate).format('YYYY-MM-DD'))

                    /* console.log("Comparisson")
                    console.log("Holiday: ", holidays[0].date)
                    console.log("Class Date: ", dayjs(classDate).format('YYYY-MM-DD')) */

                    if(absenceDate !== undefined){
                        absenceDays.push({
                            date: absenceDate.date,
                            description: absenceDate.description
                        })
                    }else{
                        listOfClasses.push({
                            classDate: classDate,
                            startTime: currentDay.startTime,
                            endTime: currentDay.endTime,
                            duration: currentDay.duration,
                            teacherId: currentDay.teacherId,
                        })
    
                        cumulativeHours += currentDay.duration
                    }
                }
                // Incrementa la fecha aactual en un día
                currentDate.setDate(currentDate.getDate() + 1)
            }
        }

        console.log('List of classes: ', listOfClasses)

        let lastClass = listOfClasses[listOfClasses.length - 1]

        console.log('Last class: ', lastClass.classDate)
        console.log('Absence days: ', absenceDays)

        const { data: created_folio, error } : any = await supabase
        .from('folios')
        .insert({
            group_id: e.group,
            client_name: e.client,
            modality: e.modality,
            level_id: e.level,
            material_id: e.material,
            start_date: e.start_date,
            end_date: lastClass.classDate,
            contracted_hours: courseHours,
            amount_to_invoice: e.amount_to_invoice,
            coordinator_id: e.coordinator,
            comments: e.general_comments,
            academic_comments: e.academic_comments,
            material_covered: e.material_covered,
            feedback_taken: false,
            status: "Active",
            client_location: e.client_location,
            holidays: absenceDays.length
        })
        .select()

        if (created_folio) {
            console.log('CREATED FOLIO: ', created_folio)

            let folioId = created_folio[0].folio_id

            // Create frequency lines and link them to the created folio

            let lines_to_create:any = []

            e.frecuency_lines.map((line:any) =>{
                lines_to_create.push({
                    folio_id: folioId,
                    frequency: JSON.stringify(line.frequency),
                    start_time: dayjs(line.start_date_end_date[0]).format('h:mm A'),
                    end_time: dayjs(line.start_date_end_date[1]).format('h:mm A'),
                })
            })

            const { data: created_lines, error } = await supabase
            .from('frequency_lines')
            .insert(lines_to_create)
            .select()

            if (created_lines) {
                console.log('CREATED LINES: ', created_lines)
            }
            if (error) {
                console.log('Error: ', error)
            }

            // Create the classes and link them to the created folio

            let classes_to_create:any = []
            listOfClasses.map((clase:any)=>{
                classes_to_create.push({
                    folio_id: folioId,
                    date: clase.classDate,
                    start_time: clase.startTime,
                    end_time: clase.endTime,
                    duration: clase.duration,
                    teacher_id: clase.teacherId,
                })
            })

            const { data: created_classes, error: classesError } = await supabase
            .from('classes')
            .insert(classes_to_create)
            .select()

            if (created_classes) {
                console.log('CREATED CLASSES: ', created_classes)
            }
            if (classesError) {
                console.log('Error with classes: ', classesError)
            }
        }

        if (error) {
            console.log('Error: ', error)
        }

        /* setTimeout(() => {
            router.push('/folios')
        }, 2500); */
    };

    function handleClientChange(value : any){
        /* console.log('Group id: ', value) */

        let selected_group = groups.find((o:any) => o.group_id === parseInt(value))

        /* console.log('Group information: ', selected_group)
        console.log(selected_group.client_name) */

        form.setFieldValue('client', selected_group.client_name)

        if(selected_group.city !== null && selected_group.state !== null){
            form.setFieldValue('client_location', `${selected_group.city}, ${selected_group.state}`)
        } else if(selected_group.city !== null){
            form.setFieldValue('client_location', selected_group.city)
        } else if(selected_group.state !== null){
            form.setFieldValue('client_location', selected_group.state)
        } else {
            form.setFieldValue('client_location', null)
        }
    }

    async function handleLevelChange(value : any){
        console.log("Level id", value)

        const { data, error } : any = await supabase
        .from('materials').
        select()
        .eq('level_id', parseInt(value))

        console.log('Materials list: ', data)

        setMaterialOptions(data)
    }

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
                    New Folio 
                </div> 
                <Button 
                    type="primary" 
                    htmlType="submit"
                    className="ih-button rounded-lg py-5"
                >
                    {loading? <Spin /> : <span>Save folio</span>}
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
                                        rules={[{ required: true, message: 'Please select the client type' }]}
                                    >
                                        <Select onChange={handleClientChange}>
                                            {groups.map((group:any)=>{
                                                return(
                                                    <Select.Option 
                                                        value={group.group_id.toString()}
                                                        key={group.group_id} 
                                                    >
                                                        {group.group_code}
                                                    </Select.Option>
                                                )
                                            })}
                                        </Select>
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

                                </div>

                                <div className='field-row flex items-center gap-4'>

                                    {/* Level */}
                                    <Form.Item<FieldType> 
                                        className="flex-1" 
                                        label="Level"
                                        name="level"
                                        rules={[{ required: true, message: 'Please select the level' }]}
                                    >
                                        <Select onChange={handleLevelChange}>
                                            {levels.map((level:any)=>{
                                                return (
                                                    <Select.Option value={level.level_id.toString()} key={level.level_id}>
                                                        {level.description}
                                                    </Select.Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>

                                    {/* Group code */}
                                    <Form.Item<FieldType> 
                                        className="flex-1" 
                                        label="Materials"
                                        name="material"
                                        rules={[{ required: true, message: 'Please select the modality' }]}
                                    >
                                        <Select>
                                            {materialOptions.map((material:any)=>{
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
                                        rules={[{ required: true, message: 'Please select the level' }]}
                                    >
                                        <Select>
                                            {coordinators.map((coordinator:any)=>{
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

                    <div className='comments-section w-1/3 bg-white rounded-xl p-5 pb-0 h-min flex flex-col gap-5 border border-solid border-slate-300'>
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

                {/* Frequency Section */}
                <div className="frequency w-full bg-white rounded-xl p-5 pb-0 h-min flex flex-col gap-5 border border-solid border-slate-300">

                    <div className="flex flex-col gap-2">
                        <div className='text-base font-semibold'>Teachers and frequency</div>
                        <div className=''>Configure the schedules and teachers for this folio</div>
                    </div>
                    <div className='fields flex flex-col'>

                        <div className="frecuency-lines w-full">

                            <Form.List name="frecuency_lines">
                                {(fields, { add, remove }) => (
                                    <span key={'list'}>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div className="flex items-center gap-2" key={key}>
                                            <div className="w-5 text-center">{key+1}</div>

                                            <Form.Item
                                                {...restField}
                                                label="Frecuency"
                                                name={[name, 'frequency']}
                                                className="flex-1"
                                            >
                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    //onChange={handleChange}
                                                    options={dayOptions}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                label="Start time - End time"
                                                name={[name, 'start_date_end_date']}
                                            >
                                                <TimePicker.RangePicker />
                                            </Form.Item>

                                            <Form.Item
                                                label="Teacher"
                                                name={[name, 'teacher']}
                                                rules={[{ required: true, message: 'Choose a teacher' }]}
                                                className="flex-1"
                                            >
                                                <Select>
                                                    {teachers.map((teacher:any)=>{
                                                        return(
                                                            <Select.Option value={teacher.teacher_id} key={teacher.teacher_id}>{teacher.full_name}</Select.Option>
                                                        )
                                                    })}
                                                </Select>
                                            </Form.Item>

                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add a line
                                        </Button>
                                    </Form.Item>
                                    </span>
                                )}
                            </Form.List>

                            {/* Start date */}
                            {/* <Form.Item
                                className="flex-1" 
                                label="Start Date"
                                name="start_date"
                            >
                                <DatePicker className="w-full" format="MMM D, YYYY"/>
                            </Form.Item> */}
                            
                        </div>

                    </div>

                </div>

            </div>

        </Form>
    )
}