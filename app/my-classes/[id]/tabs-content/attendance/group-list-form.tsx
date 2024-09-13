'use client'

import dayjs from "dayjs"
import { Tag, Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Spin, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type FieldType = {
    name?: string;
    owner?: string;
    attendanceRecord?: any;
};

export default function GroupList({folioDetails, activeClass, classDate, studentsList, setStudentsList, loadingList, setLoadingList, attendanceList, setAttendanceList, setModalOpen}:any){
    const supabase = createClient();

    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    async function onFinish(e:FieldType){
        setLoading(true)
        console.log('Submited info: ', e)

        let recordToSend : any = []
        e.attendanceRecord.map((record:any)=>{
            recordToSend.push({
                class_id: activeClass.class_id,
                student_id: record.student_id,
                attendance: record.attendance,
                folio_id: activeClass.folio_id,
                teacher_id: activeClass.teacher_id,
            })
        })

        console.log('Records to send:', recordToSend)

        
        const { data: createdRecord, error: attendanceError } = await supabase
        .from('attendance')
        .insert(recordToSend)
        .select()
        
        if(createdRecord){console.log('Created record: ', createdRecord)}

        if(attendanceError){console.log('Error: ', attendanceError)}


        const { data: updatedClass, error: classError } = await supabase
        .from('classes')
        .update({ class_status: 'given', attendance_taken: true })
        .eq('class_id', activeClass.class_id)
        .select()
        
        console.log('Updated class: ', updatedClass)
        if(classError){console.log(classError)}

        form.resetFields()
        setLoading(false)
        setModalOpen(false)
    }

    async function GetRecord() {
        if(activeClass.attendance_taken){
            console.log('Clase ya tiene lista')
            const { data: attendance, error: attendanceError } = await supabase.from('attendance').select('*, students(student_id, full_name)').eq('class_id', activeClass.class_id)
            console.log('Fetched attendance record: ', attendance)
            setAttendanceList(attendance)
            setLoadingList(false)
        }else{
            console.log('Clase sin pasar lista')
            if(studentsList === undefined){
                const { data: students, error: studentsError } = await supabase.from('student_per_folio').select('*, students(student_id, full_name)').eq('folio_id', folioDetails?.folio_id)
                console.log('Fetched students: ', students)
                setStudentsList(students)
                setLoadingList(false)
            }else{
                console.log(studentsList)
                setLoadingList(false)
            }
        }


        /* if(studentsList === undefined){
            const { data: students, error: studentsError } = await supabase.from('student_per_folio').select('*, students(student_id, full_name)').eq('folio_id', folioDetails?.folio_id)
            console.log('Fetched students: ', students)
            setStudentsList(students)

            const { data: attendance, error: attendanceError } = await supabase.from('attendance').select().eq('class_id', activeClass.class_id)
            console.log('Fetched attendance record: ', attendance)

            setLoadingList(false)
        }else{
            console.log('Stored list: ', studentsList)
            const { data: attendance, error: attendanceError } = await supabase.from('attendance').select().eq('class_id', activeClass.class_id)
            console.log('Fetched attendance record: ', attendance)
            setLoadingList(false)
        } */
    }

    useEffect(() => {
        console.log('Active Class: ', activeClass)
        form.resetFields()
        if (activeClass){
            GetRecord()
        } 
    }, [activeClass])
    

    return(
        <>
            <Form
                form={form} 
                className="w-full"
                layout='vertical'
                onFinish={onFinish}
                size="large"
            >
                <div className="w-full flex flex-col gap-5">
                    <div className="list-header flex justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-base font-semibold">F. {folioDetails?.folio_id} | {folioDetails?.levels?.description}</div>
                            <div>
                                {classDate !== undefined && `${dayjs(classDate.date).format('MMMM D, YYYY')} | ${classDate.start} - ${classDate.end}`}
                            </div>
                        </div>

                        {
                            (!loadingList && attendanceList === undefined) &&
                            <Button 
                                type="primary"
                                className={`rounded-lg py-5 ${loading? "ih-button-disabled": "ih-button"} `} 
                                htmlType="submit" 
                                disabled={loading} 
                            >
                                Save
                            </Button>
                        }
                    </div>

                    <div className="attendance-record mt-4">
                        {
                            loadingList ? 
                            <div className="w-full p-5 flex items-center justify-center">
                                <Spin indicator={<LoadingOutlined spin />} size="large" />
                            </div>
                            :
                            <div className="bg-white rounded-xl border border-slate-300 overflow-hidden">

                                {
                                    attendanceList !== undefined ?
                                    <>
                                        {attendanceList?.map((student:any, index:any) => (
                                            <div key={student.student_id} className={`fields-row flex gap-4 p-3 ${index !== (attendanceList.length - 1) && 'border-b border-slate-300'}`}>
                                                <Form.Item 
                                                    name={['attendanceRecord', index, 'student_id']} 
                                                    rules={[{ required: true }]} 
                                                    initialValue={student.student_id}
                                                    className="mb-0 w-14 text-black"
                                                >
                                                    <Input className="p-0 !text-black" variant="borderless" disabled={true}/>
                                                </Form.Item>
                                                <Form.Item 
                                                    name={['attendanceRecord', index, 'student_name']} 
                                                    rules={[{ required: true }]} 
                                                    initialValue={student.students.full_name}
                                                    className="mb-0 flex-1"
                                                >
                                                    <Input className="p-0 !text-black" variant="borderless" disabled={true}/>
                                                </Form.Item>
                                                <Form.Item
                                                    name={['attendanceRecord', index, 'attendance']}
                                                    rules={[{ required: true }]}
                                                    className="flex-1 mb-0"
                                                    initialValue={student.attendance}
                                                >
                                                    <Select placeholder="Select an option" disabled={true} >
                                                        <Select.Option value="present">Present</Select.Option>
                                                        <Select.Option value="absent">Absent</Select.Option>
                                                        <Select.Option value="tardy">Tardy</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        ))}
                                    </>
                                    :
                                    <>
                                        {studentsList?.map((student:any, index:any) => (
                                            <div key={student.student_id} className={`fields-row flex gap-4 p-3 ${index !== (studentsList.length - 1) && 'border-b border-slate-300'}`}>
                                                <Form.Item 
                                                    name={['attendanceRecord', index, 'student_id']} 
                                                    rules={[{ required: true }]} 
                                                    initialValue={student.student_id}
                                                    className="mb-0 w-14 text-black"
                                                >
                                                    <Input className="p-0 !text-black" variant="borderless" disabled={true}/>
                                                </Form.Item>
                                                <Form.Item 
                                                    name={['attendanceRecord', index, 'student_name']} 
                                                    rules={[{ required: true }]} 
                                                    initialValue={student.students.full_name}
                                                    className="mb-0 flex-1"
                                                >
                                                    <Input className="p-0 !text-black" variant="borderless" disabled={true}/>
                                                </Form.Item>
                                                <Form.Item
                                                    name={['attendanceRecord', index, 'attendance']}
                                                    rules={[{ required: true }]}
                                                    className="flex-1 mb-0"
                                                >
                                                    <Select placeholder="Select an option" >
                                                        <Select.Option value="present">Present</Select.Option>
                                                        <Select.Option value="absent">Absent</Select.Option>
                                                        <Select.Option value="tardy">Tardy</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        ))}
                                    </>
                                }
                                
                                {/* {studentsList?.map((student:any, index:any,) => (
                                    <div key={student.student_id} className={`fields-row flex gap-4 p-3 ${index !== (studentsList.length - 1) && 'border-b border-slate-300'}`}>
                                        <Form.Item 
                                            name={['attendanceRecord', index, 'student_id']} 
                                            rules={[{ required: true }]} 
                                            initialValue={student.student_id}
                                            className="mb-0 w-14"
                                        >
                                            <Input className="p-0" variant="borderless" />
                                        </Form.Item>
                                        <Form.Item 
                                            name={['attendanceRecord', index, 'student_name']} 
                                            rules={[{ required: true }]} 
                                            initialValue={student.students.full_name}
                                            className="mb-0 flex-1"
                                        >
                                            <Input className="p-0" variant="borderless"/>
                                        </Form.Item>
                                        <Form.Item
                                            name={['attendanceRecord', index, 'attendande']}
                                            rules={[{ required: true }]}
                                            className="flex-1 mb-0"
                                        >
                                            <Select placeholder="Select an option">
                                                <Select.Option value="present">Present</Select.Option>
                                                <Select.Option value="absent">Absent</Select.Option>
                                                <Select.Option value="tardy">Tardy</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                ))} */}

                            </div>
                        }
                    </div>
                    
                </div>
            </Form>
        </>
    )
}