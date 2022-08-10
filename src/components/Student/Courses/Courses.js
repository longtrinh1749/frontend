import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row, Divider } from 'antd'
import axios from "axios";
import JoinCourse from "../JoinCourse/JoinCourse";
import './Courses.css'

const Courses = ({ token, setCourse, refresh, setRefresh, setSortOptions, sort, setFilterOptions, filter }) => {

    const BASE_URL = 'http://127.0.0.1:5000/courses'

    const [courses, setCourses] = useState(1)

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                user_id: sessionStorage.getItem('id')
            }
        };

        axios.get(BASE_URL, config).then((res) => {
            setCourses(res.data.courses)
        })
        setSortOptions([
            {
                value: 'name',
                display: 'Name'
            },
            {
                value: 'total',
                display: 'Total students'
            },
            {
                value: 'class',
                display: 'Class'
            }
        ])
        setFilterOptions([])
    }, [refresh])

    useEffect(() => {
        if (sort) {
            console.log('Sort', sort)
            if (sort.type == 'name') {
                console.log('Sort name', sort)
                let new_courses = courses.sort((a, b) => {
                    let as = a.name.split(' ')
                    let bs = b.name.split(' ')
                    return as.join(' ').localeCompare(bs.join(' '))
                })
                console.log(new_courses)
                setCourses(new_courses)
            } else if (sort.type == 'total') {
                courses.sort((a, b) => {
                    return a.total - b.total
                })
            } else if (sort.type == 'class') {
                courses.sort((a, b) => {
                    if (!a.class) {
                        a.class = ''
                    }
                    if (!b.class) {
                        b.class = ''
                    }
                    return a.class.localeCompare(b.class)
                })
            }
            if (sort.direction == 'desc') {
                courses.reverse()
            }
        }
        console.log(courses)
    }, [sort])

    useEffect(() => {
        console.log('Filter', filter)
        if (filter) {
            console.log('Filter', filter)
            let newCourses = []
            for (let i = 0; i < courses.length; i++) {
                let checked = true
                if (filter.name) {
                    if (!courses[i].name.includes(filter.name)) {
                        checked = false
                    }
                }
                if (checked) {
                    newCourses.push(courses[i])
                }
            }
            setCourses(newCourses)
        }
        console.log('Filter student', courses)
    }, [filter])

    let coursesHTML = (
        <div></div>
    )
    if (courses?.length > 0) {
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