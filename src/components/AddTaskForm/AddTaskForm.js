import React from "react";
import "./AddTaskForm.css";
import TaskField from "./fields/TaskField";
import TaskName from "./fields/TaskName";
import Importance from "./fields/Importance";
import Level from "./fields/Level";
import Time from "./fields/Time";

function AddTaskForm({ onSubmit, jobOptions }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskData = Object.fromEntries(formData.entries());
        taskData.importance = parseInt(taskData.importance, 10);
        taskData.level = parseInt(taskData.level, 10);
        onSubmit(taskData);
        e.target.reset();
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <TaskName />
            <TaskField jobOptions={jobOptions} />
            <Importance />
            <Level />
            <Time label="Begin" name="begin" />
            <Time label="End" name="end" />
            <button type="submit" className="add-task-button">
                Add Task
            </button>
        </form>
    );
}

export default AddTaskForm;
