'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation'

const columns = [
    { 
        field: 'folio_id', 
        headerName: 'Folio', 
        width: 90 
    },
    {
        field: 'group_code',
        headerName: 'Group',
        minWidth: 120,
        flex: 1,
    },
    {
        field: 'client_name',
        headerName: 'Client',
        minWidth: 160,
        flex: 1,
    },
    {
        field: 'client_location',
        headerName: 'Location',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'start_date',
        headerName: 'Start',
        width: 160,
    },
    {
        field: 'end_date',
        headerName: 'End',
        width: 160,
    },
];

export default function FoliosTable({rows}){

    const router = useRouter();

    const handleRowClick = (params) => {
        console.log(`Row clicked ID: "${params.row.folio_id}"`);
        router.push(`folios/${params.row.folio_id}`)
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
                getRowId={(row) => row.folio_id}
                onRowClick={handleRowClick}
                className='bg-white'
                isCellEditable={() => false}
            />
        </div>
    )
}