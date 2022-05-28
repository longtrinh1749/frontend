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
import Sort from "../../components/Common/Sort/Sort";
import Filter from "../../components/Common/Filter/Filter";
import Notification from "../../components/Common/Notification/Notification";

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

    const [filterList, setFilterList] = useState([])
    const [sort, setSort] = useState()
    const [filter, setFilter] = useState()
    const [sortOptions, setSortOptions] = useState([])
    const [filterOptions, setFilterOptions] = useState([])
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
        <Courses
            token={token}
            setCourse={setCourse}
            refresh={refresh}
            setRefresh={setRefresh}
            setSortOptions={setSortOptions}
            sort={sort}
            setFilterOptions={setFilterOptions}
            filter={filter}
        >

        </Courses>
    )
    if (course && !assignment) {
        content = (
            <Assignments
                token={token}
                course={course}
                setAssignment={setAssignment}
                setBrCrumb={() => { setAssignment(''); setCourse('') }}
                refresh={refresh}
                setRefresh={setRefresh}
                setSortOptions={setSortOptions}
                sort={sort}
                setFilterOptions={setFilterOptions}
                filter={filter}
            >

            </Assignments>
        )
    } else if (course && assignment) {
        content = (
            <Assignment
                token={token}
                assignment={assignment}
                refresh={refresh}
                setRefresh={setRefresh}
            >

            </Assignment>
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
                <Notification
                    refresh={refresh}
                    setRefresh={setRefresh}
                    notiFilterMenu={notiFilterMenu}
                    setCourse={setCourse}
                    setAssignment={setAssignment}

                />
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
                    <div id='utils'>
                        <RedoOutlined style={{ float: 'right', margin: '10px', fontSize: '125%' }} onClick={() => setRefresh(!refresh)} />
                        <Sort setSort={setSort} sortOptions={sortOptions}></Sort>
                        <Filter filterOptions={filterOptions} setFilter={setFilter}></Filter>
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