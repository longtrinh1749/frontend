import React, { useState } from "react";
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
const LeaveCourse = ({ course, leaveCourse }) => {

    let BASE_URL = 'http://192.168.1.9:5000/course'

    const callLeaveCourse = () => {
        return new Promise((resolve) => {
            // setTimeout(() => {
            //     resolve(true);
            // }, 2000);
            axios.delete(BASE_URL, {
                data: {
                    course_id: course.id,
                    user_id: sessionStorage.getItem('id'),
                }
            })
            resolve(true)
            setIsModalVisible(false);
            leaveCourse()
        });
    };
    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" danger={true} size='large' style={{ float: 'right' }} onClick={showModal}>
                Leave Course
            </Button>
            <Modal title="!" visible={isModalVisible} onOk={async () => {
                await callLeaveCourse()
                message.success('Success')
                return true
            }} onCancel={handleCancel}>
                <p>You sure wanna leave this course?</p>
            </Modal>
        </>
    );
};

export default LeaveCourse