import React, { useEffect, useRef, useState } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Card, Avatar, Button, Input, Typography, Badge } from 'antd';
import { UserOutlined, DownOutlined, RedoOutlined, NotificationOutlined, BellOutlined, SendOutlined } from '@ant-design/icons';
import '../App/App.css'
import Courses from '../../components/Student/Courses/Courses'
import Assignments from "../../components/Student/Course/Assignments";
import Assignment from '../../components/Student/Course/Assignment'
import Profile from "../../components/Common/Account/Profile";
import Saved from "../../components/Common/Account/Saved";
import Chat from "../../components/Common/Chat/Chat";

const StudentApp = ({ setToken, token }) => {

    // Refresh
    const [refresh, setRefresh] = useState(false)

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

    // let scope = useRef('GLOBAL')
    // let scopeId = useRef(0)
    // useEffect(() => {
    //     if (course != '') {
    //         scope.current = 'COURSE'
    //         scopeId.current = course.id
    //     }
    //     if (assignment != '') {
    //         scope.current = 'PRIVATE'
    //         scopeId.current = course
    //     }
    // }, [course, assignment])
    // Content
    let content = (
        <Courses token={token} setCourse={setCourse} refresh={refresh} setRefresh={setRefresh}></Courses>
    )
    if (course && !assignment) {
        content = (
            <Assignments token={token} course={course} setAssignment={setAssignment} setBrCrumb={() => { setAssignment(''); setCourse('') }} refresh={refresh} setRefresh={setRefresh}></Assignments>
        )
    } else if (course && assignment) {
        content = (
            <Assignment token={token} assignment={assignment} refresh={refresh} setRefresh={setRefresh}></Assignment>
        )
    }

    return (
        <Layout>
            <Profile modalVisible={profileVisible} setModalVisible={setProfileVisible}></Profile>
            <Saved modalVisible={savedVisible} setModalVisible={setSavedVisible}></Saved>
            <Header className="header">
                <div className="logo">
                    <img src="img/text-logo2.png" style={{
                        height: '100%',
                    }}></img>
                </div>
                <Dropdown overlay={profileMenu}>
                    <a id='profile-options' className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                        Student Profile! <UserOutlined />
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
                <Layout style={{
                    padding: '0 24px 24px',
                    height: 'calc(100vh - 64px)',
                }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item onClick={() => { setAssignment(''); setCourse('') }}>
                            <Typography.Title level={4} italic={true}>Your Courses</Typography.Title>
                        </Breadcrumb.Item>
                        {brcrumb.current.course}
                        {brcrumb.current.assignment}
                    </Breadcrumb>
                    <div>
                        <RedoOutlined style={{ float: 'right', margin: '10px', fontSize: '125%' }} onClick={() => setRefresh(!refresh)} />
                    </div>
                    <Content className="site-layout-background">
                        {content}
                    </Content>
                </Layout>
                <Sider width={'20%'} className="site-layout-background" style={{
                    overflow: 'auto',
                    height: "calc(100vh - 64px)",
                }}>
                    <Chat courseId={course.id} assignmentId={assignment.id} userId={course.created_by}></Chat>
                </Sider>
            </Layout>
        </Layout>
    )
}


export default StudentApp