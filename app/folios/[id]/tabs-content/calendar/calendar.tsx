'use client'

import { useState } from "react";
import FolioFrequency from "./folio-frequency"
import CalendarView from "./calendar-view";
import ListView from "./list-view";
import { Segmented } from 'antd';

const classesList = [
    {
        class_id: "1",
        date: "2024-08-05",
        start: "2024-08-05 18:00:00+00",
        end: "2024-08-05 20:00:00+00",
        duration: "2",
        teacher_id: "1",
        teacher_name: "John Doe",
        folio_id: "1",
    },
    {
        class_id: "2",
        date: "2024-08-07",
        start: "2024-08-07 18:00:00+00",
        end: "2024-08-07 20:00:00+00",
        duration: "2",
        teacher_id: "1",
        teacher_name: "John Doe",
        folio_id: "1",
    },
    {
        class_id: "3",
        date: "2024-08-09",
        start: "2024-08-09 18:00:00+00",
        end: "2024-08-09 20:00:00+00",
        duration: "2",
        teacher_id: "2",
        teacher_name: "Jane Doe",
        folio_id: "1",
    },
    {
        class_id: "4",
        date: "2024-08-12",
        start: "2024-08-12 18:00:00+00",
        end: "2024-08-12 20:00:00+00",
        duration: "2",
        teacher_id: "1",
        teacher_name: "John Doe",
        folio_id: "1",
    },
    {
        class_id: "5",
        date: "2024-08-14",
        start: "2024-08-14 18:00:00+00",
        end: "2024-08-14 20:00:00+00",
        duration: "2",
        teacher_id: "1",
        teacher_name: "John Doe",
        folio_id: "1",
    },
    {
        class_id: "6",
        date: "2024-08-16",
        start: "2024-08-16 18:00:00+00",
        end: "2024-08-16 20:00:00+00",
        duration: "2",
        teacher_id: "2",
        teacher_name: "Jane Doe",
        folio_id: "1",
    },
    {
        class_id: "7",
        date: "2024-08-19",
        start: "2024-08-19 18:00:00+00",
        end: "2024-08-19 20:00:00+00",
        duration: "2",
        teacher_id: "1",
        teacher_name: "John Doe",
        folio_id: "1",
    },
    {
        class_id: "8",
        date: "2024-08-21",
        start: "2024-08-21 18:00:00+00",
        end: "2024-08-21 20:00:00+00",
        duration: "2",
        teacher_id: "1",
        teacher_name: "John Doe",
        folio_id: "1",
    },
    {
        class_id: "9",
        date: "2024-08-23",
        start: "2024-08-23 18:00:00+00",
        end: "2024-08-23 20:00:00+00",
        duration: "2",
        teacher_id: "2",
        teacher_name: "Jane Doe",
        folio_id: "1",
    },
]

export default function CalendarTab({ folioFrequency, listOfClasses }:any){

    const [activeView, setActiveView] = useState("List")

    return(
        <div className="w-full h-full">
            <div className="w-full h-full flex gap-5">

                <div className="w-1/4 h-full">
                    <FolioFrequency folioFrequency={folioFrequency} />
                </div>

                <div className="h-full flex flex-col gap-4 w-3/4 pt-5">

                    <div className="flex items-center justify-between">

                        <div className="text-lg font-semibold">Classes</div>

                        <Segmented<string>
                            options={['List', 'Calendar']}
                            onChange={(value) => {
                                setActiveView(value)
                            }}
                        />

                    </div>

                    <div className="w-full h-full">

                        {
                            activeView == 'List'? 
                            <ListView classesList={classesList} listOfClasses={listOfClasses} />
                            :
                            <CalendarView listOfClasses={listOfClasses} />
                        }
                        
                    </div>

                </div>

            </div>
        </div>
    )
}