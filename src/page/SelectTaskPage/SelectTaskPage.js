import React, { useState, useEffect } from "react";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TaskList from "../../components/TaskList/TaskList";
import Header from "../../components/Header/Header";
import { assignTasks, getUnassignedTasks } from "../../API/taskApi"; // 수정된 API import
import "./SelectTaskPage.css";

function SelectTaskPage() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const jobOptions = ["Front-End Developer", "Back-End Developer", "UI Designer", "Database Administrator"];

    // API로 분배되지 않은 업무 가져오기
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getUnassignedTasks();
                setTasks(data); // API 데이터 상태에 저장
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    // 새 업무 추가
    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    // 업무 선택 관리
    const handleTaskSelect = (task, isSelected) => {
        if (isSelected) {
            setSelectedTasks([...selectedTasks, task]);
        } else {
            setSelectedTasks(selectedTasks.filter((t) => t.id !== task.id));
        }
    };

    // 선택된 업무 스케줄 생성
    const handleCreateSchedule = async () => {
        if (selectedTasks.length === 0) {
            alert("Please select at least one task!");
            return;
        }

        try {
            await assignTasks(selectedTasks.map((task) => task.id));
            alert("Tasks have been scheduled!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to schedule tasks.");
        }
    };

    return (
        <div className="select-task-page">
            <Header />
            <div className="task-form-container">
                <TaskList tasks={tasks} onTaskSelect={handleTaskSelect} />
                <AddTaskForm onSubmit={handleAddTask} jobOptions={jobOptions} />
            </div>
            <button className="create-schedule-button" onClick={handleCreateSchedule}>
                Create Schedule
            </button>
        </div>
    );
}

export default SelectTaskPage;
