'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function TeacherCalendar({teacherClasses}:any){

    let events:any = []

    teacherClasses.map((clase:any)=>{
        events.push({
            start: dayjs(`${clase.date} - ${clase.start_time}`, 'YYYY-MM-DD - h:mm A').toDate(),
            end: dayjs(`${clase.date} - ${clase.end_time}`, 'YYYY-MM-DD - h:mm A').toDate(),
            title: `Folio ${clase.folio_id}`
        })
    })

    console.log('Formated events: ', events)

    return(
        <div className='w-full'>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                initialView="dayGridMonth"
                height={"calc(100vh - 255px)"}
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