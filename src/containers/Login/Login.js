import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Divider, Space, Typography, Row, Col } from 'antd';
import './Login.css'
import Register from "../Register/Register"

const Login = ({ setToken }) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [register, setRegister] = useState(false);

    const onFinish = (e) => {
        e.preventDefault();
        setUsername(e.target[0].value)
        setPassword(e.target[1].value)
        const token = loginUser({
            username,
            password
        });
        setToken(token);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function loginUser(data) {
        // return fetch('http://localhost:8080/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(credentials)
        // })
        //     .then(data => data.json())
        console.log(data.username)
        return { "token": data.username }
    }

    function registerClicked() {
        setRegister(!register)
    }

    if (register) {

        return (
            <Register setRegister={setRegister} ></Register>
        )
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={16}>
                            <Form
                                name="student-login-form"
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
                                <div style={{ textAlign: 'center' }}>Login as Student</div>
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
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Checkbox>Remember me</Checkbox>
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
                                name="teacher-login-form"
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
                                <div style={{ textAlign: 'center' }}>Login as Teacher</div>
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
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Checkbox>Remember me</Checkbox>
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
            <div style={{
                textAlign: 'center',
                // position: 'fixed', // to set at bottom of page, in middle
                // bottom: '0',
                // width: '100%',
            }} onClick={registerClicked}>
                Don't have an account? <a>Register</a>
            </div>
        </>
    )
}

export default Login