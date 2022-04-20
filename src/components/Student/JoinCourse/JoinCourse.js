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
const JoinCourse = () => {

    let BASE_URL = 'http://192.168.1.13:5000/course'

    const callJoinCourse = (values) => {
        return new Promise((resolve) => {
            // setTimeout(() => {
            //     resolve(true);
            // }, 2000);
            axios.post(BASE_URL, {
                course_id: values.code,
                user_id: sessionStorage.getItem('id'),
            })
            resolve(true)
        });
    };

    return (
        <>
            <ModalForm
                title="Join Course"
                trigger={<Button type="primary">Join Course</Button>}
                submitter={{
                    searchConfig: {
                        submitText: 'Submit',
                        resetText: 'Cancel',
                    },
                }}
                onFinish={async (values) => {
                    await callJoinCourse(values);
                    console.log(values);
                    message.success('Success');
                    return true;
                }}
            >
                <ProFormDigit label="Course Code" name="code" width="md" min={1} max={10000000} placeholder="Code..."/>
            </ModalForm>
        </>
    );
};

export default JoinCourse