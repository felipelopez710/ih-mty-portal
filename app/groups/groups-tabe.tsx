'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'groupID', headerName: 'Group ID', width: 120 },
    { field: 'client', headerName: 'Client', width: 300 },
    { field: 'members', headerName: 'Students', width: 120 },
    { field: 'folios', headerName: 'Folios', width: 120 },
    { field: 'created', headerName: 'Created', width: 160 },
    { field: 'status', headerName: 'Status', width: 160 },
];

export default function GroupsTable({groups}:any) {
    return(
        <div className='w-full bg-white mt-7'>
            <DataGrid
                rows={groups}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(group) => group.groupID}
                checkboxSelection
            />
        </div>
    )
}