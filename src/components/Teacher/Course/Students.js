import React from "react";
import { Card, Col, Row } from 'antd'

const Students = ({setStudent, course, assignment}) => {

    const BASE_URL = 'http://192.168.1.13:5000/students?'

    const callGetStudents = (token) => {
        let data = {
            "user_id": 1,
            "course_id": 3,
            "assignment_id": 4
        }
        // return fetch(BASE_URL + new URLSearchParams({
        //     user_id: 1,
        // })).then(response => response.json())
        // .then(data => console.log(data))
        return {
            "students": [
                {
                    "id": 3,
                    "name": "Tran Quang Khai",
                },
                {
                    "id": 4,
                    "name": "Trieu Man",
                }
            ]
        }
    }
    let students = callGetStudents().students
    const studentsHTML = students.map((student, index) => {
        return (
            <Col span={8} key={index}>
                <Card title={student.name} bordered={true} studentid={student.id} onClick={() => setStudent({'name': student.name, 'id': student.id})}>
                    <p style={{fontSize: 'smaller'}}>{student.name}</p>
                </Card>
            </Col>
        )
    })
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {studentsHTML}
            </Row>
        </div>
    )
}

export default Students