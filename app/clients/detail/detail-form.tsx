'use client'

import { useState } from 'react';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function DetailForm(){
    const [activeTab, setActiveTab] = useState("1")

    const [client_name, setClient_name] = useState("FEMSA Oxxo")
    const [client_type, setClient_type] = useState("Company")
    const [rfc, setRfc] = useState("OXXO0001")

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    return(
        <form className="w-full">
            <div className='header-container flex justify-between items-center mb-6 w-full'>
                <div className='text-xl font-semibold flex items-center'>
                    <ArrowBackRoundedIcon className='mr-2'/>
                    Client Detail
                </div> 
                <Button disabled type="submit" className='px-4 py-2 bg-neutral-200 normal-case text-white rounded-lg'>Save changes</Button>
            </div>

            <TabContext value={activeTab}>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab label="Details" value="1" />
                        <Tab label="Folio History" value="2" />
                    </TabList>
                </Box>

                {/* Folio Details */}
                <TabPanel value="1">

                    <div className='form-container flex gap-4'>

                        <div className='left-section flex flex-col gap-4 w-2/3'>
                            <div className='client-information flex flex-col gap-3 w-full bg-white rounded-lg p-5'>
                                <div className='text-lg font-semibold mb-5'>Client Information</div>
                                <div className='fields w-full flex flex-col gap-7'>
                                    <div className='field-row flex items-center gap-4'>
                                        {/* Client name */}
                                        <TextField
                                            className='flex-1'
                                            id="client-name"
                                            label="Client name"
                                            value={client_name}
                                            onChange={(e) => {
                                                setClient_name(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className='field-row flex items-center gap-4'>
                                        {/* Client type */}
                                        <FormControl className='flex-1'>
                                            <InputLabel id="client-type">Client type</InputLabel>
                                            <Select
                                                labelId="client-type-label"
                                                id="client-type"
                                                value={client_type}
                                                label="Client type"
                                                onChange={(event:SelectChangeEvent)=>{
                                                    setClient_type(event.target.value)
                                                }}
                                            >
                                                <MenuItem value={"Company"}>Company</MenuItem>
                                                <MenuItem value={"School"}>School</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {/* RFC */}
                                        <TextField
                                            className='flex-1'
                                            id="rfc"
                                            label="RFC"
                                            value={rfc}
                                            onChange={(e) => {
                                                setRfc(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='contact-information w-full bg-white rounded-lg p-5'>
                                <div className='text-lg font-semibold mb-5'>Contact Information</div>
                            </div>
                        </div>

                        <div className='comments-section w-1/3 bg-white rounded-lg p-5 h-min flex flex-col gap-5'>
                            <div className='text-lg font-semibold mb-5'>Comments</div>
                        </div>
                    </div>

                </TabPanel>

                {/* Folio history */}
                <TabPanel value="2">Folio History</TabPanel>

            </TabContext>
        </form>
    )
}