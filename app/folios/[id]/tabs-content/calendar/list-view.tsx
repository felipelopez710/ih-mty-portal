'use client'

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Drawer, Modal, Button } from 'antd';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditClassForm from './actions/edit-class';

export default function ListView({ activeFolio, classesList, listOfClasses }:any){
    const supabase = createClient()
    
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
    const cancelClass = async () => {
        setLoading(true)

        const { data: cancelledClass, error: classError } = await supabase.from('classes').update({
            class_status: 'cancelled'
        })
        .eq('class_id', activeClass.class_id)
        .select()

        if(cancelledClass){
            console.log('Updated class: ', cancelledClass)
        }

        setTimeout(()=>{
            setUpdatedClass(cancelledClass)
            setDeleteModal(false)
            setActiveClass(undefined)
            setLoading(false)
        }, 1000)
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
                        table-tag px-3 py-1.5 text-xs rounded-full capitalize font-medium border 
                        ${class_status == 'programmed' && 'border-ih-blue bg-sky-100 text-ih-blue'}
                        ${class_status == 'canceled' && 'border-red-600 bg-red-50 text-red-600'}
                        ${class_status == 'given' && 'border-green-600 bg-green-50 text-green-600'}
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
                <div className='flex gap-2 items-center h-full' >
                    <div className='text-ih-blue' onClick={handleClick}>
                        <EditOutlinedIcon/>
                    </div>
                    <div className='text-red-600' onClick={handleCancel}>
                        <RemoveCircleOutlineOutlinedIcon/>
                    </div>
                </div>
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
                    activeClass !== undefined && <EditClassForm activeClass={activeClass} onClose={onClose} setUpdatedClass={setUpdatedClass} />
                }
            </Drawer>
            <Modal
                title="Delete material"
                centered
                open={deleteModal}
                onOk={cancelClass}
                onCancel={onCancelDetele}
                footer={[
                    <Button key="cancel" onClick={onCancelDetele}>
                        Cancel
                    </Button>,
                    <Button key="delete" danger disabled={loading} onClick={cancelClass}>
                        Yes, cancel class
                    </Button>
                ]}
            >
                <p>Are you sure you want to cancel this class: {dayjs(activeClass?.date).format("MMMM D, YYYY")} ({activeClass?.start_time} - {activeClass?.start_time}) </p>
            </Modal>
        </div>
    )
}