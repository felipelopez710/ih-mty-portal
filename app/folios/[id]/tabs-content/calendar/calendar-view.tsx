'use client'

import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'

dayjs.extend(customParseFormat);

const localizer = dayjsLocalizer(dayjs)

export default function CalendarView({ listOfClasses, activeFolio }:any){

    /* listOfClasses !== undefined ?
    console.log('Formated date example: ', dayjs(`${listOfClasses[0].date} - ${listOfClasses[0].start_time}`, 'YYYY-MM-DD - h:mm A'))
    :
    '' */
    let events:any = []

    listOfClasses.map((clase:any)=>{
        events.push({
            start: dayjs(`${clase.date} - ${clase.start_time}`, 'YYYY-MM-DD - h:mm A').toDate(),
            end: dayjs(`${clase.date} - ${clase.end_time}`, 'YYYY-MM-DD - h:mm A').toDate(),
            title: clase.teachers.full_name
        })
    })

    return(
        <div className="calendar-container w-full h-full border border-slate-100 pb-5">
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                initialView="dayGridMonth"
                height={"100%"}
                validRange={{
                    start: activeFolio.start_date,
                    end: activeFolio.end_date
                }}
                headerToolbar={{
                    start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay' // will normally be on the right. if RTL, will be on the left
                }}
                events={events}
            />
        </div>
    )
}