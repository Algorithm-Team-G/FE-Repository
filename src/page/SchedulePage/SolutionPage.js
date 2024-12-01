import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SolutionPage.css";
import Header from "../../components/Header/Header";

function SolutionPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const schedule = location.state?.schedule || []; // 전달받은 스케줄 데이터
    const [selectedSolution, setSelectedSolution] = useState(null);

    const handleSelect = (index) => {
        setSelectedSolution(index);
    };

    const handleConfirm = () => {
        if (selectedSolution === null) {
            alert("Please select a solution!");
            return;
        }

        const selectedData = schedule[selectedSolution];
        navigate("/", { state: { solution: selectedData } });
    };

    return (
        <div className="solution-page">
            <Header />
            <div className="solution-container">
                {schedule.map((caseData, caseIndex) => (
                    <div
                        key={`case-${caseIndex}`}
                        className={`solution-card ${
                            selectedSolution === caseIndex ? "selected" : ""
                        }`}
                        onClick={() => handleSelect(caseIndex)}
                    >
                        <h2>Solution {String.fromCharCode(65 + caseIndex)}</h2>
                        {Object.entries(caseData).map(([teamId, teamData]) => (
                            <div key={`team-${teamId}`} className="team-section">
                                <h3>{teamData.name || "Unnamed Team"}</h3>
                                <ul>
                                    {teamData.workers &&
                                        Object.entries(teamData.workers).map(([workerId, worker]) => (
                                            <li key={`worker-${workerId}`}>
                                                {worker.name}:{" "}
                                                {worker.tasks
                                                    .map((task) => `${task.name} (Task ID: ${task.id})`)
                                                    .join(", ")}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button className="confirm-button" onClick={handleConfirm}>
                Confirm the solution!
            </button>
        </div>
    );
}

export default SolutionPage;
