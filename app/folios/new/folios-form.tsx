'use client'

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const groups = [
    {
        group_id: 1,
        group_code: "1toCES",
        client: {
            client_id: 1,
            client_name: "FEMSA Oxxo",
            client_location: "Monterrey, N.L."
        }
    },
    {
        group_id: 2,
        group_code: "1to1Yvo",
        client: {
            client_id: 2,
            client_name: "Vitro Corporativo",
            client_location: "Monterrey, N.L."
        }
    },
    {
        group_id: 1,
        group_code: "IHMTNS2",
        client: {
            client_id: 3,
            client_name: "International House Monterrey",
            client_location: "Monterrey, N.L."
        }
    },
]

export default function FoliosForm(){

    const [group_id, setGroup_id] = useState<string | undefined>(undefined)
    const [correspondingClient, setCorrespondingClient] = useState("")
    const [client_location, setClient_location] = useState("")
    const [modality, setModality] = useState<string | undefined>(undefined)
    const [level, setLevel] = useState("")
    const [material, setMaterial] = useState("")
    const [coordinator, setCoordinator] = useState("")
    const [contratedHours, setcontratedHours] = useState("")
    const [amountToInvoice, setAmountToInvoice] = useState("")
    const [priceType, setPriceType] = useState("")
    const [generalComments, setGeneralComments] = useState("")
    const [academicComments, setAcademicComments] = useState("")
    const [materialComments, setMaterialComments] = useState("")

    return(
        <form className='w-full'>

            {/* Form header and submit button */}
            <div className='header-container flex justify-between items-center mb-6 w-full'>
                <div className='text-xl font-semibold flex items-center'>
                    <ArrowBackRoundedIcon className='mr-2'/>
                    New Folio 
                </div> 
                <button type="submit" className='px-4 py-2 bg-ih-blue text-white rounded-lg'>Save student</button>
            </div>

            {/* Form */}
            <div className='form-container flex gap-4'>

                <div className='left-section flex flex-col gap-4 w-2/3'>

                    {/* Folio Information Section */}
                    <div className='student-information flex flex-col gap-3 w-full bg-white rounded-lg p-5'>
                        <div className='text-lg font-semibold mb-2'>Student Information</div>

                        <div className='fields w-full flex flex-col gap-7'>
                            
                            <div className='field-row flex items-center gap-4'>
                                {/* Group ID field */}
                                <FormControl className='flex-1' size="small">
                                    <InputLabel id="group-selection">Group code</InputLabel>
                                    <Select
                                        labelId="group-selection"
                                        id="group"
                                        value={group_id}
                                        label="Group code"
                                        onChange={(event:SelectChangeEvent)=>{
                                            setGroup_id(event.target.value as string);
                                            let value = event.target.value as string
                                            let client
                                            let clientLocation
                                            for(let i=0; i<groups.length; i++){
                                                if(groups[i].group_id.toString() == event.target.value as string){
                                                    client = groups[i].client.client_name
                                                    clientLocation = groups[i].client.client_location
                                                    setCorrespondingClient(client)
                                                    setClient_location(clientLocation)
                                                }
                                            }
                                        }}
                                    >
                                        {groups.map((group:any)=>{
                                            return(
                                                <MenuItem value={group.group_id}>{group.group_code}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>

                                {/* Client field */}
                                <TextField
                                    size="small"
                                    className='flex-1'
                                    disabled
                                    id="outlined-disabled"
                                    label="Client"
                                    value={correspondingClient}
                                />
                            </div>

                            <div className='field-row flex items-center gap-4'>
                                {/* Client location */}
                                <TextField
                                    className='flex-1'
                                    disabled
                                    id="outlined-disabled"
                                    label="Client location"
                                    value={client_location}
                                    size="small"
                                />

                                {/* Modality */}
                                <FormControl className='flex-1' size="small">
                                    <InputLabel id="modality-label">Modality</InputLabel>
                                    <Select
                                        labelId="modality-label"
                                        id="modality"
                                        value={modality}
                                        label="Modality"
                                        onChange={(event:SelectChangeEvent)=>{
                                            setModality(event.target.value)
                                        }}
                                    >
                                        <MenuItem value={"In person"}>In person</MenuItem>
                                        <MenuItem value={"Online"}>Online</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className='field-row flex items-center gap-4'>
                                {/* Level */}
                                <FormControl className='flex-1' size="small">
                                    <InputLabel id="level-label">Level</InputLabel>
                                    <Select
                                        labelId="level-label"
                                        id="level"
                                        value={level}
                                        label="Level"
                                        onChange={(event:SelectChangeEvent)=>{
                                            setLevel(event.target.value)
                                        }}
                                    >
                                        <MenuItem value={"300 PRE-INTERMEDIATE"}>300 PRE-INTERMEDIATE</MenuItem>
                                        <MenuItem value={"301 PRE-INTERMEDIATE"}>301 PRE-INTERMEDIATE</MenuItem>
                                        <MenuItem value={"400 LOWER-INTERMEDIATE"}>400 LOWER-INTERMEDIATE</MenuItem>
                                        <MenuItem value={"401 LOWER-INTERMEDIATE"}>401 LOWER-INTERMEDIATE</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Material */}
                                <FormControl className='flex-1' size="small">
                                    <InputLabel id="material-label">Material</InputLabel>
                                    <Select
                                        labelId="material-label"
                                        id="material"
                                        value={material}
                                        label="Material"
                                        onChange={(event:SelectChangeEvent)=>{
                                            setMaterial(event.target.value)
                                        }}
                                    >
                                        <MenuItem value={"MATERIAL 1"}>MATERIAL 1</MenuItem>
                                        <MenuItem value={"MATERIAL 2"}>MATERIAL 2</MenuItem>
                                        <MenuItem value={"MATERIAL 3"}>MATERIAL 3</MenuItem>
                                        <MenuItem value={"MATERIAL 4"}>MATERIAL 4</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className='field-row flex items-center gap-4'>
                                {/* Coordinator */}
                                <FormControl className='flex-1' size="small">
                                    <InputLabel id="coordinator-label">Coordinator</InputLabel>
                                    <Select
                                        labelId="coordinator-label"
                                        id="coordinator"
                                        value={coordinator}
                                        label="Coordinator"
                                        onChange={(event:SelectChangeEvent)=>{
                                            setCoordinator(event.target.value)
                                        }}
                                    >
                                        <MenuItem value={"Alejandro Gorosabel"}>Alejandro Gorosabel</MenuItem>
                                        <MenuItem value={"Juan Martinez"}>Juan Martinez</MenuItem>
                                        <MenuItem value={"Rodrigo Montemayor"}>Rodrigo Montemayor</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Contracted hours */}
                                <TextField
                                    className='flex-1'
                                    id="outlined-disabled"
                                    label="Contracted hours"
                                    value={contratedHours}
                                    size="small"
                                    onChange={(e) => {
                                        setcontratedHours(e.target.value)
                                    }}
                                />
                            </div>

                            <div className='field-row flex items-center gap-4'>
                                {/* Amount to be Invoiced */}
                                <FormControl className='flex-1' size="small">
                                    <InputLabel htmlFor="outlined-adornment-amount">Amount to be Invoiced</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount to be Invoiced"
                                        value={amountToInvoice}
                                        onChange={(e) => {
                                            setAmountToInvoice(e.target.value)
                                        }}
                                    />
                                </FormControl>

                                {/* Price type */}
                                <FormControl className='flex-1' size="small">
                                    <InputLabel id="price-type-label">Price type</InputLabel>
                                    <Select
                                        labelId="price-type-label"
                                        id="price-type"
                                        value={priceType}
                                        label="Price type"
                                        onChange={(event:SelectChangeEvent)=>{
                                            setPriceType(event.target.value)
                                        }}
                                    >
                                        <MenuItem value={"Group"}>Group</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                        </div>
                    </div>

                </div>

                <div className='comments-section w-1/3 bg-white rounded-lg p-5 h-min flex flex-col gap-5'>

                    <div className='text-lg font-semibold'>Comments</div>

                    <div className='fields w-full flex flex-col gap-7'>
                        <TextField
                            size='small'
                            id="general-comments"
                            label="General comments"
                            value={generalComments}
                            onChange={(e) => {
                                setGeneralComments(e.target.value)
                            }}
                            multiline
                            rows={2}
                            maxRows={4}
                        />

                        <TextField
                            size='small'
                            id="academic-comments"
                            label="Academic"
                            value={academicComments}
                            onChange={(e) => {
                                setAcademicComments(e.target.value)
                            }}
                            multiline
                            rows={2}
                            maxRows={4}
                        />

                        <TextField
                            size='small'
                            id="material-comments"
                            label="Material Covered"
                            value={materialComments}
                            onChange={(e) => {
                                setMaterialComments(e.target.value)
                            }}
                            multiline
                            rows={2}
                            maxRows={4}
                        />
                    </div>

                </div>

            </div>

        </form>
    )
}