import React from "react";
import { Card, Col, Row, Divider } from 'antd'
import LeaveCourse from '../LeaveCourse/LeaveCourse'
import CourseInfo from '../../Common/CourseInfo/CourseInfo'

const Assignments = ({ token, course, setAssignment, setBrCrumb }) => {

    const BASE_URL = 'http://192.168.1.13:5000/assignments?'

    const callGetAssignments = (token) => {
        let data = {
            "user_id": 1,
            "course_id": 3,
        }
        // return fetch(BASE_URL + new URLSearchParams({
        //     user_id: 1,
        // })).then(response => response.json())
        // .then(data => console.log(data))
        return {
            "assignments": [
                {
                    "id": 3,
                    "name": "Bai 5 SGK trang 23",
                    "due": "12:00 23/5/22"
                },
                {
                    "id": 4,
                    "name": "Bai 4 SGK trang 45",
                    "due": "12:00 23/5/22"
                }
            ]
        }
    }
    let assignments = callGetAssignments().assignments
    const assignmentsHTML = assignments.map((assignment, index) => {
        return (
            <Col span={8} key={index}>
                <Card title={assignment.name} bordered={true} assignmentid={assignment.id} onClick={() => setAssignment({'name': assignment.name, 'id': assignment.id})}>
                    <p style={{fontSize: 'smaller'}}>{assignment.due}</p>
                    <p style={{fontSize: 'smaller'}}>{course.name}</p>
                </Card>
            </Col>
        )
    })
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