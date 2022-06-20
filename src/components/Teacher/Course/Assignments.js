import React, { useEffect, useState } from "react";
import { Card, Col, Row, Divider, DatePicker } from 'antd'
import CourseInfo from "../../Common/CourseInfo/CourseInfo";
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import CreateAssignment from './CreateAssignment/CreateAssignment'
import moment from 'moment';

const Assignments = ({ token, course, setAssignment, refresh, setRefresh, setSortOptions, sort, setFilterOptions, filter, setStudent }) => {

    const BASE_URL = 'http://192.168.1.12:5000/assignments'

    const [assignments, setAssignments] = useState(1)
    useEffect(() => {
        console.log('Call GetAssignments')
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                'user_id': sessionStorage.getItem('id'),
                'course_id': course.id,
            }
        };

        axios.get(BASE_URL, config).then((res) => {
            console.log(res.data.assignments)
            setAssignments(res.data.assignments)
        })

        setSortOptions([
            {
                value: 'name',
                display: 'Name'
            },
            {
                value: 'due',
                display: 'Due date'
            },
            {
                value: 'submitted',
                display: 'Total submitted'
            },
            {
                value: 'graded',
                display: 'Total graded'
            }
        ])

        setFilterOptions([])
    }, [refresh])

    useEffect(() => {
        if (sort) {
            console.log('Sort', sort)
            if (sort.type == 'name') {
                console.log('Sort name', sort)
                let new_assignments = assignments.sort((a, b) => {
                    let as = a.name.split(' ')
                    let bs = b.name.split(' ')
                    return as.join(' ').localeCompare(bs.join(' '))
                })
                console.log(new_assignments)
                setAssignments(new_assignments)
            } else if (sort.type == 'due') {
                assignments.sort((a, b) => {
                    if (!a.due) {
                        a.due = ''
                    }
                    if (!b.due) {
                        b.due = ''
                    }
                    return a.due.localeCompare(b.due)
                })
            } else if (sort.type == 'submitted') {
                assignments.sort((a, b) => {
                    return a.submitted - b.submitted
                })
            } else if (sort.type == 'graded') {
                assignments.sort((a, b) => {
                    return a.graded - b.graded
                })
            }
            if (sort.direction == 'desc') {
                assignments.reverse()
            }
        }
        console.log(assignments)
    }, [sort])

    useEffect(() => {
        console.log('Filter', filter)
        if (filter) {
            console.log('Filter', filter)
            let newAssignments = []
            for (let i = 0; i < assignments.length; i++) {
                let checked = true
                if (filter.name) {
                    if (!assignments[i].name.includes(filter.name)) {
                        checked = false
                    }
                }
                if (checked) {
                    newAssignments.push(assignments[i])
                }
            }
            setAssignments(newAssignments)
        }
        console.log('Filter student', assignments)
    }, [filter])

    let assignmentsHTML = (
        <div></div>
    )
    if (assignments.length > 0) {
        assignmentsHTML = assignments.map((assignment, index) => {
            return (
                <Col span={8} key={index}>
                    <Card hoverable={true} title={assignment.name} bordered={true} assignmentid={assignment.id} onClick={() => setAssignment(assignment)}>

                        <Card.Grid hoverable={false} style={{
                            width: '50%',
                            textAlign: 'center',
                        }}>
                            <p className="course-card-content">Hạn nộp: </p>
                            <p className="course-card-content">{moment(assignment.due, 'YYYY-MM-DD HH:mm').format('HH:mm DD-MM-YYYY')}</p>
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{
                            width: '50%',
                            textAlign: 'center',
                        }}>
                            <p className="course-card-content">Đã nộp: {assignment.submit}/{course.total}</p>
                            <p className="course-card-content">Đã chấm: {assignment.graded}/{course.total}</p>
                        </Card.Grid>
                    </Card>
                </Col>
            )
        })
    }
    // Create Assignment Form
    const [visible, setVisible] = useState(false);

    const onEdit = (values) => {
        console.log('Received values from form', values.due.format("YYYY-MM-DD HH:mm:ss"))
        setVisible(false)
    }
    return (
        <div className="site-card-wrapper">
            <CourseInfo
                course={course}
                refresh={refresh}
                setRefresh={setRefresh}
                setAssignment={setAssignment}
                setStudent={setStudent}
            ></CourseInfo>
            <Divider />
            <b>Assignments</b>
            <Row gutter={16}>
                {assignmentsHTML}
                <Col span={8}>
                    <Card hoverable={true} title={'Create Assignment'} bordered={true} onClick={() => setVisible(true)} style={{ height: '100%', textAlign: 'center' }}>
                        <PlusOutlined style={{ textAlign: 'center', fontSize: '200%' }} />
                    </Card>
                </Col>
                <CreateAssignment course={course} visible={visible} onEdit={onEdit} onCancel={() => setVisible(false)}></CreateAssignment>
            </Row>
        </div>
    )
}

export default Assignments