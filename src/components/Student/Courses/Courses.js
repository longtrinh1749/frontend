import React, { useState, useEffect } from "react";
import { Card, Col, Row, Divider } from 'antd'
import axios from "axios";
import JoinCourse from "../JoinCourse/JoinCourse";

const Courses = ({ token, setCourse }) => {

    const BASE_URL = 'http://192.168.1.13:5000/courses'

    const [courses, setCourses] = useState(1)

    useEffect(() => {
        let params = {
            user_id: 12
        }

        axios.get(BASE_URL, { params }).then((res) => {
            setCourses(res.data.courses)
        })
    }, [])
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
            <JoinCourse></JoinCourse>
            <Divider />
            <Row gutter={16}>
                {coursesHTML}
            </Row>
        </div>
    )
}

export default Courses