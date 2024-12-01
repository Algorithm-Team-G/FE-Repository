import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TaskList from "../../components/TaskList/TaskList";
import Header from "../../components/Header/Header";
import { assignTasks, getUnassignedTasks } from "../../API/taskApi";
import "./SelectTaskPage.css";

// jobOptions 문자열을 job_id로 매핑
const jobIdMapping = {
    "프론트엔드": 1,
    "백엔드": 2,
    "AI": 3,
    "디자이너": 4,
};

function SelectTaskPage() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const navigate = useNavigate();
    const jobOptions = Object.keys(jobIdMapping); // "프론트엔드", "백엔드", "AI", "디자이너"

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getUnassignedTasks();
                console.log("Fetched tasks:", data); // API 데이터 확인
                setTasks(data); // API 데이터 상태에 저장
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = (newTask) => {
        const mappedTask = {
            ...newTask,
            job_id: jobIdMapping[newTask.job_field], // job_field를 job_id로 변환
        };
        setTasks([...tasks, mappedTask]);
    };

    const handleTaskSelect = (task, isSelected) => {
        if (!task || !task.id) {
            console.error("Invalid task object during selection:", task);
            return;
        }
        if (isSelected) {
            setSelectedTasks([...selectedTasks, task.id]);
        } else {
            setSelectedTasks(selectedTasks.filter((id) => id !== task.id));
        }
    };


    const handleCreateSchedule = async () => {
        console.log("Selected task IDs to send to backend:", selectedTasks);

        if (!selectedTasks || selectedTasks.length === 0) {
            console.error("No tasks selected. Current selectedTasks:", selectedTasks);
            alert("Please select at least one task!");
            return;
        }

        try {
            const response = await assignTasks(selectedTasks);
            console.log("Response from backend:", response);
            navigate("/solution", { state: { schedule: response } });
        } catch (error) {
            console.error("Error while assigning tasks:", error);
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