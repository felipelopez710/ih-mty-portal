'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns = [
    { 
        field: 'folio_id', 
        headerName: 'Folio', 
        width: 90 
    },
    {
        field: 'group_code',
        headerName: 'Group',
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
        field: 'full_name',
        headerName: 'Teacher',
        width: 150,
        editable: true,
    },
    {
        field: 'start_date',
        headerName: 'Start',
        width: 150,
        editable: true,
    },
    {
        field: 'end_date',
        headerName: 'End',
        width: 150,
        editable: true,
    },
];

export default function FoliosTable({rows}){
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
                className='bg-white'
            />
        </div>
    )
}