import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, onTaskSelect }) => {
    const handleChange = (task, isChecked) => {
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
                            <span>{task.title}</span> ({task.team})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
