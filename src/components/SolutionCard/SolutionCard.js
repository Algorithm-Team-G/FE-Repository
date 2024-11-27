import React from "react";
import "./SolutionCard.css";

function SolutionCard({ solution, isSelected, onSelect }) {
    const handleSelect = () => {
        onSelect(solution.id);
    };

    return (
        <div
            className={`solution-card ${isSelected ? "selected" : ""}`}
            onClick={handleSelect}
        >
            <h2>{solution.name}</h2>
            <div className="solution-teams">
                {solution.teams.map((team) => (
                    <div key={team.teamId} className="team">
                        <h3>{team.name}</h3>
                        <ul>
                            {team.members.map((member) => (
                                <li key={member.id}>
                                    {member.name} - {member.tasks.map((task) => task.name).join(", ")}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SolutionCard;
