import React from "react";
import "./Field.css";

function Time({ label, name }) {
    return (
        <div className="field-container">
            <label className="field-label">{label}</label>
            <input
                className="field-input"
                type="date"
                name={name}
                required
            />
        </div>
    );
}

export default Time;
