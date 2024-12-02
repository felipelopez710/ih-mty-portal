'use client'

import { createClient } from "@/utils/supabase/client"

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import AddStudentsForm from "./add-students-form";
import { Form, Button, Input, Select, DatePicker, Spin, Modal, Drawer } from "antd";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useState, useEffect } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';

type FieldType = {
    group_code?: string;
    client_id?: string;
    selected_students?: any;
    group_id?: any;
}

const studentOptions = [
    {
        label: "Student 1",
        value: "Student 1",
    },
    {
        label: "Student 2",
        value: "Student 2",
    },
    {
        label: "Student 3",
        value: "Student 3",
    },
]

export default function DetailsTab({groupInformation, groupStudents, setGroupStudents, folios}:any){
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [updatedStudentList, setUpdatedStudentList] = useState(undefined) // Trigger to refresh groupStudents

    const [clientStudents, setClientStudents]:any = useState(undefined) // stores the complete list of availble students for this client
    const [filteredList, setFilteredList]:any = useState(undefined)

    // Confirm Removal modal controlers

    const [studentToRemove, setStudentToRemove]:any = useState(undefined)
    const [confirmRemoval, setConfirmRemoval] = useState(false)

    const openConfirmRemoval = (student:any) => () => {
        // console.log(student)
        setStudentToRemove(student)
        setConfirmRemoval(true)
    }

    const closeConfirmRemoval = () => {
        setConfirmRemoval(false)
    }

    async function removeStudent () {
        const { data: studentRemoval, error: removalError } = await supabase
        .from('student_per_group')
        .update({ status: 'inactive' })
        .eq('id', studentToRemove.id)
        .select()

        if(studentRemoval){
            // console.log('Student removed: ', studentRemoval)
            const updatedList = groupStudents.filter((obj:any) => obj.id !== studentToRemove.id)
            setGroupStudents(updatedList)
        }

        setStudentToRemove(undefined)
        setConfirmRemoval(false)
    }

    // Add students controlers
    const [addStudentsModal, setAddStudentsModal] = useState(false)

    const openAddStudentsModal = async() => {
        setAddStudentsModal(true) // Opens the modal
        if(clientStudents == undefined) { // Checks if a list of students already exists. In case not, gets the list
            // console.log('Creating student list')
            if(groupInformation.client_id == null || groupInformation.client_id == 1){ // In case the client is IH, the complete student list is fetched
                const { data:students, error:studentsError } = await supabase
                .from('students')
                .select('*, clients(client_id, client_name)')
                let options:any = []
                students?.map((student:any) =>{
                    options.push({
                        label: `${student.full_name} - ${student.client_id !== null ? student.clients.client_name : 'No asigned client' }`,
                        value: student.student_id
                    })
                })
                options.sort((a:any, b:any) => a.label.localeCompare(b.label));
                // console.log('Students for this client;', options)
                setClientStudents(options)
                const groupIDs = new Set(groupStudents.map((student:any) => student.student_id))
                // console.log('groupsIDs:', groupIDs)
                const newList = options.filter((student:any) => !groupIDs.has(student.value))
                // console.log('Students after filter:', newList)
                setFilteredList(newList)
            } else { // In case the client is other than IH, gets the students form the client + the students from IH 
                const { data:students, error:studentsError } = await supabase
                .from('students')
                .select('*, clients(client_id, client_name)')
                .in('client_id', [groupInformation.client_id, 1])
                let options:any = []
                students?.map((student:any) =>{
                    options.push({
                        label: `${student.full_name} - ${student.client_id !== null ? student.clients.client_name : 'No asigned client' }`,
                        value: student.student_id.toString()
                    })
                })
                options.sort((a:any, b:any) => a.label.localeCompare(b.label));
                // console.log('Students for this client;', options)
                setClientStudents(options)
                const groupIDs = new Set(groupStudents.map((student:any) => student.student_id))
                // console.log('groupsIDs:', groupIDs)
                const newList = options.filter((student:any) => !groupIDs.has(student.value))
                // console.log('Students after filter:', newList)
                setFilteredList(newList)
            }
        } else {
            const groupIDs = new Set(groupStudents.map((student:any) => student.student_id))
            // console.log('groupsIDs:', groupIDs)
            const newList = clientStudents.filter((student:any) => !groupIDs.has(student.value))
            // console.log('Students after filter:', newList)
            setFilteredList(newList)
        }
    }

    const onCloseAddStudent = () => {
        setAddStudentsModal(false)
    }

    async function updateList(){
        const { data: studentList, error: studentsError } = await supabase.from('student_per_group').select('*, students(student_id, full_name, email, clients(client_id, client_name))').eq('group_id', groupInformation.group_id).eq('status', 'active')
        if (studentList){
            setGroupStudents(studentList)
        }
    }

    useEffect(() => {
        if (updatedStudentList !== undefined){
            updateList()
        }
    }, [updatedStudentList])
    

    return(
        <div className="details-container w-full flex items-center justify-center py-5">
            <div className="w-full max-w-4xl">

                <div className="information-container w-full flex gap-5">
                    <div className="group-info-container flex-1 max-w-96">
                        <div className="w-full bg-white rounded-xl p-5 border border-gray-200 flex flex-col gap-5">
                            <div className="text-base font-semibold">Group information</div>
                            <div className="information-lines flex flex-col gap-2">
                                <div className="info-line w-full flex gap-2">
                                    <div className="w-1/3 text-slate-400">Group code</div>
                                    <div className="w-2/3">{groupInformation?.group_code}</div>
                                </div>
                                <div className="info-line w-full flex gap-2">
                                    <div className="w-1/3 text-slate-400">Client</div>
                                    <div className="w-2/3">{groupInformation?.clients?.client_name}</div>
                                </div>
                                <div className="info-line w-full flex gap-2">
                                    <div className="w-1/3 text-slate-400">Folios</div>
                                    <div className="w-2/3">{folios?.length}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="students flex-1">
                        <div className="w-full bg-white rounded-xl p-5 border border-gray-200 flex flex-col gap-5">
                            <div className="w-full flex items-center justify-between">
                                <div className="text-base font-semibold">Students</div>
                                <div 
                                    className="flex items-center gap-1 text-ih-blue font-semibold cursor-pointer"
                                    onClick={openAddStudentsModal}
                                >
                                    <AddIcon/>
                                    <div>Add</div>
                                </div>
                            </div>
                            <div className="students-section w-full flex flex-col gap-2">
                                {
                                    groupStudents?.map((student:any)=>{
                                        if(student.status !== 'inactive'){
                                            return (
                                                <div key={student.id} className="w-full border border-gray-200 px-4 py-3 rounded-xl flex gap-3 items-center">
                                                    <div className="avatar">
                                                        <AccountCircleOutlinedIcon/>
                                                    </div>
                                                    <div className="flex-1 flex flex-col">
                                                        <div className="font-semibold">{student.students.full_name}</div>
                                                        <div className="text-slate-500">{student.students.clients?.client_name}</div>
                                                    </div>
                                                    <div className="remove text-red-600 cursor-pointer" onClick={openConfirmRemoval(student)}>
                                                        <RemoveCircleOutlineIcon/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Remove student modal */}
            <Modal
                title="Delete level"
                centered
                open={confirmRemoval}
                footer={[
                    <Button key="cancel" onClick={closeConfirmRemoval}>
                        Cancel
                    </Button>,
                    <Button key="delete" danger disabled={loading} onClick={removeStudent}>
                        Yes, remove student
                    </Button>
                ]}
            >
                <p>Are you sure?</p>
            </Modal>

            <Drawer
                title={'Add students'}
                width={500}
                open={addStudentsModal}
                onClose={onCloseAddStudent}
            >
                <AddStudentsForm groupInformation={groupInformation} studentOptions={filteredList} setUpdatedStudentList={setUpdatedStudentList} setAddStudentsModal={setAddStudentsModal} />
            </Drawer>
        </div>
    )
}