import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Divider, Row, Button, Modal } from 'antd'
import axios from "axios";
import CreateCourse from "../CreateCourse/CreateCourse";

const Courses = ({ token, setCourse, refresh, setRefresh, setSortOptions, sort, setFilterOptions, filter }) => {

    let BASE_URL = 'http://192.168.1.12:5000/courses'

    // Courses List

    const [courses, setCourses] = useState(1)
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('call courses')
        let params = {
            user_id: sessionStorage.getItem('id')
        }

        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                user_id: sessionStorage.getItem('id')
            }
        };

        axios.get(BASE_URL, config).then((res) => {
            console.log(res.data.courses)
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
                    courses.sort((a, b) => {
                        return a.total - b.total
                    })
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
    if (courses.length > 0) {
        coursesHTML = courses.map((course, index) => {
            return (
                <Col span={8} key={index}>
                    <Card hoverable={true} title={course.name} bordered={true} courseid={course.id} onClick={() => {
                        console.log('hihi', course)
                        setCourse({ 'name': course.name, 'id': course.id, 'total': course.total, 'created_by': course.created_by })
                    }
                    }
                        style={{
                            textAlign: 'center',
                        }}>
                        <Card.Grid hoverable={false} style={{
                            width: '50%',
                            textAlign: 'center',
                        }}>
                            <p className="course-card-content">Lớp: {course.class}</p>
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{
                            width: '50%',
                            textAlign: 'center',
                        }}>
                            <p className="course-card-content">Sĩ số: {course.total}</p>
                        </Card.Grid>
                        <p className="course-card-content">Năm học: {course.school_year}</p>
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