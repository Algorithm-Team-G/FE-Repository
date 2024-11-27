import React from "react";
import "./Field.css";

function TaskField({ jobOptions }) {
    return (
        <div className="field-container">
            <label className="field-label">Task Field</label>
            <select className="field-input" name="job">
                {jobOptions.map((job, index) => (
                    <option key={index} value={job}>
                        {job}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TaskField;
