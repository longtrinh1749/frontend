import React, { useEffect, useState, useRef } from "react";
import { Card, Col, Row, Divider, Typography } from 'antd'
import LeaveCourse from '../LeaveCourse/LeaveCourse'
import CourseInfo from '../../Common/CourseInfo/CourseInfo'
import axios from "axios";
import moment from 'moment';

const Assignments = ({ token, course, setAssignment, setBrCrumb, refresh, setRefresh, setSortOptions, sort, setFilterOptions, filter }) => {

    const BASE_URL = 'http://192.168.1.9:5000/assignments'

    const [assignments, setAssignments] = useState(1)

    useEffect(() => {
        let params = {
            course_id: course.id,
            user_id: sessionStorage.getItem('id')
        }

        axios.get(BASE_URL, { params }).then((res) => {
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
                value: 'status',
                display: 'Status'
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
                    },
                    {
                        d: 'Đã nộp',
                        v: 'submitted'
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
                let new_assignments = assignments.sort((a, b) => {
                    let as = a.name.split(' ')
                    let bs = b.name.split(' ')
                    return as.join(' ').localeCompare(bs.join(' '))
                })
                console.log(new_assignments)
                setAssignments(new_assignments)
            } else if (sort.type == 'status') {
                assignments.sort((a, b) => {
                    if (!a.status) {
                        a.status = ''
                    }
                    if (!b.status) {
                        b.status = ''
                    }
                    return a.status.localeCompare(b.status)
                })
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
                if (filter.status && filter.status.length > 0) {
                    if (assignments[i].status != ""){
                        if (!filter.status.includes(assignments[i].status) ) {
                            checked = false
                        }
                    } else {
                        if (!filter.status.includes('')) {
                            checked = false
                        }
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
        <div>
            <Typography.Title level={4}>Enjoy your free time!</Typography.Title>
            <Typography.Text italic={true}>Currently no assignments yet.</Typography.Text>
        </div>
    )

    if (assignments.length > 0) {
        assignmentsHTML = assignments.map((assignment, index) => {
            let status = 'Not submit yet'
            if (assignment.status == 'submitted') {
                status = 'Submitted'
            } else if (assignment.status == 'handed in') {
                status = 'Handed in'
            } else if (assignment.status == 'graded') {
                status = 'Graded'
            }
            return (
                <Col span={8} key={index}>
                    <Card hoverable={true} title={assignment.name} bordered={true} assignmentid={assignment.id} onClick={() => setAssignment({ 'name': assignment.name, 'id': assignment.id })}>
                        <p className="course-card-content">Due: {moment(assignment.due, 'YYYY-MM-DD HH:mm').format('HH:mm DD-MM-YYYY')}</p>
                        <p className="course-card-content">Status: <Typography.Text type="warning">{status}</Typography.Text></p>
                    </Card>
                </Col>
            )
        })
    }
    return (
        <div className="site-card-wrapper">
            <Typography.Title level={3} italic={true} style={{
                display: 'inline-block',
            }}>Assignments:</Typography.Title>
            <LeaveCourse course={course} leaveCourse={setBrCrumb}></LeaveCourse>
            <Divider />
            <Row gutter={16}>
                {assignmentsHTML}
            </Row>
        </div>
    )
}

export default Assignments