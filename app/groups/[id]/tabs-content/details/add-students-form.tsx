'use client'

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Button, Form, Input, Select, DatePicker, Spin } from "antd";

export default function AddStudentsForm({groupInformation, studentOptions, setUpdatedStudentList, setAddStudentsModal}:any){
    const supabase = createClient()

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    async function onFinish(e:any){
        setLoading(true)

        // Check if any student has been already inside the same group
        const { data: reenrollments, error: reenrollmentsError } = await supabase
        .from('student_per_group')
        .select()
        .eq('group_id', groupInformation.group_id)
        .in('student_id', e.selected_students)

        if(reenrollments && reenrollments.length <= 0){ // If no student has been in the group before, new records are created from scratch
            let recordsToAdd:any = []
            e.selected_students.map((student:any)=>{
                recordsToAdd.push({
                    student_id: student,
                    group_id: groupInformation.group_id
                })
            })
            const { data: createdRecords, error: recordsError } = await supabase
            .from('student_per_group')
            .insert(recordsToAdd)
            .select()

            setUpdatedStudentList(createdRecords)
            form.resetFields()
            setLoading(false)
            setAddStudentsModal(false)
        } 
        
        if (reenrollments && reenrollments.length > 0) { // If 1 or more students have been in the group before: 

            // 1. Makes two lists. One for the new students, and another one for the ones that has been in the group before.
            let reenrollmentList = []

            let reenrollmentsIds:any = []
            reenrollments.map((student:any) => {
                reenrollmentsIds.push(student.student_id)
            })

            const newEnrollments = e.selected_students.filter((student:any) => !reenrollmentsIds.includes(student))

            // 2. The list for the new students is used to create new records
            if(newEnrollments.length > 0){
                let recordsToAdd:any = []
                newEnrollments.map((student:any)=>{
                    recordsToAdd.push({
                        student_id: student,
                        group_id: groupInformation.group_id
                    })
                })
                const { data: createdRecords, error: recordsError } = await supabase
                .from('student_per_group')
                .insert(recordsToAdd)
                .select()
            }

            // 3. The list for the old students gets the status updated from 'inactive' to 'active'
            const { data: updatedRecords, error: updateError } = await supabase
            .from('student_per_group')
            .update({ status: 'active' })
            .eq('group_id', groupInformation.group_id)
            .in('student_id', reenrollmentsIds)
            .select()

            setUpdatedStudentList(updatedRecords)
            setLoading(false)
            form.resetFields()
            setAddStudentsModal(false)
        }
    }

    return(
        <div>
            <Form
                form={form}
                className="w-full"
                layout="vertical"
                size="large"
                onFinish={onFinish}
            >
                <div className="form-container w-full flex flex-col gap-5">

                    <div className="student-selector flex flex-col gap-2">
                        <div className='flex flex-col gap-1'>
                            <div className='text-base font-semibold'>Students</div>
                            <div>Choose the students to add to the group</div>
                        </div>

                        {/* Select students field */}
                        <Form.Item
                            className="flex-1" 
                            name="selected_students"
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                options={studentOptions}
                            />
                        </Form.Item>
                    </div>

                    <div className='action-buttons flex gap-2 items-center justify-end py-5 border-t border-gray-300'>
                    <Button>Cancel</Button>
                        <Button 
                            type="primary"
                            htmlType="submit"
                            disabled={loading}
                        >
                            {loading? <Spin /> : <span>Add students</span>}
                        </Button>
                    </div>

                </div>
            </Form>
        </div>
    )
}