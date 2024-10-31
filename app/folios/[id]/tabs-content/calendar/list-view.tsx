'use client'

import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditClasses from './actions/edit-class';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

export default function ListView({ classesList, listOfClasses }:any){

    const formatedRows:any = []

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

    const columns: GridColDef<(typeof classesList)[number]>[] = [
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
            field: 'teacher',
            headerName: 'Teacher',
            flex: 1,
            minWidth: 200,
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
            field: 'class_status',
            headerName: 'Status',
            minWidth: 120,
            renderCell: (params) => <StatusTag  class_status={params.value} />
        },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell:params=> <EditButton params={params} />
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

        const handleClick = () => {
            console.log('You clicked!')
        }

        return(
            <div className='flex gap-2 items-center h-full' >
                <div className='text-ih-blue'>
                    <EditOutlinedIcon/>
                </div>
                <div className='text-red-600'>
                    <RemoveCircleOutlineOutlinedIcon/>
                </div>
            </div>
        )
    }

    return(
        <div className='w-full pb-5'>
            <DataGrid
                rows={formatedRows}
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
        </div>
    )
}