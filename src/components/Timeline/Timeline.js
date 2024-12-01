import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동
import { getAssignedTasks } from "../../API/taskApi"; // API 사용
import "./Timeline.css";

const Timeline = () => {
    const [teams, setTeams] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // 페이지 이동 훅

    const today = new Date(); // 오늘 날짜
    const days = 7; // 일주일 기준

    // 날짜 생성 함수
    const getDates = () => {
        return Array.from({ length: days }, (_, i) => {
            const date = new Date();
            date.setDate(today.getDate() + i);
            return date.toISOString().split("T")[0];
        });
    };

    const dateHeaders = getDates();

    // API 호출 및 데이터 설정
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAssignedTasks(); // API 호출
                setTeams(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="timeline-container">
            {/* 날짜 헤더 */}
            <div className="date-header">
                <div className="side-space"></div>
                {dateHeaders.map((date, index) => (
                    <div key={index} className="date">
                        {date}
                    </div>
                ))}
            </div>

            {/* 타임라인 */}
            <div className="timeline">
                {Object.entries(teams).map(([teamId, team]) => (
                    <div key={teamId} className="team">
                        <div className="role">{team.name}</div>
                        {Object.entries(team.workers).map(([workerId, worker]) => (
                            <div key={workerId} className="worker-row">
                                <div className="worker-name">{worker.name}</div>
                                <div className="task-bars">
                                    {worker.tasks.map((task, index) => {
                                        const startDate = new Date(task.begin);
                                        const startOffset = Math.max(
                                            Math.round((startDate - today) / (1000 * 60 * 60 * 24)),
                                            0
                                        );
                                        const taskWidth = task.duration * 14; // 작업 기간에 따라 막대 길이 결정

                                        return (
                                            <div
                                                key={index}
                                                className="task-bar"
                                                style={{
                                                    left: `${startOffset * 14}vw`, // 시작 위치
                                                    width: `${taskWidth}vw`, // 지속 시간만큼 길이 설정
                                                    backgroundColor: getRandomColor(), // 랜덤 색상
                                                }}
                                            >
                                                {task.title}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Add Task 버튼 */}
            <button
                className="add-task-button"
                onClick={() => navigate("/select")} // Select 페이지로 이동
            >
                Add Task
            </button>
        </div>
    );
};

// 색상 생성 함수
const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F0E68C", "#FF69B4"];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default Timeline;
