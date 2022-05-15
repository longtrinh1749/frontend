import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, Tabs, Switch } from 'antd';
import ManageStudentList from './EditCourseStudent';
import axios from 'axios';

const EditCourseForm = ({ courseInfo, visible, onEdit, onCancel, refresh, setRefresh }) => {
    let BASE_URL = 'http://192.168.1.10:5000/courses'

    const [form] = Form.useForm();

    const callUpdateCourse = (values) => {
        return new Promise((resolve) => {
            console.log('Values:', values)
            axios.put(BASE_URL, {
                id: courseInfo.id,
                class: values.class,
                school: values.school,
                year: values.year,
                active: values.active,
            })
            resolve(true)
        });
    }

    return (
        <Modal
            visible={visible}
            title="Manage Course"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(async (values) => {
                        form.resetFields();
                        onEdit(values);
                        await callUpdateCourse(values)
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab='Course Info' key='1'>
                    <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            name: courseInfo.name,
                            school: courseInfo.school,
                            class: courseInfo.class,
                            year: courseInfo.year,
                            active: courseInfo.active,
                        }}
                    >
                        {/* <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item> */}
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input type="textarea" readonly="readonly"/>
                        </Form.Item>
                        <Form.Item name="class" label="Class">
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item name="school" label="School">
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item name="year" label="Year (initial year of school year)"
                        // rules={[{ type: 'number' }]}
                        >
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item label="Active" name="active" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </Radio.Group>
                </Form.Item> */}
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab='Students List' key='2'>
                    <ManageStudentList courseInfo={courseInfo} refresh={refresh} visible={visible} setRefresh={setRefresh}></ManageStudentList>
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    );
};

export default EditCourseForm