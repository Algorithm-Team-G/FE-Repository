import React from "react";
import "./Field.css";

function Level() {
    return (
        <div className="field-container">
            <label className="field-label">Level</label>
            <input
                className="field-input"
                type="number"
                name="level"
                min="1"
                max="5"
                required
            />
        </div>
    );
}

export default Level;
