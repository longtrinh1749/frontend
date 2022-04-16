import React, { useRef, useState } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Card, Avatar, Button, Input } from 'antd';
import { UserOutlined, DownOutlined, LaptopOutlined, NotificationOutlined, BellOutlined, SendOutlined } from '@ant-design/icons';
import './App.css'
import useToken from '../../hooks/useToken'
import Login from '../Login/Login'
import Courses from '../../components/Courses/Courses'

const App = () => {

    // Course
    const [course, setCourse] = useState('')

    // Assignment
    const [assignment, setAssignment] = useState('')

    // Breadcrumbs
    let brcrumb = useRef({ course: '', assignment: '' })

    const setBrCrumbCourse = (courseName) => {
        brcrumb.current.course = <Breadcrumb.Item>{courseName}</Breadcrumb.Item>
        brcrumb.current.assignment = ''
    }

    const setBrCrumbAssignment = (assignmentName) => {
        brcrumb.current.assignment = <Breadcrumb.Item>{assignmentName}</Breadcrumb.Item>
    }

    // Profile menu
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    const { Meta } = Card;

    const profileMenu = (
        <Menu>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#">
                    Profile
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#">
                    Saved Items
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#" onClick={() => setToken(null)}>
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    )

    // Notification Menu
    const notiFilterMenu = (
        <Menu>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#">
                    Due
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#">
                    Submitted
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="#">
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

    if (!token) {
        return <Login setToken={setToken}></Login>
    } else {

        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Dropdown overlay={profileMenu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                            User Profile! <UserOutlined />
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
                            <Breadcrumb.Item>Your Courses</Breadcrumb.Item>
                            {brcrumb.current.course}
                            {brcrumb.current.assignment}
                        </Breadcrumb>
                        <Content className="site-layout-background">
                            <Courses token={token}></Courses>
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
}

export default App