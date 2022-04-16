import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Divider, Space, Typography, Row, Col } from 'antd';
import './Register.css'

const Register = ({setRegister}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const onFinish = (e) => {
        e.preventDefault();
        console.log('Success:', e)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function loginClicked() {
        setRegister(false)
    }
    
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={16}>
                            <Form
                                name="student-register-form"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onSubmitCapture={onFinish}
                                // onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <div style={{textAlign:'center'}}>Register as Student</div>
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Email"
                                    name="email"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Address"
                                    name="address"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Phone number"
                                    name="phone"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="School"
                                    name="school"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Class"
                                    name="class"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Role"
                                    name="role"
                                    hidden={true}
                                >
                                    <Input defaultValue={'ROLE.STUDENT'} disabled={true}/>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={16}>
                            <Form
                                name="teacher-register-form"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onSubmitCapture={onFinish}
                                // onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <div style={{textAlign:'center'}}>Register as Teacher</div>
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Email"
                                    name="email"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Address"
                                    name="address"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Phone number"
                                    name="phone"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="School"
                                    name="school"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Class"
                                    name="class"
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label="Role"
                                    name="role"
                                    hidden={true}
                                >
                                    <Input defaultValue={'ROLE.TEACHER'} disabled={true}/>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                </Col>
            </Row>
            <div style={{ textAlign: 'center' }} onClick={loginClicked}>
                Already have an account? <a>Login</a>
            </div>
        </>
    )
}

export default Register