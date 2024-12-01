'use client'

import { createClient } from '@/utils/supabase/client';

import { DataGrid, GridColDef, GridColumnGroupingModel, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

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
        align: 'center',
        editable: true,
    },
    {
        field: 'module_listening',
        headerName: 'Listening',
        width: 85,
        headerAlign: 'center',
        align: 'center',
        editable: true,
    },
    {
        field: 'module_writing',
        headerName: 'Writing',
        width: 85,
        headerAlign: 'center',
        align: 'center',
        editable: true,
    },
    {
        field: 'module_speaking',
        headerName: 'Speaking',
        width: 85,
        headerAlign: 'center',
        align: 'center',
        editable: true,
    },
    {
        field: 'final_exam',
        headerName: 'Final Exam',
        width: 90,
        headerAlign: 'center',
        align: 'center',
        editable: true,
    },
    {
        field: 'average',
        headerName: 'Average',
        width: 90,
        headerAlign: 'center',
        align: 'center',
        editable: true,
    },
    {
        field: 'strength',
        headerName: 'Strength',
        width: 280,
        editable: true,
    },
    {
        field: 'area_of_opportunity',
        headerName: 'Area of opportunity',
        width: 280,
        editable: true,
    },
    {
        field: 'level_reading',
        headerName: 'Reading',
        width: 85,
        headerAlign: 'center',
        align: 'center',
        editable: true,
    },
    {
        field: 'level_listening',
        headerName: 'Listening',
        width: 85,
        headerAlign: 'center',
        align: 'center',
        editable: true,
    },
    {
        field: 'level_writing',
        headerName: 'Writing',
        width: 85,
        headerAlign: 'center',
        align: 'center',
        editable: true,
    },
    {
        field: 'level_speaking',
        headerName: 'Speaking',
        width: 85,
        headerAlign: 'center',
        align: 'center',
        editable: true,
    },
];

const columnGroupingModel: GridColumnGroupingModel = [
    {
        groupId: 'Module Grades',
        description: '',
        headerAlign: 'center',
        children: [
            { field: 'module_reading' },
            { field: 'module_listening' },
            { field: 'module_writing' },
            { field: 'module_speaking' },
        ],
    },
    {
        groupId: 'Level Average',
        description: '',
        headerAlign: 'center',
        children: [
            { field: 'level_reading' },
            { field: 'level_listening' },
            { field: 'level_writing' },
            { field: 'level_speaking' },
        ],
    },
];

export default function EvaluationsTable({activeFolioId, folioGrades, setFolioGrades}:any){
    const supabase = createClient()

    const handleProcessRowUpdate = async (newRow: any, oldRow: any) => {
        // Identificar qué celda fue editada
        const updatedField:any = Object.keys(newRow).find(
            (key) => newRow[key] !== oldRow[key]
        );

        const { data: updatedGrade, error: gradeError } = await supabase
        .from('grades')
        .update({[updatedField]: newRow[updatedField]})
        .eq('folio_id', activeFolioId)
        .eq('student_id', newRow.id)
        .select()

        if(updatedGrade){
            console.log('Actualización realizada: ', updatedGrade)
        }

        if(gradeError){
            console.log('Grade error: ', gradeError)
        }
    
        // Actualizar el estado con la nueva fila
        setFolioGrades((prevRows:any) =>
            prevRows.map((row:any) => (row.id === newRow.id ? newRow : row))
        );
    
        return newRow; // Necesario para reflejar cambios en la tabla
    };
    
    return(
        <div>
            {
                folioGrades.length > 0 ?
                <DataGrid
                    className='bg-white min-h-96'
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
                    columnGroupingModel={columnGroupingModel}
                    columnHeaderHeight={44}
                    processRowUpdate={handleProcessRowUpdate}
                />
                :
                <div className='w-full rounded-lg p-5 text-center font-medium border border-slate-200'>No evaluations for this folio</div>
            }
        </div>
    )
}