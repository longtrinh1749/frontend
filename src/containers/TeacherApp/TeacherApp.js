import React, { useRef, useState } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Card, Avatar, Button, Input, Typography } from 'antd';
import { UserOutlined, DownOutlined, LaptopOutlined, NotificationOutlined, BellOutlined, SendOutlined, RedoOutlined } from '@ant-design/icons';
import '../App/App.css'
import Courses from '../../components/Teacher/Courses/Courses'
import Assignments from "../../components/Teacher/Course/Assignments";
import Students from "../../components/Teacher/Course/Students"
import Grading from "../../components/Teacher/Assignment/Grading";
import Profile from "../../components/Common/Account/Profile";
import Saved from "../../components/Common/Account/Saved";

const TeacherApp = ({ setToken, token }) => {

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
        brcrumb.current.course = <Breadcrumb.Item onClick={() => { setAssignment(''); setStudent('') }}>{courseName}</Breadcrumb.Item>
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
                <a rel="noopener noreferrer" href="#" key='profile' onClick={(() => setProfileVisible(true))}>
                    Profile
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" key='saved' onClick={(() => setSavedVisible(true))}>
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

    // Profile modal
    const [profileVisible, setProfileVisible] = useState(false)

    // Saved modal
    const [savedVisible, setSavedVisible] = useState(false)

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
            <Students token={token} course={course} assignment={assignment} setStudent={setStudent} refresh={refresh}></Students>
        )
    } else if (course && assignment && student) {
        content = (
            <>
                <Grading token={token} course={course} assignment={assignment} student={student} refresh={refresh}></Grading>
            </>
        )
    }

    return (
        <Layout>
            <Profile modalVisible={profileVisible} setModalVisible={setProfileVisible}></Profile>
            <Saved modalVisible={savedVisible} setModalVisible={setSavedVisible}></Saved>
            <Header className="header">
                <div className="logo">
                    <img style={{
                        height: '100%',
                    }} src="img/text-logo2.png"></img>
                </div>
                <Dropdown overlay={profileMenu}>
                    <a id='profile-options' className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                        Teacher Profile! <UserOutlined />
                    </a>
                </Dropdown>
            </Header>
            <Layout>
                <Sider id='main-content' width={'15%'} className="site-layout-background" style={{
                    overflow: 'auto',
                    height: "calc(100vh - 64px)",
                    padding: '0 5px 0 5px',
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
                <Layout style={{
                    padding: '0 24px 24px',
                    height: 'calc(100vh - 64px',
                }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item onClick={() => { setAssignment(''); setCourse(''); setStudent('') }}>
                            <Typography.Title level={4} italic={true}>Your Courses</Typography.Title>
                        </Breadcrumb.Item>
                        {brcrumb.current.course}
                        {brcrumb.current.assignment}
                        {brcrumb.current.student}
                    </Breadcrumb>
                    <div>
                        <RedoOutlined style={{ float: 'right', margin: '10px', fontSize: '125%' }} onClick={() => setRefresh(!refresh)} />
                    </div>
                    <Content className="site-layout-background">
                        {content}
                    </Content>
                </Layout>
                <Sider width={'20%'} className="site-layout-background">
                    <Input.Group compact>
                        <Input.TextArea id="chat-input" placeholder="Chat" autoSize={{ minRows: 2, maxRows: 4 }} onPressEnter={() => console.log("asd")} />
                    </Input.Group>
                </Sider>
            </Layout>
        </Layout>
    )
}


export default TeacherApp