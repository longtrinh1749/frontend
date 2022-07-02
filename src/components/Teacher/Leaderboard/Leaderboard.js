// https://codepen.io/mubangadv/pen/YzKGGaL

import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Leaderboard.css'

const Leaderboard = () => {
    const BASE_URL = "http://192.168.1.12:5000"
    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState()
    const [coursesHtml, setCoursesHtml] = useState([])
    const [students, setStudents] = useState([])
    const [studentsTop1, setStudentsTop1] = useState([])
    const [studentsTop2, setStudentsTop2] = useState([])
    const [studentsTop3, setStudentsTop3] = useState([])
    const [studentsNotTop, setStudentsNotTop] = useState([])

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                user_id: sessionStorage.getItem("id")
            }
        };
        axios.get(BASE_URL + "/courses", config).then(res => {
            setCourses(res.data.courses)
            setCourse(res.data.courses[0])
            setCoursesHtml(res.data.courses.map((c, i) => {
                return (
                    <Option key={i} value={"course" + i}>{c.name}</Option>
                )
            }))
        })
    }, [])

    useEffect(() => {
        if (course != undefined) {
            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
                params: {
                    course_id: course.id,
                    display: 0
                }
            };

            axios.get(BASE_URL + "/grading/students", config).then(res => {
                setStudents(res.data.students)
                if (res.data.students.length > -1) {
                    setStudentsTop1((
                        <div className="one item">
                            <div className="pos">
                                1
                            </div>
                            <div className="pic" style={{ backgroundImage: `url("https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png")` }}></div>
                            <div className="name">
                                {res.data.students[0].name}
                            </div>
                            <div className="leaderboard-score">
                                {res.data.students[0].avg_score.toFixed(2)}/10
                            </div>
                        </div>
                    ))
                } else {
                    setStudentsTop1()
                }
                if (res.data.students.length > 0) {
                    setStudentsTop2((
                        <div className="two item">
                            <div className="pos">
                                2
                            </div>
                            <div className="pic" style={{ backgroundImage: `url("https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png")` }}></div>
                            <div className="name">
                                {res.data.students[1].name}
                            </div>
                            <div className="leaderboard-score">
                                {res.data.students[1].avg_score.toFixed(2)}/10
                            </div>
                        </div>
                    ))
                } else {
                    setStudentsTop2((<div></div>))
                }
                if (res.data.students.length > 1) {
                    setStudentsTop3((
                        <div className="three item">
                            <div className="pos">
                                3
                            </div>
                            <div className="pic" style={{ backgroundImage: `url("https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png")` }}></div>
                            <div className="name">
                                {res.data.students[2].name}
                            </div>
                            <div className="leaderboard-score">
                                {res.data.students[2].avg_score.toFixed(2)}/10
                            </div>
                        </div>
                    ))
                } else {
                    setStudentsTop3((<div></div>))
                }
                setStudentsNotTop(res.data.students.map((s, i) => {
                    if (i > 2) {
                        return (
                            <div className="item" key={i}>
                                <div className="pos">
                                    {i + 1}
                                </div>
                                <div className="pic" style={{ backgroundImage: `url("https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png")` }}></div>
                                <div className="name">
                                    {s.name}
                                </div>
                                <div className="leaderboard-score">
                                    {s.avg_score.toFixed(2)}/10
                                </div>
                            </div>
                        )
                    }
                }))
            })
        }
    }, [course])

    const { Option } = Select
    const handleChange = (value) => {
        let courseIndex = value.split("course")[1]
        setCourse(courses[courseIndex])
        console.log(courses[courseIndex]);
    };
    return (
        <div className="leaderboard-center">
            <header>Leaderboard</header>
            <Select
                className="leaderboard-courses-selection"
                style={{ width: 240 }}
                onChange={handleChange}
                defaultValue="course0"
            >
                {coursesHtml}
            </Select>
            <div className="top3">
                {studentsTop2}
                {studentsTop1}
                {studentsTop3}
            </div>
            <div className="list">
                {studentsNotTop}
                <button className="cta-primary">Load more</button>
            </div>
        </div>
    )
}

export default Leaderboard