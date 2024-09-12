'use client'

import dayjs from "dayjs"
import { Tag, Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

type FieldType = {
    name?: string;
    owner?: string;
};

export default function GroupList({folioDetails, activeClass, classDate, onClose, modalOpen}:any){

    function onFinish(e:FieldType){
        console.log('Submited info: ', e)
    }

    const [form] = Form.useForm()

    return(
        <>
            <Drawer
                title="Register attendance"
                width={720}
                onClose={onClose}
                open={modalOpen}
                styles={{
                body: {
                    paddingBottom: 80,
                },
                }}
            >
                <Form
                    form={form} 
                    className="w-full"
                    layout='vertical'
                    onFinish={onFinish}
                    size="large"
                >
                    <div className="w-full flex flex-col gap-5">
                        <div className="list-header flex justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="text-base font-semibold">F. {folioDetails?.folio_id} | {folioDetails?.levels?.description}</div>
                                <div>
                                    {classDate !== undefined && `${dayjs(classDate.date).format('MMMM D, YYYY')} | ${classDate.start} - ${classDate.end}`}
                                </div>
                            </div>

                            <div>
                                <Button type="primary" htmlType="submit">
                                    Confirm
                                </Button>
                            </div>
                        </div>

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter user name' }]}
                        >
                            <Input placeholder="Please enter user name" />
                        </Form.Item>

                        <Form.Item
                            name="owner"
                            label="Owner"
                            rules={[{ required: true, message: 'Please select an owner' }]}
                        >
                            <Select placeholder="Please select an owner">
                                <Select.Option value="xiao">Xiaoxiao Fu</Select.Option>
                                <Select.Option value="mao">Maomao Zhou</Select.Option>
                            </Select>
                        </Form.Item>
                        
                    </div>
                </Form>
            </Drawer>
        </>
    )
}