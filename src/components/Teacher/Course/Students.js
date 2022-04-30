import React, { useEffect, useState } from "react";
import { Card, Col, Row } from 'antd'
import axios from "axios";

const Students = ({ setStudent, course, assignment }) => {

    const BASE_URL = 'http://192.168.1.13:5000/users/course/students'

    const [students, setStudents] = useState(1)

    useEffect(() => {
        console.log('Call get all students within course')
        let params = {
            course_id: course.id
        }

        axios.get(BASE_URL, { params }).then((res) => {
            console.log(res.data.students)
            setStudents(res.data.students)
        })
    }, [])
    let studentsHTML = (
        <div></div>
    )
    if (students.length) {
        studentsHTML = students.map((student, index) => {
            return (
                <Col span={8} key={index}>
                    <Card title={student.name} bordered={true} studentid={student.id} onClick={() => setStudent({ 'name': student.name, 'id': student.id })}>
                        <p style={{ fontSize: 'smaller' }}>{student.name}</p>
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