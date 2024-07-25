'use client'

import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function ListView({classesList }:any){

    const columns: GridColDef<(typeof classesList)[number]>[] = [
        { 
            field: 'class_id', 
            headerName: 'ID', 
            width: 90 
        },
        {
            field: 'class_date',
            headerName: 'Class date',
            flex: 1,
            minWidth: 200,
            editable: true,
            valueGetter: (value, row) => `${dayjs(row.date).format("MMMM D, YYYY") || ''}`
        },
        {
            field: 'teacher_name',
            headerName: 'Teacher',
            flex: 1,
            minWidth: 200,
            editable: true,
        },
        {
            field: 'start_time',
            headerName: 'Start time',
            flex: 1,
            minWidth: 120,
            editable: true,
            valueGetter: (value, row) => `${dayjs(row.start).format("h:mm A") || ''}`
        },
        {
            field: 'end_time',
            headerName: 'End time',
            flex: 1,
            minWidth: 120,
            editable: true,
            valueGetter: (value, row) => `${dayjs(row.end).format("h:mm A") || ''}`
        },
    ];

    return(
        <div className='w-fulll'>
            <DataGrid
                rows={classesList}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                getRowId={(row) => row.class_id}
                className='bg-white w-full rounded-xl'
            />
        </div>
    )
}