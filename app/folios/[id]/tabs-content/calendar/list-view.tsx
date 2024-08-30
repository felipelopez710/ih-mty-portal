'use client'

import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function ListView({ classesList, listOfClasses }:any){

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
    ];

    return(
        <div className='w-full pb-5'>
            <DataGrid
                rows={listOfClasses}
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