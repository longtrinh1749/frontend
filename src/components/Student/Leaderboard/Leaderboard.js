// https://codepen.io/sumitmsn/pen/yLXXBZZ
import React from "react";
import { EllipsisOutlined } from '@ant-design/icons';
import './Leaderboard.css'

const Leaderboard = () => {

    return (
        <div class="leaderboard-frame">
            <header>Course average score</header>
            <div class='leaderboard-button-group' dataLeft='4px'>
                {/* <button>Last 30 days</button>
                <button>All time</button> */}
            </div>
            <div class="leaderboard-score-card">
                <div class="leader">
                    <div class="leaderboard-user">
                        <div class="leaderboard-number">1</div>
                        <div class="leaderboard-user-pic"></div>
                    </div>
                    <div class="leaderboard-user-info">
                        <div class="leaderboard-user-name">Thể dục lớp 2</div>
                        <div class="leaderboard-view-count"></div>
                    </div>
                    <div class="leaderboard-gallery">
                        <div class="leaderboard-gallery-item"> 
                        <div>10</div>
                        </div>
                    </div>
                </div>
                <div class="leader">
                    <div class="leaderboard-user">
                        <div class="leaderboard-number">2</div>
                        <div class="leaderboard-user-pic"></div>
                    </div>
                    <div class="leaderboard-user-info">
                        <div class="leaderboard-user-name">Tự nhiên xã hội lớp 2</div>
                    </div>
                    <div class="leaderboard-gallery">
                        <div class="leaderboard-gallery-item"> 9.5 </div>
                    </div>
                </div>
                <div class="leader">
                    <div class="leaderboard-user">
                        <div class="leaderboard-number">3</div>
                        <div class="leaderboard-user-pic"></div>
                    </div>
                    <div class="leaderboard-user-info">
                        <div class="leaderboard-user-name">Đạo đức lớp 2</div>
                    </div>
                    <div class="leaderboard-gallery">
                        <div class="leaderboard-gallery-item"> 8.5 </div>
                    </div>
                </div>
                <div class="leader">
                    <div class="leaderboard-user">
                        <div class="leaderboard-number">4</div>
                        <div class="leaderboard-user-pic"></div>
                    </div>
                    <div class="leaderboard-user-info">
                        <div class="leaderboard-user-name">Tiếng Anh lớp 2</div>
                    </div>
                    <div class="leaderboard-gallery">
                        <div class="leaderboard-gallery-item"> 7.5 </div>
                    </div>
                </div>
                <div class="leader">
                    <div class="leaderboard-user">
                        <div class="leaderboard-number">5</div>
                        <div class="leaderboard-user-pic"></div>
                    </div>
                    <div class="leaderboard-user-info">
                        <div class="leaderboard-user-name">Tiếng Việt lớp 2</div>
                    </div>
                    <div class="leaderboard-gallery">
                        <div class="leaderboard-gallery-item"> 7 </div>
                    </div>
                </div>
                <div class="leader">
                    <div class="leaderboard-user">
                        <div class="leaderboard-number">6</div>
                        <div class="leaderboard-user-pic"></div>
                    </div>
                    <div class="leaderboard-user-info">
                        <div class="leaderboard-user-name">Toán lớp 2</div>
                    </div>
                    <div class="leaderboard-gallery">
                        <div class="leaderboard-gallery-item"> 6 </div>
                    </div>
                </div>
            </div>
            {/* <button class="cta-primary">Load more</button> */}
        </div>
    )
}

export default Leaderboard