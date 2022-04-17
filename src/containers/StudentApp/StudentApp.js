import React, { useRef, useState } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Card, Avatar, Button, Input } from 'antd';
import { UserOutlined, DownOutlined, LaptopOutlined, NotificationOutlined, BellOutlined, SendOutlined } from '@ant-design/icons';
import '../App/App.css'
import Courses from '../../components/Student/Courses/Courses'
import Assignments from "../../components/Student/Course/Assignments";
import Assignment from '../../components/Student/Course/Assignment'

const StudentApp = ({setToken, token}) => {

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
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" key='profile'>
                    Profile
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" key='saved'>
                    Saved Items
                </a>
            </Menu.Item>
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
    // Content
    let content = (
        <Courses token={token} setCourse={setCourse}></Courses>
    )
    if (course && !assignment) {
        content = (
            <Assignments token={token} course={course} setAssignment={setAssignment}></Assignments>
        )
    } else if (course && assignment) {
        content = (
            <Assignment></Assignment>
        )
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Dropdown overlay={profileMenu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                        Student Profile! <UserOutlined />
                    </a>
                </Dropdown>
            </Header>
            <Layout>
                <Sider width={250} className="site-layout-background" style={{
                    overflow: 'auto',
                    height: '100vh',
                }}>
                    <Dropdown overlay={notiFilterMenu} trigger={['click']}>
                        <Button id="noti-filter-button" shape="round" type="primary">
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                Filter <DownOutlined />
                            </a>
                        </Button>
                    </Dropdown>
                    <BellOutlined />
                    <Card className="noti-card" loading={false}>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Submitted"
                            description="Bai 5 SGK Tieng Viet has been graded"
                        />
                    </Card>
                    <Card className="noti-card" loading={false}>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Due"
                            description="Bai tap toan lop 2 is about to pass due in 1 day"
                        />
                    </Card>
                    <Card className="noti-card" loading={false}>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Past due"
                            description="Bai tap TV lop 3 has passed due"
                        />
                    </Card>
                    <Card className="noti-card" loading={false}>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Question"
                            description="Bui Gia Khanh has a question in Lop 2A3"
                        />
                    </Card>
                    <Card className="noti-card" loading={false}>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Question"
                            description="Kim Thuy Ngan has a question in assignment Bai tap Toan giua ki"
                        />
                    </Card>
                    <Card className="noti-card" loading={false}>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Question"
                            description="Ms Thuy has reply to your question in Bai tap Toan giua ki"
                        />
                    </Card>
                    <Card className="noti-card" loading={false}>
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Question"
                            description="Pham Gia Tuan replied your chat in class 2A3"
                        />
                    </Card>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item onClick={() => { setAssignment(''); setCourse('') }}>Your Courses</Breadcrumb.Item>
                        {brcrumb.current.course}
                        {brcrumb.current.assignment}
                    </Breadcrumb>
                    <Content className="site-layout-background">
                        {content}
                    </Content>
                </Layout>
                <Sider width={200} className="site-layout-background">
                    <Input.Group compact>
                        <Input.TextArea id="chat-input" placeholder="Chat" autoSize={{ minRows: 2, maxRows: 4 }} onPressEnter={() => console.log("asd")} />
                    </Input.Group>
                </Sider>
            </Layout>
        </Layout>
    )
}


export default StudentApp