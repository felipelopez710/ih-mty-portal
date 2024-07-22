'use client'

import { useState } from "react"
import Link from "next/link";

import ClientInfo from "./client-info";
import FolioHistory from "./folio-history";

import { Button } from "antd";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

type FieldType = {
    client_name?: string;
    client_type?: string;
    rfc?: string;
    legal_representative?: string;
    email?: string;
    website?: string;
    phone_number?: string;
    phone_number_2?: string;
    phone_number_3?: string;
    address?: string,
    neighborhood?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    business_info?: string;
    notes?: string;
};

const initialValues = {
    client_name: "IENU - Instituto de Educación de las Naciones Unidas",
    client_type: "Company",
    rfc: "VIT00001",
    join_date: "2011-10-10",
    termination_date: null,
    legal_representative: "John Doe",
    email: "john@mail.com",
    website: "vitro.com",
    phone_number: "81818181",
    phone_number_2: "XXXXXXX",
    phone_number_3: "XXXXXXX",
    address: "15 Yemen Street",
    neighborhood: "Yemen",
    city: null,
    state: null,
    zip_code: null,
    business_info: "Lorem ipsum",
    notes: null
}


export default function DetailView({ clientInfo }: any){

    const [activeTab, setActiveTab] = useState("1")

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    const onFinish = (e:FieldType) => {
        console.log('Success:', e);
    };

    return(
        <div className="w-full max-w-5xl flex flex-col gap-7">
            <div className='header-container flex justify-between items-center w-full'>
                <div className='text-xl font-semibold flex items-center'>
                    <Link href={"/clients"}>
                        <ArrowBackRoundedIcon className='mr-2'/>
                    </Link>
                    {clientInfo.client_name}
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
                    <ClientInfo initialValues={initialValues} clientInfo={clientInfo}/>
                </div>
                <div className="w-3/5">
                    <FolioHistory/>
                </div>
            </div>
        </div>
    )
}