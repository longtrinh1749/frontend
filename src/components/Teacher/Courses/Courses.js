import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Row } from 'antd'
import axios from "axios";

const Courses = ({ token, setCourse }) => {

    const BASE_URL = 'http://192.168.1.13:5000/courses'

    const [courses, setCourses] = useState(1)

    useEffect(() => {
        let params = {
            userId: 1
        }

        axios.get(BASE_URL,{params}).then((res) => {
            console.log(res.courses)
            setCourses(res.data.courses)
        })
    }, [])

    // const callGetCourses = (token) => {
    //     // let data = {
    //     //     "user_id": 1
    //     // }
    //     return fetch(BASE_URL + new URLSearchParams({
    //         user_id: 1,
    //     })).then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             courses.current = data
    //         })

    //     // return {
    //     //     "courses": [
    //     //         {
    //     //             "id": 3,
    //     //             "name": "Tieng Viet lop 2",
    //     //             "class": "2A2",
    //     //             "school": "TH Tan Dinh",
    //     //             "school_year": '0 - 1',
    //     //             "created_by": 1
    //     //         },
    //     //         {
    //     //             "id": 4,
    //     //             "name": "Toan lop 2",
    //     //             "class": "2A2",
    //     //             "school": "TH Tan Dinh",
    //     //             "school_year": '0 - 1', 
    //     //             "created_by": 1
    //     //         }
    //     //     ]
    //     // }
    // }
    // // let courses = callGetCourses().courses
    // callGetCourses()

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