import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Divider, Space, Typography, Row, Col } from 'antd';
// import './Register.css'
import './OtherRegister.css'

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
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <img src="https://t4.ftcdn.net/jpg/01/90/50/61/360_F_190506160_coExNloNdTd1OcvJe3cbdddUDqoqiJ2B.jpg" id="icon" alt="User Icon" />
                </div>
                <form className="login-form" onSubmit={onFinish}>
                    <input type="text" id="login" className="fadeIn first" name="login" placeholder="Username" />
                    <input type="password" id="password" className="fadeIn second" name="login" placeholder="Password" />
                    <input type="text" id="name" className="fadeIn second" name="register" placeholder="Name" />
                    <input type="text" id="email" className="fadeIn third" name="login" placeholder="Email" />
                    <input type="text" id="phone" className="fadeIn third" name="login" placeholder="Phone" />
                    <input type="text" id="class" className="fadeIn fourth" name="login" placeholder="Class" />
                    <input type="text" id="school" className="fadeIn fourth" name="login" placeholder="School" /><br/>
                    <input type="radio" id="roleStudent" name="role" value="ROLE.STUDENT" defaultChecked="checked"/><label for="roleStudent">Register as Student</label><br/>
                    <input type="radio" id="roleTeacher" name="role" value="ROLE.TEACHER"/><label for="roleTeacher">Register as Teacher</label><br/>
                    <input type="submit" className="fadeIn fourth" value="Register" />
                </form>
                <div id="formFooter">
                    <div>
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
                    <div>
                        <i>Already have an account? </i><a className="underlineHover" href="#" onClick={loginClicked}>Login</a>
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
        //                         name="student-register-form"
        //                         labelCol={{
        //                             span: 8,
        //                         }}
        //                         wrapperCol={{
        //                             span: 16,
        //                         }}
        //                         initialValues={{
        //                             remember: true,
        //                         }}
        //                         onSubmitCapture={onFinish}
        //                         // onFinish={onFinish}
        //                         // onFinishFailed={onFinishFailed}
        //                         autoComplete="off"
        //                     >
        //                         <div style={{textAlign:'center'}}>Register as Student</div>
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
        //                             label="Name"
        //                             name="name"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: 'Please input your name!',
        //                                 },
        //                             ]}
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Email"
        //                             name="email"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Address"
        //                             name="address"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Phone number"
        //                             name="phone"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="School"
        //                             name="school"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Class"
        //                             name="class"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Role"
        //                             name="role"
        //                             hidden={true}
        //                         >
        //                             <Input defaultValue={'ROLE.STUDENT'} disabled={true}/>
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
        //                         name="teacher-register-form"
        //                         labelCol={{
        //                             span: 8,
        //                         }}
        //                         wrapperCol={{
        //                             span: 16,
        //                         }}
        //                         initialValues={{
        //                             remember: true,
        //                         }}
        //                         onSubmitCapture={onFinish}
        //                         // onFinish={onFinish}
        //                         // onFinishFailed={onFinishFailed}
        //                         autoComplete="off"
        //                     >
        //                         <div style={{textAlign:'center'}}>Register as Teacher</div>
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
        //                             label="Name"
        //                             name="name"
        //                             rules={[
        //                                 {
        //                                     required: true,
        //                                     message: 'Please input your name!',
        //                                 },
        //                             ]}
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Email"
        //                             name="email"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Address"
        //                             name="address"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Phone number"
        //                             name="phone"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="School"
        //                             name="school"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Class"
        //                             name="class"
        //                         >
        //                             <Input />
        //                         </Form.Item>
                                
        //                         <Form.Item
        //                             label="Role"
        //                             name="role"
        //                             hidden={true}
        //                         >
        //                             <Input defaultValue={'ROLE.TEACHER'} disabled={true}/>
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
        //     <div style={{ textAlign: 'center' }} onClick={loginClicked}>
        //         Already have an account? <a>Login</a>
        //     </div>
        // </>
    )
}

export default Register