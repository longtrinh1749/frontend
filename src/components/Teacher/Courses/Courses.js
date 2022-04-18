import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Row } from 'antd'
import axios from "axios";
import CreateCourse from "../CreateCourse/CreateCourse";

const Courses = ({ token, setCourse }) => {

    const BASE_URL = 'http://192.168.1.13:5000/courses'

    // Modal create course

    modalContent = (
        <CreateCourse></CreateCourse>
    )

    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const showModal = () {
        setVisible(true)
    }

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    // Courses List

    const [courses, setCourses] = useState(1)

    useEffect(() => {
        let params = {
            user_id: sessionStorage.getItem('id')
        }

        axios.get(BASE_URL, { params }).then((res) => {
            console.log(res.courses)
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
            <Row gutter={16}>
                {coursesHTML}
            </Row>
        </div>
    )
}

export default Courses