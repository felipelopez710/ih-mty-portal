import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { 
        field: 'id', 
        headerName: 'Student', 
        width: 85 
    },
    {
        field: 'student',
        headerName: 'Name',
        width: 240,
    },
    {
        field: 'module_reading',
        headerName: 'Reading',
        width: 85,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'module_listening',
        headerName: 'Listening',
        width: 85,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'module_writing',
        headerName: 'Writing',
        width: 85,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'module_speaking',
        headerName: 'Speaking',
        width: 85,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'final_exam',
        headerName: 'Final Exam',
        width: 90,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'average',
        headerName: 'Average',
        width: 90,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'strength',
        headerName: 'Strength',
        width: 280,
    },
    {
        field: 'area_of_opportunity',
        headerName: 'Area of opportunity',
        width: 280,
    },
    {
        field: 'level_reading',
        headerName: 'Reading',
        width: 85,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'level_listening',
        headerName: 'Listening',
        width: 85,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'level_writing',
        headerName: 'Writing',
        width: 85,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'level_speaking',
        headerName: 'Speaking',
        width: 85,
        headerAlign: 'center',
        align: 'center'
    },
];

export default function GradesTable({folioGrades}:any){
    return(
        <DataGrid
            className='bg-white'
            rows={folioGrades}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 25,
                },
            },
            }}
            pageSizeOptions={[25, 50, 100]}
            disableRowSelectionOnClick
        />
    )
}