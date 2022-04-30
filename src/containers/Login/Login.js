import React, { useState, useRef } from "react";
import { Form, Input, Button, Checkbox, Divider, Space, Typography, Row, Col } from 'antd';
// import './Login.css'
import './OtherLogin.css'
import Register from "../Register/Register"
import PropTypes from 'prop-types'

const Login = ({ setToken }) => {

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
        const token = loginUser({
            'username': username.current,
            'password': password.current,
            'role': role.current
        });
        setToken(token.username, token.role, token.id);
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
        let id = 12
        console.log(data)
        if (data.username == "teacher") {
            id = 11
        }
        return { "username": data.username, "role": data.role, "id": id }
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
                    <img src="https://t4.ftcdn.net/jpg/01/90/50/61/360_F_190506160_coExNloNdTd1OcvJe3cbdddUDqoqiJ2B.jpg" id="icon" alt="User Icon" />
                </div>
                <form onSubmit={onFinish}>
                    <input type="text" id="login" className="fadeIn first" name="login" placeholder="Username" />
                    <input type="password" id="password" className="fadeIn second" name="login" placeholder="Password" /><br />
                    <input type="radio" id="roleStudent" name="role" value="ROLE.STUDENT" defaultChecked="checked"/><label htmlFor="roleStudent">Login as Student</label><br />
                    <input type="radio" id="roleTeacher" name="role" value="ROLE.TEACHER" /><label htmlFor="roleTeacher">Login as Teacher</label><br />
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