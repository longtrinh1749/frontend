import React, { useRef, useState } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Card, Avatar, Button, Input } from 'antd';
import { UserOutlined, DownOutlined, LaptopOutlined, NotificationOutlined, BellOutlined, SendOutlined } from '@ant-design/icons';
import './App.css'
import useToken from '../../hooks/useToken'
import Login from '../Login/Login'
import StudentApp from "../StudentApp/StudentApp";
import TeacherApp from "../TeacherApp/TeacherApp";
import Leftbar from "../../components/Sidebar/Sider";

const App = () => {

    // Course
    const [course, setCourse] = useState('')

    // Assignment
    const [assignment, setAssignment] = useState('')

    // Breadcrumbs
    let brcrumb = useRef({ course: '', assignment: '' })

    const setBrCrumbCourse = (courseName) => {
        brcrumb.current.course = <Breadcrumb.Item onClick={() => setAssignment('')}>{courseName}</Breadcrumb.Item>
        brcrumb.current.assignment = ''
    }

    const setBrCrumbAssignment = (assignmentName) => {
        brcrumb.current.assignment = <Breadcrumb.Item>{assignmentName}</Breadcrumb.Item>
    }

    setBrCrumbCourse(course.name)
    setBrCrumbAssignment(assignment.name)

    // Profile menu
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    const { Meta } = Card;

    const profileMenu = (
        <Menu>
            {/* <Menu.Item>
                <a rel="noopener noreferrer" href="#" key='profile'>
                    Profile
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" key='saved'>
                    Saved Items
                </a>
            </Menu.Item> */}
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" key='logout' onClick={() => setToken(null)}>
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    )

    // Notification Menu
    const notiFilterMenu = (
        <Menu>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" key='due-filter'>
                    Due
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" key='submitted-filter'>
                    Submitted
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" key='chat-filter'>
                    Chat
                </a>
            </Menu.Item>
        </Menu>
    )

    // Chat section
    const chatSuffix = (
        <SendOutlined />
    )

    // Login
    const { token, setToken } = useToken();

    if (!sessionStorage.getItem('id')) {
        console.log('Ko có token')
        return <Login setToken={setToken}></Login>
    } else {
        console.log('Có token')
        if (sessionStorage.getItem('role') == '"ROLE.STUDENT"') {
            return (
                <StudentApp setToken={setToken} token={token}></StudentApp>
            )
        } else if (sessionStorage.getItem('role') == '"ROLE.TEACHER"') {
            return (
                <TeacherApp setToken={setToken} token={token}></TeacherApp>
            )
        }
    }
    return (
        <h5>Error in User role</h5>
    )
}

export default App