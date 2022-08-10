// https://codepen.io/sumitmsn/pen/yLXXBZZ
import React, { useEffect, useState } from "react";
import { EllipsisOutlined } from '@ant-design/icons';
import './Leaderboard.css'
import axios from "axios";

const Leaderboard = ({ setCourse }) => {

    const BASE_URL = "http://127.0.0.1:5000"

    const [courses, setCourses] = useState([])
    const [coursesHtml, setCoursesHtml] = useState([])

    const toCoursePage = (course) => {
        setCourse(course)
    }

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}` },
            params: {
                student_id: sessionStorage.getItem("id"),
            }
        };

        axios.get(BASE_URL + "/grading/courses", config).then(res => {
            setCourses(res.data.courses)
            setCoursesHtml(res.data.courses.map((c, i) => {
                return (
                    <div class="leader" key={i} onClick={() => toCoursePage(c)}>
                        <div class="leaderboard-user">
                            <div class="leaderboard-number">{i}</div>
                            <div class="leaderboard-user-pic"></div>
                        </div>
                        <div class="leaderboard-user-info">
                            <div class="leaderboard-user-name">{c.name}</div>
                            <div class="leaderboard-view-count"></div>
                        </div>
                        <div class="leaderboard-gallery">
                            <div class="leaderboard-gallery-item">
                                <div>{c.avg_score.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                )
            }))
        })
    }, [])

    return (
        <div class="leaderboard-frame">
            <header>Course average score</header>
            <div class='leaderboard-button-group' dataLeft='4px'>
                {/* <button>Last 30 days</button>
                <button>All time</button> */}
            </div>
            <div class="leaderboard-score-card">
                {coursesHtml}
            </div>
            {/* <button class="cta-primary">Load more</button> */}
        </div>
    )
}

export default Leaderboard