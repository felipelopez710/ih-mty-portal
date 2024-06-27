'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns = [
    { 
        field: 'student_id', 
        headerName: 'Matrícula', 
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
        field: 'mobile',
        headerName: 'Phone',
        width: 150,
        editable: true,
    },
    {
        field: 'nationality',
        headerName: 'Nationality',
        width: 150,
        editable: true,
    },
    {
        field: 'client_name',
        headerName: 'Client',
        width: 150,
        editable: true,
    },
    {
        field: 'student_status',
        headerName: 'Status',
        width: 150,
        editable: true,
    }
];

export default function StudentsTable({rows}) {
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
                getRowId={(row) => row.student_id}
                className='bg-white'
            />
        </div>
    )
}