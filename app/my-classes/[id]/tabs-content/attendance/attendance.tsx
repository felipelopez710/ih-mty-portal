'use client'

import { createClient } from "@/utils/supabase/client";
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs';
import { Tag, Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from "react";
import GroupList from "./group-list-form";

const columns: GridColDef<any>[] = [
    { 
        field: 'class_id', 
        headerName: 'ID', 
        width: 90 
    },
    {
        field: 'date',
        headerName: 'Class date',
        flex: 1,
        minWidth: 200,
        valueGetter: (value, row) => `${dayjs(row.date).format("MMMM D, YYYY") || ''}`
    },
    {
        field: 'start_time',
        headerName: 'Start time',
        flex: 1,
        minWidth: 120,
    },
    {
        field: 'end_time',
        headerName: 'End time',
        flex: 1,
        minWidth: 120,
    },
    {
        field: 'attendance_taken',
        headerName: 'Attendance',
        width: 160,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
            <span>
                {
                    params.row.attendance_taken ? 
                    <Tag color="green">Registered</Tag>
                    :
                    <Tag>Pending</Tag>
                }
            </span>
        )
    }
];

export default function CourseAttendance({ activeFolioId, courseClasses, folioDetails, setFolioDetails, groupDetails, setGroupDetails }:any){
    const supabase = createClient();

    /* <----- Modal controlers -----> */

    const [modalOpen, setModalOpen] = useState(false)
    
    const showDrawer = () => {
        setModalOpen(true)
    };
    
      const onClose = () => {
        setModalOpen(false)
        setActiveClass(undefined)
        setClassDate(undefined)
    };

    /* <----- Modal controlers -----> */

    // console.log('Classes to show', courseClasses)

    const [activeClass, setActiveClass] : any = useState(undefined)
    const [classDate, setClassDate] : any = useState(undefined)

    const handleRowClick: GridEventListener<'rowClick'> = async (params) => {
        console.log(`Class "${params.row.class_id}" clicked`)
        if(folioDetails !== undefined){
            console.log('Ya existe el detalle del folio')
            console.log('Folio:', folioDetails)
            console.log('Group:', groupDetails)
            setActiveClass(params.row.id)
            setClassDate({
                date: params.row.date,
                start: params.row.start_time,
                end: params.row.end_time
            })
        }else{
            console.log('No existe el detalle del folio')
            const { data: folioDetails, error: folioError } = await supabase
            .from('folios')
            .select('*, groups (group_id, group_code), levels (level_id, description)')
            .eq('folio_id', activeFolioId)
            
            if(folioDetails){
                console.log('Folios details:', folioDetails[0])
                console.log('Group Details:', folioDetails[0].groups)
                setFolioDetails(folioDetails[0])
                setGroupDetails(folioDetails[0].groups)
                setActiveClass(params.row.id)
                setClassDate({
                    date: params.row.date,
                    start: params.row.start_time,
                    end: params.row.end_time
                })
            } 
        }

        showDrawer()
    };

    return(
        <div>
            <DataGrid
                rows={courseClasses}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
                }}
                pageSizeOptions={[5,10,25]}
                checkboxSelection
                disableRowSelectionOnClick
                getRowId={(row) => row.class_id}
                className='bg-white w-full rounded-xl'
                onRowClick={handleRowClick}
            />

            <GroupList 
                folioDetails={folioDetails} 
                activeClass={activeClass} 
                classDate={classDate} 
                onClose={onClose}
                modalOpen={modalOpen}
            />
            
        </div>
    )
}