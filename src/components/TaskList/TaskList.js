import React, { useState } from "react";
import "./TaskList.css";

function TaskList({ tasks, onTaskSelect }) {
    const [selectedTasks, setSelectedTasks] = useState([]);

    const handleSelectTask = (taskId) => {
        const isSelected = selectedTasks.includes(taskId);
        const updatedSelectedTasks = isSelected
            ? selectedTasks.filter((id) => id !== taskId)
            : [...selectedTasks, taskId];

        setSelectedTasks(updatedSelectedTasks);
        onTaskSelect(taskId, !isSelected);
    };

    return (
        <div className="task-list">
            <h3>Task List</h3>
            <ul>
                {tasks.map((task) => (
                    <li key={task.title}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedTasks.includes(task.title)}
                                onChange={() => handleSelectTask(task.title)}
                            />
                            {task.title}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
