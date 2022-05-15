import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row, Divider } from 'antd'
import axios from "axios";
import JoinCourse from "../JoinCourse/JoinCourse";
import './Courses.css'

const Courses = ({ token, setCourse, refresh, setRefresh }) => {

    const BASE_URL = 'http://192.168.1.10:5000/courses'

    const [courses, setCourses] = useState(1)

    useEffect(() => {
        let params = {
            user_id: sessionStorage.getItem('id')
        }

        axios.get(BASE_URL, { params }).then((res) => {
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
                    <Card hoverable={true} title={course.name} bordered={true} courseid={course.id} onClick={() => {
                        console.log('hihi', course)
                        setCourse({ 'name': course.name, 'id': course.id, 'created_by': course.created_by })
                    }
                    }>
                        {/* <p style={{ fontSize: 'smaller' }}>{course.class}</p>
                        <p style={{ fontSize: 'smaller' }}>{course.school}</p>
                        <p style={{ fontSize: 'smaller' }}>{course.teacher.name}</p>
                        <p style={{ fontSize: 'smaller' }}>Sĩ số: {course.total}</p> */}
                        <Card.Grid hoverable={false} style={{
                            width: '50%',
                            textAlign: 'center',
                        }}>
                            <p className="course-card-content" >Lớp: {course.class}</p>
                            <p className="course-card-content" >Giáo viên: {course.teacher.name}</p>
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{
                            width: '50%',
                            textAlign: 'center',
                        }}>
                            <p className="course-card-content" >Sĩ số: {course.total}</p>
                            <p className="course-card-content" >Trường: {course.school}</p>
                        </Card.Grid>

                    </Card>
                </Col>
            )
        })
    }
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {coursesHTML}
                <JoinCourse></JoinCourse>
            </Row>
        </div>
    )
}

export default Courses