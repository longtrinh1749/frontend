import React, { useRef, useState } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Card, Avatar, Button, Input } from 'antd';
import { UserOutlined, DownOutlined, LaptopOutlined, NotificationOutlined, BellOutlined, SendOutlined, RedoOutlined } from '@ant-design/icons';
import '../App/App.css'
import Courses from '../../components/Teacher/Courses/Courses'
import Assignments from "../../components/Teacher/Course/Assignments";
import Students from "../../components/Teacher/Course/Students"

const TeacherApp = ({setToken, token}) => {

    // Refresh
    const [refresh, setRefresh] = useState(false)

    // Course
    const [course, setCourse] = useState('')

    // Assignment
    const [assignment, setAssignment] = useState('')

    // Student
    const [student, setStudent] = useState('')

    // Breadcrumbs
    let brcrumb = useRef({ course: '', assignment: '', student: '' })

    const setBrCrumbCourse = (courseName) => {
        brcrumb.current.course = <Breadcrumb.Item onClick={() => {setAssignment(''); setStudent('')}}>{courseName}</Breadcrumb.Item>
        brcrumb.current.assignment = ''
        brcrumb.current.student = ''
    }

    const setBrCrumbAssignment = (assignmentName) => {
        brcrumb.current.assignment = <Breadcrumb.Item onClick={() => setStudent('')}>{assignmentName}</Breadcrumb.Item>
        brcrumb.current.student = ''
    }

    const setBrCrumbStudent = (studentName) => {
        brcrumb.current.student = <Breadcrumb.Item>{studentName}</Breadcrumb.Item>
    }

    setBrCrumbCourse(course.name)
    setBrCrumbAssignment(assignment.name)
    setBrCrumbStudent(student.name)

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
        <Courses token={token} setCourse={setCourse} refresh={refresh} setRefresh={setRefresh}></Courses>
    )
    if (course && !assignment && !student) {
        content = (
            <Assignments token={token} course={course} setAssignment={setAssignment} refresh={refresh} setRefresh={setRefresh}></Assignments>
        )
    } else if (course && assignment && !student) {
        content = (
            <Students token={token} course={course} assignment={assignment} setStudent={setStudent}></Students>
        )
    } else if (course && assignment && student) {
        content = (
            <h1>Grading</h1>
        )
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Dropdown overlay={profileMenu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                        Teacher Profile! <UserOutlined />
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
                            description="Nguyen Hanh Kien has submitted Bai 5 SGK Tieng Viet"
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
                            description="Bai tap TV lop 3 has passed graded due"
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
                            description="Giang A Thuy has a question in his submitted for Bai tap Toan giua ki"
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
                        <Breadcrumb.Item onClick={() => { setAssignment(''); setCourse(''); setStudent('') }}><b>Your Courses</b></Breadcrumb.Item>
                        {brcrumb.current.course}
                        {brcrumb.current.assignment}
                        {brcrumb.current.student}
                    </Breadcrumb>
                        <div>
                            <RedoOutlined style={{float:'right', margin: '10px'}} onClick={() => setRefresh(!refresh)}/>
                        </div>
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


export default TeacherApp