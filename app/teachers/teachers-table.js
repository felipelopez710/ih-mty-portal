'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns = [
    { 
        field: 'teacher_id', 
        headerName: 'ID', 
        width: 90 
    },
    {
        field: 'full_name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
    },
    {
        field: 'phone_number',
        headerName: 'Phone',
        width: 200,
        editable: true,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 150,
        editable: true,
    },
    {
        field: 'state',
        headerName: 'State',
        width: 150,
        editable: true,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        editable: true,
    }
];

export default function TeachersTable({rows}) {
    return(
        <div>
            <DataGrid
                rows={rows}
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
                getRowId={(row) => row.teacher_id}
                className='bg-white'
            />
        </div>
    )
}