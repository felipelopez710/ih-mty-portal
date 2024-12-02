'use client'

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Drawer, Modal, Button, Form, Select } from 'antd';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditClassForm from './actions/edit-class';

export default function ListView({ activeFolio, classesList, listOfClasses }:any){
    const supabase = createClient()
    const [form] = Form.useForm()
    
    const [loading, setLoading] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false) // Triggers the 'Edit class' modal
    const [deleteModal, setDeleteModal] = useState(false) // Triggers the 'Cancel class' modal
    const [activeClass, setActiveClass]:any = useState(undefined) // Stores the class to update or delete
    const [updatedClass, setUpdatedClass]:any = useState(undefined) // Stores the updated class and triggers the list update
    const [orderedRows, setOrderedRows]:any = useState([]) // Stores the final list that is passed to the table
    
    // Closes the 'Edit class' modal
    const onClose = () => {
        setDrawerOpen(false)
        setActiveClass(undefined)
    }

    const onCancelDetele = () => {
        setActiveClass(undefined)
        setDeleteModal(false)
    }

    // Controls the final confirmation to cancel the class
    async function cancelClass(e:any) {
        // setLoading(true)

        console.log('Class to update: ', activeClass.class_id)
        console.log('Status to put: ', e.reason)

        // Set status of the class to the cancelation reason
        const { data: cancelledClass, error: classError } = await supabase.from('classes').update({
            class_status: e.reason
        })
        .eq('class_id', activeClass.class_id)
        .select()

        if(cancelledClass){
            console.log('Updated class: ', cancelledClass)
        }

        // Set attendance records for each studet from the folio and set it to the cancelation reason
        const { data: students, error: studentsError } = await supabase
        .from('student_per_folio')
        .select('folio_id, student_id')
        .eq('folio_id', activeFolio.folio_id)

        let attendanceRecords:any = []

        if(students){
            students.map((student:any)=>{
                attendanceRecords.push({
                    attendance: e.reason,
                    class_id: activeClass.class_id,
                    student_id: student.student_id,
                    folio_id: activeFolio.folio_id,
                    teacher_id: null
                })
            })
        }

        const { data: createdAttendance, error: attendanceError } = await supabase
        .from('attendance')
        .insert(attendanceRecords)
        .select()
        
        setTimeout(()=>{
            setUpdatedClass(cancelledClass)
            setDeleteModal(false)
            setActiveClass(undefined)
            setLoading(false)
        }, 100) 
       
    }


    async function updateClassesList(){
        const { data: classes, error: classesError } = await supabase.from('classes').select('*, teachers(teacher_id, full_name)').eq('folio_id', activeFolio.folio_id)
        if(classes){
            let formatedRows:any = []

            classes.map((clase:any)=>{
                formatedRows.push({
                    class_id: clase.class_id,
                    date: clase.date,
                    teacher: clase.teachers.full_name,
                    start_time: clase.start_time,
                    end_time: clase.end_time,
                    class_status: clase.class_status,
                })
            })
        
            setOrderedRows(formatedRows.sort((a:any, b:any)=>(a.date > b.date ? 1 : -1)))
        }
    }

    const columns: GridColDef<(typeof classesList)[number]>[] = [
        { 
            field: 'class_id', 
            headerName: 'ID', 
            width: 60 
        },
        {
            field: 'date',
            headerName: 'Class date',
            flex: 1,
            minWidth: 150,
            valueGetter: (value, row) => `${dayjs(row.date).format("MMMM D, YYYY") || ''}`
        },
        {
            field: 'teacher',
            headerName: 'Teacher',
            flex: 1,
            minWidth: 180,
        },
        {
            field: 'start_time',
            headerName: 'Start time',
            minWidth: 100,
        },
        {
            field: 'end_time',
            headerName: 'End time',
            minWidth: 100,
        },
        {
            field: 'class_status',
            headerName: 'Status',
            minWidth: 120,
            renderCell: (params) => <StatusTag  class_status={params.value} />
        },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params)=> <EditButton params={params} />
        },
    ];

    const StatusTag = ({ class_status }:any) => {
        return(
            <div className='flex items-center h-full'>
                <div>
                    <span className={`
                        table-tag px-3 py-1.5 text-xs rounded-full font-medium border 
                        ${class_status == 'programmed' && 'capitalize border-ih-blue bg-sky-100 text-ih-blue'}
                        ${class_status == 'canceled' && 'capitalize border-red-600 bg-red-50 text-red-600'}
                        ${class_status == 'ct' && 'border-red-600 bg-red-50 text-red-600 uppercase'}
                        ${class_status == 'cs' && 'border-red-600 bg-red-50 text-red-600 uppercase'}
                        ${class_status == 'cih' && 'border-red-600 bg-red-50 text-red-600 uppercase'}
                        ${class_status == 'given' && 'capitalize border-green-600 bg-green-50 text-green-600'}
                    `}>
                        {class_status}
                    </span>
                </div>
            </div>
        )
    }
    
    const EditButton = ({ params }:any) => {

        const handleClick = async() => {
            setDrawerOpen(true)
            const { data: classes, error: DataError } = await supabase.from('classes').select().eq('class_id', params.row.class_id)
            if(classes){
                setActiveClass(classes[0])
            }
        }

        const handleCancel = async() => {
            setDeleteModal(true)
            setActiveClass(params.row)
        }

        return(
            <div>
                {
                    params.row.class_status == 'programmed' ?
                    <div className='flex gap-2 items-center h-full' >
                        <div className='text-ih-blue' onClick={handleClick}>
                            <EditOutlinedIcon/>
                        </div>
                        <div className='text-red-600' onClick={handleCancel}>
                            <RemoveCircleOutlineOutlinedIcon/>
                        </div>
                    </div>
                    :
                    <div className='flex gap-2 items-center h-full' >
                    </div>
                }
            </div>
        )
    }

    useEffect(() => {
        let formatedRows:any = []

        listOfClasses?.map((clase:any)=>{
            formatedRows.push({
                class_id: clase.class_id,
                date: clase.date,
                teacher: clase.teachers.full_name,
                start_time: clase.start_time,
                end_time: clase.end_time,
                class_status: clase.class_status,
            })
        })
    
        setOrderedRows(formatedRows.sort((a:any, b:any)=>(a.date > b.date ? 1 : -1)))
        
        if(updatedClass){
            updateClassesList()
        }
    }, [updatedClass]) 

    return(
        <div className='w-full pb-5'>
            <DataGrid
                rows={orderedRows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 100,
                    },
                },
                }}
                pageSizeOptions={[100]}
                checkboxSelection
                disableRowSelectionOnClick
                getRowId={(row) => row.class_id}
                className='bg-white w-full rounded-xl'
            />

            <Drawer
                title={'Edit class'}
                width={500}
                open={drawerOpen}
                onClose={onClose}
            >
                {
                    activeClass !== undefined && <EditClassForm activeFolio={activeFolio} activeClass={activeClass} onClose={onClose} setUpdatedClass={setUpdatedClass} />
                }
            </Drawer>
            <Modal
                title="Cancel class"
                centered
                open={deleteModal}
                onOk={cancelClass}
                onCancel={onCancelDetele}
                footer={[
                    <Form
                        form={form} 
                        className="w-full"
                        layout='vertical'
                        size='large'
                        onFinish={cancelClass}
                    >
                        <div className='footer-container flex flex-col'>
                            <div className='form-container w-full text-left'>
                                <Form.Item
                                    className="flex-1" 
                                    label="Reason for cancellation"
                                    name="reason"
                                    rules={[{ required: true, message: 'Please select a reason' }]}
                                >
                                    <Select>
                                        <Select.Option value="ct">Cancelled by Teacher</Select.Option>
                                        <Select.Option value="cs">Cancelled by students</Select.Option>
                                        <Select.Option value="cih">Cancelled by International House</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='buttons container flex gap-2 justify-end'>
                                <Button key="cancel" onClick={onCancelDetele}>
                                    Cancel
                                </Button>
                                <Button key="delete" danger disabled={loading} htmlType="submit">
                                    Cancel class
                                </Button>
                            </div>
                        </div>
                    </Form>
                ]}
            >
                <div className='flex flex-col gap-2 py-2'>
                    <p>Are you sure you want to cancel this class:</p>
                    <div className='px-4 py-2 rounded-lg bg-blue-50'>
                        {dayjs(activeClass?.date).format("MMMM D, YYYY")} ({activeClass?.start_time} - {activeClass?.start_time})
                    </div>
                </div>
            </Modal>
        </div>
    )
}