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
const CreateCourse = ({setCount, count}) => {

    let BASE_URL = 'http://192.168.1.13:5000/courses'

    const callCreateCourse = (values) => {
        return new Promise((resolve) => {
            // setTimeout(() => {
            //     resolve(true);
            // }, 2000);
            axios.post(BASE_URL, {
                name: values.name,
                class: values.class,
                school: values.school,
                school_year: values.year,
                user_id: sessionStorage.getItem('id'),
            })
            setCount(count + 1)
            resolve(true)
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
                    await callCreateCourse(values);
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
                <ProFormDigit label="School Year" name="year" width="md" min={1} max={10000} placeholder="Year"/>
            </ModalForm>
        </>
    );
};

export default CreateCourse