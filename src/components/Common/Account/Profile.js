import { Input, Modal, Tabs, Form, notification } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import './Profile.css'

const Profile = ({ modalVisible, setModalVisible }) => {

    const BASE_URL = 'http://192.168.1.9:5000/users'
    const BASE_ACCOUNT_URL = 'http://192.168.1.9:5000/users/account'

    const [user, setUser] = useState(false)

    const [formProfile] = Form.useForm();
    const [formPassword] = Form.useForm();
    let formKey = useRef(1)

    const callUpdateProfile = (values) => {
        return new Promise((resolve) => {
            console.log('Values:', values)
            axios.put(BASE_URL, {
                id: sessionStorage.getItem('id'),
                class: values.class,
                school: values.school,
                address: values.address,
                phone: values.phone,
                email: values.email,
            })
            resolve(true)
        });
    }

    const callUpdatePassword = (values) => {
        return new Promise((resolve) => {
            console.log('Values:', values)
            axios.put(BASE_ACCOUNT_URL, {
                id: sessionStorage.getItem('id'),
                old_password: values.oldPassword,
                new_password: values.newPassword,
            })
            resolve(true)
        })
    }

    useEffect(() => {
        let params = {
            id: sessionStorage.getItem('id')
        }
        axios.get(BASE_URL, { params }).then(res => {
            setUser(res.data)
            formProfile.setFieldsValue({
                name: res.data.name,
                class: res.data.class,
                phone: res.data.phone,
                school: res.data.school,
                email: res.data.email,
                address: res.data.address,
            })
        })
    }, [modalVisible])

    const modalOk = () => {
        if (formKey.current == 1) {
            console.log('Form key:', formKey)
            formProfile
                .validateFields()
                .then(async (values) => {
                    formProfile.resetFields();
                    await callUpdateProfile(values)
                    setModalVisible(false)
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                    notification.open({
                        message: 'Invalid form',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                });
        } else {
            console.log('Form key:', formKey)
            formPassword
                .validateFields()
                .then(async (values) => {
                    formPassword.resetFields();
                    await callUpdatePassword(values)
                    setModalVisible(false)
                })
                .catch((info) => {
                    console.log('Validate Failed:', info)
                    notification.open({
                        message: 'Invalid form',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                })
        }
    }

    const modalCancel = () => {
        setModalVisible(false)
    }

    return (
        <Modal title="Account" visible={modalVisible} onOk={modalOk} onCancel={modalCancel} id="profile-modal">
            <Tabs defaultActiveKey="1" onChange={(key) => formKey.current = key}>
                <Tabs.TabPane tab="Profile" key="1">
                    <Form
                        form={formProfile}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            name: user ? user.name : '',
                            phone: user ? user.phone : '',
                            class: user ? user.class : '',
                            school: user ? user.school : '',
                            email: user ? user.email : '',
                            address: user ? user.address : '',
                        }}
                    >
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name cannot be empty' }]} className="profile-form">
                            <Input type="textarea" className="profile-input" />
                        </Form.Item>
                        <Form.Item name="phone" label="Phone" className="profile-form">
                            <Input type="textarea" className="profile-input" />
                        </Form.Item>
                        <Form.Item name="class" label="Class" className="profile-form">
                            <Input type="textarea" className="profile-input" />
                        </Form.Item>
                        <Form.Item name="school" label="School" className="profile-form">
                            <Input type="textarea" className="profile-input" />
                        </Form.Item>
                        <Form.Item name="email" label="Email" className="profile-form">
                            <Input type="textarea" className="profile-input" />
                        </Form.Item>
                        <Form.Item name="address" label="Address" className="profile-form">
                            <Input type="textarea" className="profile-input" />
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Change password" key="2">
                    <Form
                        form={formPassword}
                        layout="vertical"
                        name="form_in_modal"
                    >
                        <Form.Item name="oldPassword" label="Old password" rules={[{ required: true, message: 'Please enter old password' }]} className="profile-form">
                            <Input type="password" className="profile-input" />
                        </Form.Item>
                        <Form.Item name="newPassword" label="New password" rules={[{ required: true, message: 'Please enter new password' }]} className="profile-form">
                            <Input type="password" className="profile-input" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirm new password"
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                            className="profile-form">
                            <Input type="password" className="profile-input" />
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    )
}

export default Profile