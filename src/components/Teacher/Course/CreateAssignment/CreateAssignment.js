import React, { useState } from "react";
import { Col, Card, Upload, Typography, notification } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { FrownOutlined, SmileOutlined } from "@ant-design/icons"
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
    const [fileList, setFileList] = useState([])

    let BASE_URL = 'http://127.0.0.1:5000/assignments'

    const callCreateAssignment = (values) => {
        return new Promise((resolve) => {
            // setTimeout(() => {
            //     resolve(true);
            // }, 2000);
            let formData = new FormData()
            formData.append('file', fileList[0].originFileObj)
            formData.append('course_id', course.id)
            formData.append('due', moment(values.due, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD HH:mm:ss'))
            formData.append('instruction', values.instruction)
            formData.append('name', values.name)
            axios.post(BASE_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            }).then(function (response) {
                notification.open({
                    message: "Create assignment successfully",
                    icon: <SmileOutlined style={{ color: 'green' }} />,
                })
            }).catch(res => {
                notification.open({
                    message: 'Create assignment failed.',
                    description:
                        'Server error. Please try again!',
                    icon: <FrownOutlined style={{ color: 'red' }} />,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            })
            resolve(true)
        });
    };

    const props = {
        name: 'file',
        beforeUpload: () => false,
        fileList: fileList,

        onChange({ fileList }) {
            setFileList(fileList)
        },
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
            <Typography.Text>
                Attachment
            </Typography.Text><br /><br />
            <Upload {...props}>
                <Button icon={<UploadOutlined />} disabled={fileList.length > 0}>Click to Upload</Button>
            </Upload>
        </Modal>
    );
};

export default CreateAssignment