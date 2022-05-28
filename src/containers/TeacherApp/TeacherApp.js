import React, { useEffect, useRef, useState } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Card, Avatar, Button, Input, Typography } from 'antd';
import { UserOutlined, DownOutlined, LaptopOutlined, NotificationOutlined, BellOutlined, SendOutlined, RedoOutlined } from '@ant-design/icons';
import '../App/App.css'
import Courses from '../../components/Teacher/Courses/Courses'
import Assignments from "../../components/Teacher/Course/Assignments";
import Students from "../../components/Teacher/Course/Students"
import Grading from "../../components/Teacher/Assignment/Grading";
import Profile from "../../components/Common/Account/Profile";
import Saved from "../../components/Common/Account/Saved";
import Chat from "../../components/Common/Chat/Chat";
import Sort from "../../components/Common/Sort/Sort";
import Filter from "../../components/Common/Filter/Filter";
import Notification from "../../components/Common/Notification/Notification";

const TeacherApp = ({ setToken, token }) => {

    // Refresh
    const [refresh, setRefresh] = useState(false)

    // Course
    const [course, setCourse] = useState('')

    // Assignment
    const [assignment, setAssignment] = useState('')

    // Student
    const [student, setStudent] = useState('')

    const [students, setStudents] = useState(1)

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

    const [filterList, setFilterList] = useState([])
    const [sort, setSort] = useState()
    const [filter, setFilter] = useState()
    const [sortOptions, setSortOptions] = useState([])
    const [filterOptions, setFilterOptions] = useState([])
    let sortList, setSortList

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
    if (course && !assignment && !student) {
        content = (
            <Assignments
                token={token}
                course={course}
                setAssignment={setAssignment}
                refresh={refresh}
                setRefresh={setRefresh}
                setSortList={setSortList}
                setFilterList={setFilterList}
                setSortOptions={setSortOptions}
                sort={sort}
                setFilterOptions={setFilterOptions}
                filter={filter}
            >

            </Assignments>
        )
    } else if (course && assignment && !student) {
        sortList = students
        setSortList = setStudents
        content = (
            <Students
                token={token}
                course={course}
                assignment={assignment}
                setStudent={setStudent}
                setSortList={setSortList}
                setFilterList={setFilterList}
                setRefresh={setRefresh}
                refresh={refresh}
                students={students}
                setStudents={setStudents}
                sortOptions={sortOptions}
                setSortOptions={setSortOptions}
                sort={sort}
                setFilterOptions={setFilterOptions}
                filter={filter}
            >

            </Students>
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
                <Notification
                    notiFilterMenu={notiFilterMenu}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    setCourse={setCourse}
                    setAssignment={setAssignment}
                    setStudent={setStudent}
                />
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
                    <div id='utils'>
                        <RedoOutlined style={{ float: 'right', margin: '10px', fontSize: '125%' }} onClick={() => setRefresh(!refresh)} />
                        <Sort sortList={students} setSortList={setStudents} setSort={setSort} sortOptions={sortOptions}></Sort>
                        <Filter setFilter={setFilter} filterOptions={filterOptions}></Filter>
                    </div>
                    <Content className="site-layout-background">
                        {content}
                    </Content>
                </Layout>
                <Sider width={'20%'} className="site-layout-background" style={{
                    overflow: 'auto',
                    height: "calc(100vh - 64px)",
                }}>
                    <Chat courseId={course.id} assignmentId={assignment.id} userId={student.id}></Chat>
                </Sider>
            </Layout>
        </Layout>
    )
}


export default TeacherApp