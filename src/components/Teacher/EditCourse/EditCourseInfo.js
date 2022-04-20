import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, Tabs } from 'antd';
import ManageStudentList from './EditCourseStudent';

const EditCourseForm = ({ courseInfo, visible, onEdit, onCancel }) => {
    const [form] = Form.useForm();
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
                    .then((values) => {
                        form.resetFields();
                        onEdit(values);
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
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item name="class" label="Class">
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item name="school" label="SChool">
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item name="year" label="Year (initial year of school year)" 
                            // rules={[{ type: 'number' }]}
                        >
                            <Input type="textarea" />
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
                    <ManageStudentList courseInfo={courseInfo}></ManageStudentList>
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    );
};

export default EditCourseForm