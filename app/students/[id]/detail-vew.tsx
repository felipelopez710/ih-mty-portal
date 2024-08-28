'use client'

import { useState } from "react"
import Link from "next/link";

/* import ClientInfo from "./client-info";
import FolioHistory from "./folio-history"; */
import StudentInfo from "./student-info";
import FolioHistory from "./folio-history";

import { Button } from "antd";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

export default function DetailView({ studentInfo }:any){
    return(
        <div className="w-full max-w-5xl flex flex-col gap-7">
            <div className='header-container flex justify-between items-center w-full'>
                <div className='text-xl font-semibold flex items-center'>
                    <Link href={"/students"}>
                        <ArrowBackRoundedIcon className='mr-2'/>
                    </Link>
                    {studentInfo.full_name}
                </div> 
                <Button 
                    type="primary" 
                    icon={<ExpandMoreOutlinedIcon />}
                    className="export-button"
                    iconPosition="end"
                >
                    Export
                </Button>
            </div>

            <div className="w-full flex gap-5">
                <div className="w-2/5">
                    <StudentInfo studentInfo={studentInfo}/>
                </div>
                <div className="w-3/5">
                    <FolioHistory/>
                </div>
            </div>
        </div>
    )
}