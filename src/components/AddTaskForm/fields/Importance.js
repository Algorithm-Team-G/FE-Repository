import React from "react";
import "./Field.css";

function Importance() {
    return (
        <div className="field-container">
            <label className="field-label">Importance</label>
            <input
                className="field-input"
                type="number"
                name="importance"
                min="1"
                max="5"
                required
            />
        </div>
    );
}

export default Importance;
