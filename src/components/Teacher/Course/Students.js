import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Descriptions, Divider, Button, Menu, Dropdown, message } from 'antd'
import axios from "axios";
import EditAssignment from "../Assignment/EditAssignment";
import { UserOutlined } from '@ant-design/icons';
import Saved from "../../Common/Saved/Saved";

const Students = ({ setStudent, course, assignment, refresh, setRefresh, students, setStudents, setSortOptions, sort, setFilterOptions, filter, setAssignment, setCourse }) => {

    const BASE_URL = 'http://192.168.1.9:5000/users/course/students'

    useEffect(() => {
        console.log('Call get all students within course')
        let params = {
            course_id: course.id,
            assignment_id: assignment.id,
        }

        axios.get(BASE_URL, { params }).then((res) => {
            console.log(res.data.students)
            setStudents(res.data.students)
        })
        setSortOptions([
            {
                value: 'name',
                display: 'Name'
            },
            {
                value: 'status',
                display: 'Status'
            },
            {
                value: 'score',
                display: 'Score'
            }
        ])
        setFilterOptions([
            {
                display: 'Status',
                value: 'status',
                childs: [
                    {
                        d: 'Chưa chấm',
                        v: 'handed in'
                    },
                    {
                        d: 'Chưa nộp',
                        v: ''
                    },
                    {
                        d: 'Đã chấm',
                        v: 'graded'
                    }
                ]
            }
        ])
    }, [refresh])

    useEffect(() => {
        if (sort) {
            console.log('Sort', sort)
            if (sort.type == 'name') {
                console.log('Sort name', sort)
                let new_students = students.sort((a, b) => {
                    let as = a.name.split(' ')
                    as.reverse()
                    let bs = b.name.split(' ')
                    bs.reverse()
                    return as.join(' ').localeCompare(bs.join(' '))
                })
                console.log(new_students)
                setStudents(new_students)
            } else if (sort.type == 'status') {
                students.sort((a, b) => {
                    if (!a.status) {
                        a.status = ''
                    }
                    if (!b.status) {
                        b.status = ''
                    }
                    return a.status.localeCompare(b.status)
                })
                // } else if (sort.type == 'score') {
                //     students.sort((a,b) => {
                //         return a.s
                //     })
            }
            if (sort.direction == 'desc') {
                students.reverse()
            }
        }
        console.log(students)
    }, [sort])

    useEffect(() => {
        console.log('Filter', filter)
        if (filter) {
            console.log('Filter', filter)
            let newStudents = []
            for (let i = 0; i < students.length; i++) {
                let checked = true
                if (filter.name) {
                    if (!students[i].name.includes(filter.name)) {
                        checked = false
                    }
                }
                if (filter.status && filter.status.length > 0) {
                    if (students[i].status != null) {
                        if (!filter.status.includes(students[i].status)) {
                            checked = false
                        }
                    } else {
                        if (!filter.status.includes('')) {
                            checked = false
                        }
                    }
                }
                if (checked) {
                    newStudents.push(students[i])
                }
            }
            setStudents(newStudents)
        }
        console.log('Filter student', students)
    }, [filter])

    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };

    let studentsHTML = (
        <div></div>
    )
    if (students.length) {
        studentsHTML = students.map((student, index) => {
            let studentStatus = (
                <Typography.Text type="danger">Chưa nộp</Typography.Text>
            )
            if (student.status == 'handed in') {
                studentStatus = (
                    <Typography.Text type="warning">Chưa chấm</Typography.Text>
                )
            } else if (student.status == 'graded') {
                studentStatus = (
                    <Typography.Text type="success">Đã chấm</Typography.Text>
                )
            }
            return (
                <Col span={8} key={index}>
                    <Card hoverable={true} bordered={true} studentid={student.id} onClick={() => setStudent({ 'name': student.name, 'id': student.id })}>
                        <p className="course-card-content" style={{ display: 'inline-block' }}>Học sinh: {student.name}</p>
                        <p className="course-card-content" style={{ marginLeft: '20px', display: 'inline-block', float: 'right' }}>
                            {studentStatus}
                        </p>
                    </Card>
                </Col>
            )
        })
    }
    //Edit Assignment Form
    const [visible, setVisible] = useState(false);
    const onEdit = (values) => {
        console.log('Received values from form', values)
        setVisible(false)
    }
    return (
        <div className="site-card-wrapper">
            <EditAssignment assignment={assignment} visible={visible} onEdit={onEdit} onCancel={() => setVisible(false)} refresh={refresh} setRefresh={setRefresh}></EditAssignment>
            <Typography.Title level={4} italic={true} style={{
                display: 'inline-block',
            }}>
                {assignment.name}
            </Typography.Title>

            <Saved
                object={assignment}
                type="assignment"
                setAssignment={setAssignment}
                setCourse={setCourse}
                setStudent={setStudent}
                refresh={refresh}
            >

            </Saved>
            <Descriptions
                title=''
                layout="vertical"
                size="middle"
                extra={<Button size="large" type="primary" onClick={() => {
                    setVisible(true);
                }}>Edit Assignment</Button>}
            >
                <Descriptions.Item label="Due"><i>{assignment.due}</i></Descriptions.Item>
                <Descriptions.Item label="Description">
                    <i>Doing homework 5 in page 23</i>
                </Descriptions.Item>
                <Descriptions.Item label="Instruction" span={3}><i>{assignment.instruction ? assignment.instruction : 'None'}</i></Descriptions.Item>
            </Descriptions>
            <Divider />
            <Row gutter={16}>
                {studentsHTML}
            </Row>
        </div>
    )
}

export default Students