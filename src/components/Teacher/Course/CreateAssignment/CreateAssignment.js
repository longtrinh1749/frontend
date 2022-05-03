import React, { useState } from "react";
import { Col, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProForm, ProFormDigit } from '@ant-design/pro-form';
import axios from "axios";
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Modal,
    message,
    Space

} from 'antd';
import moment from 'moment'

const CreateAssignment = ({ course, visible, onEdit, onCancel }) => {

    const [form] = Form.useForm();

    let BASE_URL = 'http://127.0.0.1:5000/assignments'

    const callCreateAssignment = (values) => {
        return new Promise((resolve) => {
            // setTimeout(() => {
            //     resolve(true);
            // }, 2000);
            axios.post(BASE_URL, {
                name: values.name,
                due: moment(values.due, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD HH:mm:ss'),
                instruction: values.instruction,
                course_id: course.id,
            })
            resolve(true)
        });
    };

    return (
        <Modal
            visible={visible}
            title="Create New Assignment"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(async (values) => {
                        form.resetFields();
                        onEdit(values);
                        await callCreateAssignment(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="due" label="Due">
                    <DatePicker />
                </Form.Item>
                <Form.Item name="instruction" label="Instruction">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateAssignment