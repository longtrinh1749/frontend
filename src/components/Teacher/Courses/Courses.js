import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Divider, Row, Button, Modal } from 'antd'
import axios from "axios";
import CreateCourse from "../CreateCourse/CreateCourse";

const Courses = ({ token, setCourse, refresh, setRefresh }) => {

    let BASE_URL = 'http://192.168.1.13:5000/courses'

    // Courses List

    const [courses, setCourses] = useState(1)
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('call courses')
        let params = {
            user_id: sessionStorage.getItem('id')
        }

        axios.get(BASE_URL, { params }).then((res) => {
            console.log(res.data.courses)
            setCourses(res.data.courses)
        })
    }, [refresh])

    let coursesHTML = (
        <div></div>
    )
    if (courses.length > 0) {
        coursesHTML = courses.map((course, index) => {
            return (
                <Col span={8} key={index}>
                    <Card title={course.name} bordered={true} courseid={course.id} onClick={() => setCourse({ 'name': course.name, 'id': course.id })}>
                        <p style={{ fontSize: 'smaller' }}>{course.class}</p>
                        <p style={{ fontSize: 'smaller' }}>{course.school}</p>
                    </Card>
                </Col>
            )
        })
    }

    return (
        <div className="site-card-wrapper">
            <CreateCourse setCount={setCount} count={count}></CreateCourse>
            <Divider />
            <Row gutter={16}>
                {coursesHTML}
            </Row>
        </div>
    )
}

export default Courses