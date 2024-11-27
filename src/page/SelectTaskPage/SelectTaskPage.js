import React, { useState } from "react";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TaskList from "../../components/TaskList/TaskList";
import Header from "../../components/Header/Header";
import { assignTasks, getUnassignedTasks } from "../../API/taskApi"; // 수정된 API import
import "./SelectTaskPage.css";

function SelectTaskPage() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const jobOptions = ["Front-End Developer", "Back-End Developer", "UI Designer", "Database Administrator"];

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleTaskSelect = (task, isSelected) => {
        if (isSelected) {
            setSelectedTasks([...selectedTasks, task]);
        } else {
            setSelectedTasks(selectedTasks.filter((t) => t !== task));
        }
    };

    const handleCreateSchedule = () => {
        console.log("Selected Tasks:", selectedTasks);
        assignTasks(selectedTasks)
            .then(() => alert("Tasks have been scheduled!"))
            .catch((error) => console.error("Error:", error));
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
