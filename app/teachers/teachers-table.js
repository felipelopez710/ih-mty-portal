'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation'

const columns = [
    { 
        field: 'teacher_id', 
        headerName: 'ID', 
        width: 80, 
    },
    {
        field: 'full_name',
        headerName: 'Name',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'email',
        headerName: 'Email',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'phone_number',
        headerName: 'Phone',
        width: 200,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 150,
    },
    {
        field: 'state',
        headerName: 'State',
        width: 150,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
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
                    pageSize: 10,
                    },
                },
                }}
                pageSizeOptions={[10]}
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