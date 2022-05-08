import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography } from 'antd'
import axios from "axios";

const Students = ({ setStudent, course, assignment, refresh }) => {

    const BASE_URL = 'http://192.168.1.10:5000/users/course/students'

    const [students, setStudents] = useState(1)

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
    }, [refresh])
    let studentsHTML = (
        <div></div>
    )
    if (students.length) {
        studentsHTML = students.map((student, index) => {
            return (
                <Col span={8} key={index}>
                    <Card hoverable={true} bordered={true} studentid={student.id} onClick={() => setStudent({ 'name': student.name, 'id': student.id })}>
                        <p className="course-card-content" style={{display: 'inline-block'}}>Học sinh: {student.name}</p>
                        <p className="course-card-content" style={{display: 'inline-block', float: 'right'}}><Typography.Text type="warning">{student.status == 'graded' ? 'Đã chấm' : (student.status == 'handed in' ? 'Chưa chấm' : 'Chưa nộp')}</Typography.Text></p>
                    </Card>
                </Col>
            )
        })
    }

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {studentsHTML}
            </Row>
        </div>
    )
}

export default Students