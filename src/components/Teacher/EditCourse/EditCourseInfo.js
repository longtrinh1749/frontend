import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, Tabs } from 'antd';

const EditCourseForm = ({ courseInfo, visible, onEdit, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
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
                <Tabs.TabPane tab='Tab 1' key='1'>
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
                        <Form.Item name="year" label="Year (initial year of school year)" rules={[{ type: 'number' }]}>
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
                <Tabs.TabPane tab='Tab 2' key='2'>
                    Content of Tab Pane 2
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    );
};

export default EditCourseForm