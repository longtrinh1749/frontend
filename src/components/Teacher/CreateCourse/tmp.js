import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProForm, ProFormDigit } from '@ant-design/pro-form';
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
const CreateCourse = () => {

    let BASE_URL = 'http://192.168.1.12:5000/courses'

    const waitTime = (time = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };

    return (
        <>
            <ModalForm
                title="Create Course"
                trigger={<Button type="primary">Create Course</Button>}
                submitter={{
                    searchConfig: {
                        submitText: 'Submit',
                        resetText: 'Cancel',
                    },
                }}
                onFinish={async (values) => {
                    await waitTime(2000);
                    console.log(values);
                    message.success('Success');
                    return true;
                }}
            >
                <ProFormText
                    width="md"
                    name="name"
                    label="Name"
                    tooltip="Course Name"
                    placeholder="Course name"
                />

                <ProFormText width="md" name="class" label="Class" placeholder="Class" />
                <ProFormText width="md" name="school" label="School" placeholder="School" />
                <ProFormDigit label="School Year" name="year" width="md" min={1} max={10000} placeholder="Year" />
            </ModalForm>
        </>
    );
};

export default CreateCourse