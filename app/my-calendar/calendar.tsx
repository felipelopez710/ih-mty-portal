import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const localizer = dayjsLocalizer(dayjs)

export default function PersonalCalendar({ listOfClasses }:any){

    let events:any = []

    listOfClasses.map((clase:any)=>{
        events.push({
            start: dayjs(`${clase.date} - ${clase.start_time}`, 'YYYY-MM-DD - h:mm A').toDate(),
            end: dayjs(`${clase.date} - ${clase.end_time}`, 'YYYY-MM-DD - h:mm A').toDate(),
            title: `Folio ${clase.folio_id}`
        })
    })

    return(
        <Calendar
            events={events}
            localizer={localizer}
            className='flex-1 w-full'
        />
    )
}