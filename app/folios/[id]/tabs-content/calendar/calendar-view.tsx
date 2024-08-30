'use client'

import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const localizer = dayjsLocalizer(dayjs)

export default function CalendarView({ listOfClasses }:any){

    /* listOfClasses !== undefined ?
    console.log('Formated date example: ', dayjs(`${listOfClasses[0].date} - ${listOfClasses[0].start_time}`, 'YYYY-MM-DD - h:mm A'))
    :
    '' */
    let events:any = []

    listOfClasses.map((clase:any)=>{
        events.push({
            start: dayjs(`${clase.date} - ${clase.start_time}`, 'YYYY-MM-DD - h:mm A').toDate(),
            end: dayjs(`${clase.date} - ${clase.end_time}`, 'YYYY-MM-DD - h:mm A').toDate(),
            title: clase.teacher
        })
    })

    return(
        <div className="calendar-container flex items-center justify-center w-full h-full border border-slate-100 pb-5">
            <Calendar
                events={events}
                localizer={localizer}
                className='w-full bg-wh'
            />
        </div>
    )
}