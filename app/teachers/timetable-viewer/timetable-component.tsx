'use client'

import dayjs from "dayjs"
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from 'dayjs/plugin/duration';
import { useState } from "react";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

export default function Timetable({frequencyLines, totalWeeklyHours}:any){

    function getWeeklyHours(start:any, end:any, frequency:any){
        const frequencyArray = JSON.parse(frequency)
        const frequencyCount:any = frequencyArray.length

        // Parse hours into dayjs objects
        const startTime = dayjs(start, 'h:mm A')
        const endTime = dayjs(end, 'h:mm A')

        const diff = endTime.diff(startTime)

        const totalDuration:any = dayjs.duration(diff)

        let weeklyHours = ((totalDuration * frequencyCount)/3600000)

        return(weeklyHours)
    }

    return(
        <div className="w-full rounded-lg bg-white border border-gray-200 overflow-hidden">

            <div className="table-header px-4 py-2 border-b gap-3 border-gray-200 flex items-center">
                <div className="text-sm flex-1 min-w-44">Folio</div>
                <div className="text-sm w-24">Start date</div>
                <div className="text-sm w-24">End date</div>
                <div className="text-sm w-36">Duration</div>
                <div className="text-sm flex-1 min-w-40">Client</div>
                <div className="text-sm w-6 flex justify-center">Mon</div>
                <div className="text-sm w-6 flex justify-center">Tue</div>
                <div className="text-sm w-6 flex justify-center">Wed</div>
                <div className="text-sm w-6 flex justify-center">Thu</div>
                <div className="text-sm w-6 flex justify-center">Fri</div>
                <div className="text-sm w-6 flex justify-center">Sat</div>
                <div className="text-sm w-12 flex justify-center text-center">Weekly hours</div>
            </div>

            <div className="table-body flex flex-col">
                {
                    frequencyLines.map((frequency:any, index:any)=>(
                        <div key={index} className={`px-4 py-3 flex gap-3 items-center ${index !== (frequencyLines.length-1) && 'border-b'} border-gray-200`}>
                            <div className="flex flex-col flex-1 min-w-44">
                                <div className="font-medium">Folio {frequency.folio_id} | Group {frequency.folios.groups.group_code}</div>
                                <div className="text-xs text-gray-500">{frequency.folios.levels.level}</div>
                            </div>
                            <div className="w-24">
                                {dayjs(frequency.folios.start_date).format('DD/MM/YYYY')}
                            </div>
                            <div className="w-24">
                                {dayjs(frequency.folios.end_date).format('DD/MM/YYYY')}
                            </div>
                            <div className="w-36">
                                {frequency.start_time} - {frequency.end_time}
                            </div>
                            <div className="flex-1 min-w-40">
                               {frequency.folios.client_name}
                            </div>
                            <div className="w-6 flex justify-center">
                                {
                                    frequency.frequency.includes('Monday') ?
                                    <CheckBoxIcon className="text-base text-ih-blue"/>
                                    :
                                    <CheckBoxOutlineBlankIcon className="text-base text-gray-400"/>
                                }
                            </div>
                            <div className="w-6 flex justify-center">
                                {
                                    frequency.frequency.includes('Tuesday') ?
                                    <CheckBoxIcon className="text-base text-ih-blue"/>
                                    :
                                    <CheckBoxOutlineBlankIcon className="text-base text-gray-400"/>
                                }
                            </div>
                            <div className="w-6 flex justify-center">
                                {
                                    frequency.frequency.includes('Wednesday') ?
                                    <CheckBoxIcon className="text-base text-ih-blue"/>
                                    :
                                    <CheckBoxOutlineBlankIcon className="text-base text-gray-400"/>
                                }
                            </div>
                            <div className="w-6 flex justify-center">
                                {
                                    frequency.frequency.includes('Thursday') ?
                                    <CheckBoxIcon className="text-base text-ih-blue"/>
                                    :
                                    <CheckBoxOutlineBlankIcon className="text-base text-gray-400"/>
                                }
                            </div>
                            <div className="w-6 flex justify-center">
                                {
                                    frequency.frequency.includes('Friday') ?
                                    <CheckBoxIcon className="text-base text-ih-blue"/>
                                    :
                                    <CheckBoxOutlineBlankIcon className="text-base text-gray-400"/>
                                }
                            </div>
                            <div className="w-6 flex justify-center">
                                {
                                    frequency.frequency.includes('Saturday') ?
                                    <CheckBoxIcon className="text-base text-ih-blue"/>
                                    :
                                    <CheckBoxOutlineBlankIcon className="text-base text-gray-400"/>
                                }
                            </div>
                            <div className="w-12 flex justify-center text-center">
                                {getWeeklyHours(frequency.start_time, frequency.end_time, frequency.frequency)}
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="w-full px-3 py-3 border-t border-gray-200 flex justify-end">
                <div className="px-3 py-2 bg-gray-100 rounded text-slate-500">
                    Total weekly hours: <span className="font-semibold text-base text-ih-blue">{totalWeeklyHours}</span>
                </div>
            </div>

        </div>
    )
}