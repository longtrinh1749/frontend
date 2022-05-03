import React, { useEffect, useState, useRef } from "react";
import { Card, Col, Row, Divider, Typography } from 'antd'
import LeaveCourse from '../LeaveCourse/LeaveCourse'
import CourseInfo from '../../Common/CourseInfo/CourseInfo'
import axios from "axios";

const Assignments = ({ token, course, setAssignment, setBrCrumb, refresh, setRefresh }) => {

    const BASE_URL = 'http://127.0.0.1:5000/assignments'

    const [assignments, setAssignments] = useState(1)

    useEffect(() => {
        let params = {
            course_id: course.id
        }

        axios.get(BASE_URL, { params }).then((res) => {
            setAssignments(res.data.assignments)
        })
    }, [refresh])

    let assignmentsHTML = (
        <div>
            <Typography.Title level={4}>Enjoy your free time!</Typography.Title>
            <Typography.Text italic={true}>Currently no assignments yet.</Typography.Text>
        </div>
    )

    if (assignments.length > 0) {
        assignmentsHTML = assignments.map((assignment, index) => {
            return (
                <Col span={8} key={index}>
                    <Card hoverable={true} title={assignment.name} bordered={true} assignmentid={assignment.id} onClick={() => setAssignment({ 'name': assignment.name, 'id': assignment.id })}>
                        <p style={{ fontSize: 'smaller' }}>{assignment.due}</p>
                        <p style={{ fontSize: 'smaller' }}>{course.name}</p>
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