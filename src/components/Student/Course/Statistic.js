import React, { useState } from "react";
import { Button, Modal } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js'

const Statistic = ({ assignments }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    console.log("Assignment day", assignments)
    const UserData = [
        {
            id: 1,
            year: 'Các thế hệ trong gia đình 3',
            userGain: 9,
        },
        {
            id: 2,
            year: 'Nghề nghiệp của người lớn trong gia đình',
            userGain: 5,
        },
        {
            id: 3,
            year: 'Phòng tránh ngộ độc khi ở nhà',
            userGain: 7,
        },
        {
            id: 4,
            year: 'Giữ sạch nhà ở',
            userGain: 0,
        },
        {
            id: 5,
            year: 'Ôn tập chủ đề gia đình',
            userGain: 0,
        },
    ];
    let userData = {
        labels: ""
    }
    if (assignments) {
        userData = {
            labels: assignments.map((data) => data.name),
            datasets: [
                {
                    label: "Score",
                    data: assignments.map((data) => data.score),
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#ecf0f1",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0",
                    ],
                    borderColor: "black",
                    borderWidth: 2,
                },
            ],
        }
    }

    return (
        <>
            <Button type="primary" size="large" onClick={showModal} style={{
                float: 'right',
                marginRight: '10px',
            }}>
                Your Progress
            </Button>
            <Modal
                title="Your Progress"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <Bar
                    data={userData}
                />
            </Modal>
        </>
    );
}

export default Statistic