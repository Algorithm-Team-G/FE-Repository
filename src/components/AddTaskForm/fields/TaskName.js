import React from "react";
import "./Field.css";

function TaskName() {
    return (
        <div className="field-container">
            <label className="field-label">Task Name</label>
            <input
                className="field-input"
                type="text"
                name="title"
                required
            />
        </div>
    );
}

export default TaskName;
