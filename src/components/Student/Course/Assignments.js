import React, { useEffect, useState } from "react";
import { Card, Col, Row, Divider } from 'antd'
import LeaveCourse from '../LeaveCourse/LeaveCourse'
import CourseInfo from '../../Common/CourseInfo/CourseInfo'
import axios from "axios";

const Assignments = ({ token, course, setAssignment, setBrCrumb }) => {

    const BASE_URL = 'http://192.168.1.13:5000/assignments'

    const [assignments, setAssignments] = useState(1)

    useEffect(() => {
        let params = {
            course_id: course.id
        }

        axios.get(BASE_URL, {params}).then((res) => {
            setAssignments(res.data.assignments)
        })
    }, [])

    let assignmentsHTML = (
        <div></div>
    )

    if (assignments.length > 0) {
        assignmentsHTML = assignments.map((assignment, index) => {
            return (
                <Col span={8} key={index}>
                <Card title={assignment.name} bordered={true} assignmentid={assignment.id} onClick={() => setAssignment({'name': assignment.name, 'id': assignment.id})}>
                    <p style={{fontSize: 'smaller'}}>{assignment.due}</p>
                    <p style={{fontSize: 'smaller'}}>{course.name}</p>
                </Card>
            </Col>
            )
        })
    }
    return (
        <div className="site-card-wrapper">
            <LeaveCourse course={course} leaveCourse={setBrCrumb}></LeaveCourse>
            <Divider />
            <Row gutter={16}>
                {assignmentsHTML}
            </Row>
        </div>
    )
}

export default Assignments