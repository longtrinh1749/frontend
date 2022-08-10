import React, { useState, useRef } from "react";
import { Form, Input, Button, Checkbox, Divider, Space, Typography, Row, Col, notification } from 'antd';
// import './Login.css'
import './OtherLogin.css'
import Register from "../Register/Register"
import PropTypes from 'prop-types'
import axios from "axios";

const Login = ({ setToken }) => {

    const BASE_URL = 'http://127.0.0.1:5000'

    // const [username, setUsername] = useState();
    // const [password, setPassword] = useState();
    // const [role, setRole] = useState()
    let username = useRef()
    let password = useRef()
    let role = useRef()
    const [register, setRegister] = useState(false);

    const onFinish = (e) => {
        e.preventDefault();
        console.log(e)
        // setUsername(e.target[0].value)
        // setPassword(e.target[1].value)
        // setRole(e.target[2].value)
        username.current = e.target[0].value
        password.current = e.target[1].value
        if (e.target[2].checked === true) {
            role.current = e.target[2].value
        } else {
            role.current = e.target[3].value
        }
        let token = loginUser({
            'username': username.current,
            'password': password.current,
            'role': role.current
        });
        token.then(res => setToken(res.username, res.role, res.id, res.token))
        refreshToken(3, JSON.parse(sessionStorage.getItem('token')))
    }

    const refreshToken = (expired_in, jwt) => {
        setTimeout(() => {
            console.log('Call refresh token')
            if (JSON.parse(sessionStorage.getItem('token')) != null) {
                const token = callRefreshToken(jwt);
                token.then(res => setToken(res.username, res.role, res.id, res.token));
                refreshToken(expired_in)
            }
        }, 7 * 3600 * 1000)
    }

    const callRefreshToken = async (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            key: "value"
        };

        let res = await axios.post(
            BASE_URL + '/users/token',
            bodyParameters, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        }
        ).then(res => {
            console.log(res)
        }).catch(console.log);

        return {
            'token': res.data.token,
            'role': res.data.role,
            'username': 'abc',
            'id': 1,
            'expired_in': 7
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    async function loginUser(data) {
        try {
            let res = await axios.get(BASE_URL + '/users/token', {
                auth: {
                    username: data.username,
                    password: data.password
                }
            })
            notification.open({
                message: 'Login successfully',
                description:
                    'Welcome to ASIMO.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            return {
                'token': res.data.token,
                'role': res.data.role,
                'username': res.data.username,
                'id': 1,
                'expired_in': 7
            }
        } catch (err) {
            notification.open({
                message: 'Login failed.',
                description:
                    'Wrong username or password.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }
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
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <img src="img/logo/logo1.png" id="icon" alt="Asimo Grading Online" />
                </div>
                <form className="login-form" onSubmit={onFinish}>
                    <input type="text" id="login" className="fadeIn first" name="login" placeholder="Username" />
                    <input type="password" id="password" className="fadeIn second" name="login" placeholder="Password" /><br />
                    <input type="radio" id="roleStudent" name="role" value="ROLE.STUDENT" hidden /><label htmlFor="roleStudent" hidden>Login as Student</label><br />
                    <input type="radio" id="roleTeacher" name="role" value="ROLE.TEACHER" defaultChecked="checked" hidden /><label htmlFor="roleTeacher" hidden>Login as Teacher</label><br />
                    <input type="submit" className="fadeIn third" value="Log In" />
                </form>
                <div id="formFooter">
                    <div>
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
                    <div>
                        <i>Don't have an account? </i><a className="underlineHover" href="#" onClick={registerClicked}>Register</a>
                    </div>
                </div>

            </div>
        </div>
        // <>
        //     <Row gutter={[16, 16]}>
        //         <Col span={12}>
        //             <Row>
        //                 <Col span={4}></Col>
        //                 <Col span={16}>
        //                     <Form
        //                         name="student-login-form"
        //                         labelCol={{
        //                             span: 8,
        //                         }}
        //                         wrapperCol={{
        //                             span: 16,
        //                         }}
        //                         initialValues={{
        //                             role: 'ROLE.STUDENT',
        //                             remember: true,
        //                         }}
        //                         onSubmitCapture={onFinish}
        //                         // onFinish={onFinish}
        //                         // onFinishFailed={onFinishFailed}
        //                         autoComplete="off"
        //                     >
        //                         <div style={{ textAlign: 'center' }}>Login as Student</div>
        //                         <Form.Item
        //                             label="Username"
        //                             name="username"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: 'Please input your username!',
        //                                 },
        //                             ]}
        //                         >
        //                             <Input />
        //                         </Form.Item>

        //                         <Form.Item
        //                             label="Password"
        //                             name="password"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: 'Please input your password!',
        //                                 },
        //                             ]}
        //                         >
        //                             <Input.Password />
        //                         </Form.Item>

        //                         <Form.Item
        //                             label="Role"
        //                             name="role"
        //                             hidden={true}
        //                         >
        //                             <Input />
        //                         </Form.Item>

        //                         <Form.Item
        //                             name="remember"
        //                             valuePropName="checked"
        //                             wrapperCol={{
        //                                 offset: 8,
        //                                 span: 16,
        //                             }}
        //                         >
        //                             <Checkbox>Remember me</Checkbox>
        //                         </Form.Item>

        //                         <Form.Item
        //                             wrapperCol={{
        //                                 offset: 8,
        //                                 span: 16,
        //                             }}
        //                         >
        //                             <Button type="primary" htmlType="submit">
        //                                 Submit
        //                             </Button>
        //                         </Form.Item>
        //                     </Form>
        //                 </Col>
        //                 <Col span={4}></Col>
        //             </Row>
        //         </Col>
        //         <Col span={12}>
        //             <Row>
        //                 <Col span={4}></Col>
        //                 <Col span={16}>
        //                     <Form
        //                         name="teacher-login-form"
        //                         labelCol={{
        //                             span: 8,
        //                         }}
        //                         wrapperCol={{
        //                             span: 16,
        //                         }}
        //                         initialValues={{
        //                             role: 'ROLE.TEACHER',
        //                             remember: true,
        //                         }}
        //                         onSubmitCapture={onFinish}
        //                         // onFinish={onFinish}
        //                         // onFinishFailed={onFinishFailed}
        //                         autoComplete="off"
        //                     >
        //                         <div style={{ textAlign: 'center' }}>Login as Teacher</div>
        //                         <Form.Item
        //                             label="Username"
        //                             name="username"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: 'Please input your username!',
        //                                 },
        //                             ]}
        //                         >
        //                             <Input />
        //                         </Form.Item>

        //                         <Form.Item
        //                             label="Password"
        //                             name="password"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: 'Please input your password!',
        //                                 },
        //                             ]}
        //                         >
        //                             <Input.Password />
        //                         </Form.Item>

        //                         <Form.Item
        //                             label="Role"
        //                             name="role"
        //                             hidden={true}
        //                         >
        //                             <Input />
        //                         </Form.Item>

        //                         <Form.Item
        //                             name="remember"
        //                             valuePropName="checked"
        //                             wrapperCol={{
        //                                 offset: 8,
        //                                 span: 16,
        //                             }}
        //                         >
        //                             <Checkbox>Remember me</Checkbox>
        //                         </Form.Item>

        //                         <Form.Item
        //                             wrapperCol={{
        //                                 offset: 8,
        //                                 span: 16,
        //                             }}
        //                         >
        //                             <Button type="primary" htmlType="submit">
        //                                 Submit
        //                             </Button>
        //                         </Form.Item>
        //                     </Form>
        //                 </Col>
        //                 <Col span={4}></Col>
        //             </Row>
        //         </Col>
        //     </Row>
        //     <div style={{
        //         textAlign: 'center',
        //         // position: 'fixed', // to set at bottom of page, in middle
        //         // bottom: '0',
        //         // width: '100%',
        //     }} onClick={registerClicked}>
        //         Don't have an account? <a>Register</a>
        //     </div>
        // </>
    )
}

export default Login

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}