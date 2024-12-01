import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, onTaskSelect }) => {
    console.log("Tasks passed to TaskList:", tasks); // 데이터 디버깅

    const handleChange = (task, isChecked) => {
        if (!task || !task.id) {
            console.error("Invalid task object:", task);
            return;
        }
        onTaskSelect(task, isChecked);
    };

    return (
        <div className="task-list">
            <h3>Unassigned Tasks</h3>
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                onChange={(e) => handleChange(task, e.target.checked)}
                            />
                            <span>{task.title}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
