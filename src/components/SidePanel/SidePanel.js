import React from "react";
import "./SidePanel.css";

const SidePanel = ({ teams }) => {
    return (
        <div className="side-panel">
            {Object.entries(teams).map(([teamId, teamData]) => (
                <div key={teamId} className="team-section">
                    <h3 className="team-name">{teamData.name}</h3>
                    {Object.values(teamData.workers).map((worker) => (
                        <div key={worker.name} className="worker-item">
                            <div className="worker-icon"></div>
                            <span className="worker-name">{worker.name}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SidePanel;
