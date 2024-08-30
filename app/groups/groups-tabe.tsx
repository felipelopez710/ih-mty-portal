'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs';

const columns: GridColDef[] = [
    { 
        field: 'group_id', 
        headerName: 'Group ID', 
        width: 120
    },
    { 
        field: 'group_code', 
        headerName: 'Group code', 
        width: 120
    },
    { 
        field: 'client_name', 
        headerName: 'Client', 
        width: 300 
    },
    { 
        field: 'members', 
        headerName: 'Students', 
        width: 120 
    },
    { 
        field: 'folios_count', 
        headerName: 'Folios', 
        width: 120 
    },
    { 
        field: 'created_at', 
        headerName: 'Created', 
        width: 160, 
        valueGetter: (value, row) => `${dayjs(row.created_at).format("MMMM D, YYYY") || ''}`
    },
    { 
        field: 'status', 
        headerName: 'Status', 
        width: 160 
    },
];

export default function GroupsTable({groups}:any) {

    const router = useRouter();

    const handleRowClick = (params:any) => {
        console.log(`Row clicked ID: "${params.row.group_id}"`);
        router.push(`groups/${params.row.group_id}`)
    };

    return(
        <div className='w-full bg-white mt-7'>
            <DataGrid
                rows={groups}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 10,
                    },
                },
                }}
                pageSizeOptions={[10, 15, 20]}
                checkboxSelection
                disableRowSelectionOnClick
                getRowId={(row) => row.group_id}
                onRowClick={handleRowClick}
                className='bg-white'
                isCellEditable={() => false}
            />
        </div>
    )
}