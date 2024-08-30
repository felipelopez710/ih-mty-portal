'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation'

const columns = [
    { 
        field: 'student_id', 
        headerName: 'Matrícula', 
        width: 90 
    },
    {
        field: 'full_name',
        headerName: 'Name',
        minWidth: 160,
        flex: 1,
    },
    {
        field: 'email',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'mobile',
        headerName: 'Phone',
        width: 150,
    },
    {
        field: 'nationality',
        headerName: 'Nationality',
        width: 150,
    },
    {
        field: 'client_name',
        headerName: 'Client',
        minWidth: 150,
        flex: 1,
    },
];

export default function StudentsTable({rows}) {
    const router = useRouter();

    const handleRowClick = (params) => {
        console.log(`Row clicked ID: "${params.row.student_id}"`);
        router.push(`students/${params.row.student_id}`)
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
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                disableRowSelectionOnClick
                getRowId={(row) => row.student_id}
                onRowClick={handleRowClick}
                className='bg-white'
                isCellEditable={() => false}
            />
        </div>
    )
}