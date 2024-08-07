'use client'

import { useState } from 'react';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

import { useForm } from 'react-hook-form'
import { Autocomplete } from '@mui/material';

/* <----- Dummy data -----> */

const clientOptions = [
    {
        client_id: 1,
        client_name: "FEMSA Oxxo"
    },
    {
        client_id: 2,
        client_name: "Vitro Corporativo"
    },
    {
        client_id: 6,
        client_name: "Pepsico"
    },
]

const students:any = [
    {
        student_id: 1,
        student_name: "Pedro Montiel",
        avatar: "PM",
        client_id: 1
    },
    {
        student_id: 2,
        student_name: "Martín Alavarez",
        avatar: "MA",
        client_id: 1
    },
    {
        student_id: 3,
        student_name: "Gabriel López",
        avatar: "GL",
        client_id: 2
    },
    {
        student_id: 4,
        student_name: "Gonzalo Villegas",
        avatar: "GV",
        client_id: 2
    },
    {
        student_id: 5,
        student_name: "Mónica Zambrano",
        avatar: "MZ",
        client_id: 6
    },
    {
        student_id: 6,
        student_name: "Gabriela Martínez",
        avatar: "GM",
        client_id: 6
    },
]

/* <----- Dummy data -----> */

type Client = {
    client_id: number
    client_name: string
}

type Student = {
    student_id: number
    student_name: string
    avatar: string
    client_id: number
}

export default function NewGroupForm() {

    const [group_code, setGroup_code] = useState<string | null>("")
    const [client, setClient] = useState<Client | null>(null)
    const [studentsList, setStudentsList] = useState<any>()
    const [activeClient, setActiveClient] = useState(null)

    const handleSubmit = (e : any) => {
        e.preventDefault()
        console.log(studentsList)
    }
    
    return(
        <form className='w-full' onSubmit={handleSubmit} >

            <div className='form-container flex flex-col gap-5'>
            
                <div className='form-header w-full flex justify-between'>

                    <div className='form-title text-xl font-semibold flex items-center gap-2'>
                        <ArrowBackOutlinedIcon/>
                        <div>New Gruop</div>
                    </div>

                    <button type='submit' className='button flex items-center px-4 py-2 bg-ih-blue rounded-lg text-white font-medium'>
                        Save group
                    </button>

                </div>

                <div className='group-info w-full bg-white p-5 rounded-lg flex flex-col gap-2'>

                    <div className='text-lg font-semibold mb-5'>Group Information</div>

                    <div className='fields-container flex gap-5'>

                        <TextField 
                            className='flex-1' 
                            id="group_code" 
                            label="Group code" 
                            value={group_code}
                            onChange={(e) => {
                                setGroup_code(e.target.value)
                                console.log("New value:")
                                console.log(group_code)
                            }}
                        />

                        <Autocomplete
                            className='flex-1'
                            disablePortal
                            id="client_id"
                            options={clientOptions}
                            getOptionLabel={(option) => option.client_name}
                            onChange={(event : any, newValue: Client | null) => {
                                setClient(newValue)
                                if(newValue != null){
                                    let seletedClient = newValue.client_id
                                    console.log("Selected client:", seletedClient)
                                    let filteredStudents:any = []
                                    for(let i=0; i<students.length; i++){
                                        if(students[i].client_id == newValue.client_id){
                                            filteredStudents=[...filteredStudents, students[i]]
                                        }
                                    }
                                    setStudentsList(filteredStudents)
                                } 
                            }}
                            renderInput={(params) => <TextField {...params} label="Client" />}
                        />

                    </div>

                </div>

                {client !== null ?
                    <div className='select-students w-full bg-white p-5 rounded-lg flex flex-col gap-2'>

                        <div className='section-description flex flex-col gap-1'>
                            <div className='text-lg font-semibold'>Students</div>
                            <div className='mb-5'>Choose the students who will be in the group</div>
                        </div>

                        <div className='fields-container flex gap-5'>

                            <Autocomplete
                                multiple
                                className='flex-1'
                                disablePortal
                                id="students"
                                options={studentsList}
                                getOptionLabel={(student:any) => student.student_name}
                                renderInput={(params) => <TextField {...params} label="Select students" />}
                            />

                        </div>

                    </div>
                    :
                    <span></span>
                }

            </div>


        </form>
    )
}