import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { List, Skeleton, Avatar, Collapse, Card, Button, Popconfirm, message } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import './EditCourseStudent.css'

const ManageStudentList = ({ courseInfo, refresh, visible, setRefresh }) => {
    let BASE_STUDENTS_URL = 'http://192.168.1.10:5000/users/course/students'
    let BASE_COURSE_USER_URL = 'http://192.168.1.10:5000/course'

    const [students, setStudents] = useState([{ name: 'Error' }])
    let student = useRef(false)
    const changeCollapse = (key) => {
        student.current = students[key]
        console.log(student.current)
    }

    useEffect(() => {
        let params = {
            course_id: courseInfo.id
        }
        axios.get(BASE_STUDENTS_URL, { params }).then(res => { setStudents(res.data.students); console.log(res) })
    }, [refresh])

    let studentsHtml = students.map((student, index) => {
        let gridStyle = {
            width: '50%',
            textAlign: 'center',
        }
        return (
            <Collapse.Panel header={student.name} key={index} style={{ borderBottom: '1px solid' }}>
                <Card>
                    <Card.Grid style={gridStyle}>
                        <p>Class: {student.class}</p>
                        <p>School: {student.school}</p>
                        <p>Phone: {student.phone}</p>
                        <p>Email: {student.email}</p>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <Avatar size={64} icon={<UserOutlined />}></Avatar>
                        <Popconfirm
                            title={`Are you sure to remove ${student.name} from ${courseInfo.name}`}
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button style={{ marginTop: '30px' }} danger type="primary">Remove Student</Button>
                        </Popconfirm>
                    </Card.Grid>
                </Card>
            </Collapse.Panel>
        )
    })
    function confirm(e) {
        removeStudent()
        console.log(e);
        message.success("Removes student from course")
    }

    function cancel(e) {
        console.log(e);
    }
    // API call
    const removeStudent = () => {
        axios.delete(BASE_COURSE_USER_URL, {
            data: {
                course_id: courseInfo.id,
                user_id: student.current.id,
            }
        }).then(setRefresh(!refresh))
    }
    return (
        // <List
        //     className="demo-loadmore-list"
        //     itemLayout="horizontal"
        //     dataSource={students}
        //     renderItem={item => (
        //         <List.Item
        //             actions={[<a key="list-loadmore-edit" className="danger-a" onClick={removeStudent}>remove</a>]}
        //         >
        //             <Skeleton avatar title={false} loading={item.loading} active>
        //                 <List.Item.Meta
        //                     // title={<a href="#">{item.name}</a>}
        //                     // description={item.class}
        //                     title={<Collapse.Panel>

        //                     </Collapse.Panel>}
        //                 />
        //             </Skeleton>
        //         </List.Item>
        //     )}
        // />
        <Collapse accordion
            ghost={true}
            onChange={changeCollapse}>
            {studentsHtml}
        </Collapse>
    )
}

export default ManageStudentList