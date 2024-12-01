import React from "react";
import "./AddTaskForm.css";
import TaskField from "./fields/TaskField";
import TaskName from "./fields/TaskName";
import Importance from "./fields/Importance";
import Level from "./fields/Level";
import Time from "./fields/Time";
import { addTask } from "../../API/taskApi"; // API 함수 임포트

// 날짜 변환 함수: ISO 8601 -> MySQL DATETIME 형식
const formatDateForMySQL = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function AddTaskForm({ onSubmit, jobOptions }) {
    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 기본 동작 방지

        const formData = new FormData(e.target);
        const taskData = Object.fromEntries(formData.entries());

        // 문자열 -> 숫자 매핑 (job -> jobId)
        const jobIdMapping = {
            "프론트엔드": 1,
            "백엔드": 2,
            "AI": 3,
            "디자이너": 4,
        };
        taskData.jobId = jobIdMapping[taskData.job];
        if (!taskData.jobId) {
            alert(`Invalid job type: ${taskData.job}`);
            return;
        }

        // 날짜 변환
        taskData.begin = formatDateForMySQL(taskData.begin);
        taskData.end = formatDateForMySQL(taskData.end);

        // 숫자 변환
        taskData.importance = parseInt(taskData.importance, 5);
        taskData.level = parseInt(taskData.level,5)

        // 불필요한 필드 제거
        delete taskData.job;

        console.log("Task data being sent:", taskData); // 디버깅용 로그

        try {
            const response = await addTask(taskData);
            console.log("Task added successfully:", response);

            // 부모 컴포넌트에 데이터 전달 (필요 시)
            onSubmit && onSubmit(response);

            // 폼 초기화
            e.target.reset();
        } catch (error) {
            console.error("Failed to add task:", error.response?.data || error.message);
            alert("Failed to add task. Please try again.");
        }
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <TaskName />
            <TaskField jobOptions={jobOptions} />
            <Importance />
            <Level/>
            <Time label="Begin" name="begin" />
            <Time label="End" name="end" />
            <button type="submit" className="add-task-button">
                Add Task
            </button>
        </form>
    );
}

export default AddTaskForm;
