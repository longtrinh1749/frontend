import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, Tabs, Switch } from 'antd';
import axios from 'axios';

const EditAssignment = ({ assignment, visible, onEdit, onCancel, refresh, setRefresh }) => {
    let BASE_URL = 'http://192.168.1.12:5000/assignments'

    const [form] = Form.useForm();

    const callUpdateCourse = (values) => {
        return new Promise((resolve) => {
            console.log('Values:', values)
            axios.put(BASE_URL, {
                id: assignment.id,
                name: values.name,
                due: values.due,
                instruction: values.instruction,
            }, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            resolve(true)
        });
    }

    return (
        <Modal
            visible={visible}
            title="Manage Assignment"
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
                    .then(() => setRefresh(!refresh))
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    name: assignment.name,
                    instruction: assignment.instruction,
                    due: assignment.due
                }}
            >
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="instruction" label="Instruction">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="due" label="Due">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditAssignment