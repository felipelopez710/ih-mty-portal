'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation'

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
    const router = useRouter();

    const handleRowClick = (params) => {
        console.log(`Row clicked ID: "${params.row.teacher_id}"`);
        router.push(`teachers/${params.row.teacher_id}`)
    };

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
                onRowClick={handleRowClick}
                className='bg-white'
                isCellEditable={() => false}
            />
        </div>
    )
}