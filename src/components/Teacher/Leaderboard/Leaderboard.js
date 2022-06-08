// https://codepen.io/mubangadv/pen/YzKGGaL

import { Select } from "antd";
import React from "react";
import './Leaderboard.css'

const Leaderboard = () => {
    const { Option } = Select
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <div class="leaderboard-center">
            <header>Leaderboard</header>
            <Select
                className="leaderboard-courses-selection"
                defaultValue="jack"
                style={{ width: 240 }}
                onChange={handleChange}
            >
                <Option value="jack">Thể dục lớp 2</Option>
                <Option value="lucy">Tự nhiên xã hội lớp 2</Option>
                <Option value="Yiminghe">Đạo đức lớp 2</Option>
            </Select>
            <div class="top3">
                <div class="two item">
                    <div class="pos">
                        2
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/44.jpg")` }}></div>
                    <div class="name">
                        Trần Trung Hiếu
                    </div>
                    <div class="leaderboard-score">
                        9.5/10
                    </div>
                </div>
                <div class="one item">
                    <div class="pos">
                        1
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/44.jpg")` }}></div>
                    <div class="name">
                        Trần Trung Hiếu
                    </div>
                    <div class="leaderboard-score">
                        9.5/10
                    </div>
                </div>
                <div class="three item">
                    <div class="pos">
                        3
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/44.jpg")` }}></div>
                    <div class="name">
                        Trần Trung Hiếu
                    </div>
                    <div class="leaderboard-score">
                        9.5/10
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="item">
                    <div class="pos">
                        4
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/44.jpg")` }}></div>
                    <div class="name">
                        Trần Trung Hiếu
                    </div>
                    <div class="leaderboard-score">
                        9.5/10
                    </div>
                </div>
                <div class="item">
                    <div class="pos">
                        5
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/44.jpg")` }}></div>
                    <div class="name">
                        Trần Trung Hiếu
                    </div>
                    <div class="leaderboard-score">
                        9.5/10
                    </div>
                </div>
                <div class="item">
                    <div class="pos">
                        6
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/44.jpg")` }}></div>
                    <div class="name">
                        Trần Trung Hiếu
                    </div>
                    <div class="leaderboard-score">
                        9.5/10
                    </div>
                </div>
                <div class="item">
                    <div class="pos">
                        7
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/44.jpg")` }}></div>
                    <div class="name">
                        Trần Trung Hiếu
                    </div>
                    <div class="leaderboard-score">
                        9.5/10
                    </div>
                </div>
                <div class="item">
                    <div class="pos">
                        8
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/44.jpg")` }}></div>
                    <div class="name">
                        Trần Trung Hiếu
                    </div>
                    <div class="leaderboard-score">
                        9.5/10
                    </div>
                </div>
                {/* <div class="item">
                    <div class="pos">
                        9
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/men/44.jpg")` }}></div>
                    <div class="name">
                        Trần Trung Hiếu
                    </div>
                    <div class="leaderboard-score">
                        9.5/10
                    </div>
                </div> */}
                {/* <div class="item">
                    <div class="pos">
                        10
                    </div>
                    <div class="pic" style={{ backgroundImage: `url("https://randomuser.me/api/portraits/women/30.jpg")` }}></div>
                    <div class="name">
                        Joan Wood
                    </div>
                    <div class="leaderboard-score">
                        5674
                    </div>
                </div> */}
                <button class="cta-primary">Load more</button>
            </div>
        </div>
    )
}

export default Leaderboard