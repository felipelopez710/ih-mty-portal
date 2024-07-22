'use client'

import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation'

const columns = [
    { 
        field: 'client_id', 
        headerName: 'ID', 
        width: 90 
    },
    {
        field: 'client_name',
        headerName: 'Client Name',
        width: 150,
        editable: true,
    },
    {
        field: 'client_type',
        headerName: 'Type',
        width: 150,
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
        field: 'phone_number',
        headerName: 'Phone',
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

export default function ClientTable({rows}) {

    const router = useRouter();

    const handleRowClick = (params) => {
        console.log(`Row clicked ID: "${params.row.client_id}"`);
        router.push(`clients/${params.row.client_id}`)
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
                getRowId={(row) => row.client_id}
                onRowClick={handleRowClick}
                className='bg-white'
                isCellEditable={() => false}
            />
        </div>
    )
}