'use client'

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from "dayjs";

export default function Attendance({attendance, listOfClasses}:any){

    let groupedData:any = {}; // Aquí agruparemos los datos
    let sortedDates:any = undefined
    const [tableContent, setTableContent]:any = useState(undefined)
    const [tableColumns, setTableColumns]:any = useState(undefined)

    useEffect(() => {

        // Set the columns object
        let columnDefinition:any = [
            {
                field: 'student', 
                headerName: 'Student', 
                width: 200, 
                headerClassName: 'bg-white !sticky !left-0 !z-50 border-r border-b border-gray-100',
                cellClassName: 'bg-white !sticky !left-0 !z-50 border-r border-gray-100'
            }
        ]

        if(listOfClasses !== undefined && sortedDates === undefined){
            let listToSort:any = [...listOfClasses]
            sortedDates = listToSort.sort((a:any, b:any) => {
                if (a.class_id < b.class_id) {
                    return -1;
                }
            })
            console.log('Sorted classes:', sortedDates)

            sortedDates?.map((clase:any)=>{
                columnDefinition.push({
                    field: clase.date,
                    headerName: dayjs(clase.date).format('M/D/YYYY'),
                    width: 90,
                    headerAlign: 'center',
                    align: 'center',
                    renderCell: (params:any) => (
                        <span>
                            {
                                params.row.clase?.date === 'present' ?
                                <div>Present</div>
                                :
                                <div>-</div>
                            }
                        </span>
                    )
                })
            })
        }

        console.log('Column definition:', columnDefinition)
        
        const columns: GridColDef<any>[] = columnDefinition

        setTableColumns(columns)

        // Set the content object
        attendance?.forEach((record:any) => {
            if (!groupedData[record.students.full_name]) {
                groupedData[record.students.full_name] = {};
            }
            groupedData[record.students.full_name][record.classes.date] = record.attendance;
        });
    
        console.log(groupedData)
    
        // Convierte groupedData a un arreglo con el formato deseado
        const formattedArray:any = Object.keys(groupedData).map((student, index) => ({
            id: index,
            student: student, // Agrega el ID del estudiante
            ...groupedData[student] // Descompone las fechas y estados de asistencia
        }));
    
        setTableContent(formattedArray)
        console.log('Formated list', formattedArray);

    }, [attendance])

    return(
        <div className="w-full pt-5 flex items-center justify-center">
            {
                (tableColumns !== undefined && tableContent !== undefined) &&
                <DataGrid
                    rows={tableContent}
                    columns={tableColumns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 10,
                        },
                    },
                    }}
                    pageSizeOptions={[5, 10, 15, 20]}
                    disableRowSelectionOnClick
                    className='bg-white w-full'
                    isCellEditable={() => false}
                />
            }
        </div>
    )
}