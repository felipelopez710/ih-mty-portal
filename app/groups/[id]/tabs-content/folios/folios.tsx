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

export default function FoliosTab({ folios }:any){
    const router = useRouter();

    console.log("Folios list from table component:", folios)

    const handleRowClick = (params:any) => {
        console.log(`Row clicked ID: "${params.row.folio_id}"`);
        router.push(`folios/${params.row.folio_id}`)
    };

    return(
        <div className='folios-container py-5'>
            {(folios !== null && folios !== undefined) &&
                <DataGrid
                    rows={folios}
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
                    getRowId={(row) => row.folio_id}
                    onRowClick={handleRowClick}
                    className='bg-white'
                    isCellEditable={() => false}
                />
            }
        </div>
    )
}