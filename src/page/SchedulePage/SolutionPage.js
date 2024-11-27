import React, { useState } from "react";
import SolutionCard from "../../components/SolutionCard/SolutionCard";
import "./SolutionPage.css";
import Header2 from "../../components/Header/Header2";

function SolutionPage() {
    // 더미 데이터
    const dummySolutions = [
        {
            id: 1,
            name: "Solution A",
            teams: [
                {
                    teamId: 1,
                    name: "Frontend Team",
                    members: [
                        {
                            id: 1,
                            name: "Alice",
                            tasks: [{ id: 1, name: "Task 1" }, { id: 2, name: "Task 2" }],
                        },
                    ],
                },
                {
                    teamId: 2,
                    name: "Backend Team",
                    members: [
                        {
                            id: 2,
                            name: "Bob",
                            tasks: [{ id: 3, name: "Task 3" }],
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            name: "Solution B",
            teams: [
                {
                    teamId: 3,
                    name: "AI Team",
                    members: [
                        {
                            id: 3,
                            name: "Charlie",
                            tasks: [{ id: 4, name: "Task 4" }, { id: 5, name: "Task 5" }],
                        },
                    ],
                },
                {
                    teamId: 4,
                    name: "Design Team",
                    members: [
                        {
                            id: 4,
                            name: "David",
                            tasks: [{ id: 6, name: "Task 6" }],
                        },
                    ],
                },
            ],
        },
        {
            id: 3,
            name: "Solution C",
            teams: [
                {
                    teamId: 5,
                    name: "DevOps Team",
                    members: [
                        {
                            id: 5,
                            name: "Eve",
                            tasks: [{ id: 7, name: "Task 7" }],
                        },
                    ],
                },
                {
                    teamId: 6,
                    name: "QA Team",
                    members: [
                        {
                            id: 6,
                            name: "Frank",
                            tasks: [{ id: 8, name: "Task 8" }, { id: 9, name: "Task 9" }],
                        },
                    ],
                },
            ],
        },
    ];

    const [selectedSolution, setSelectedSolution] = useState(null);

    const handleSelect = (solutionId) => {
        setSelectedSolution(solutionId);
    };

    const handleConfirm = () => {
        if (selectedSolution !== null) {
            console.log("Confirmed Solution ID:", selectedSolution);
            alert(`Solution ${selectedSolution} has been confirmed!`);
        } else {
            alert("Please select a solution first!");
        }
    };

    return (
        <div className="solution-page">
            <Header2/>
            <div className="solution-container">
                {dummySolutions.map((solution) => (
                    <SolutionCard
                        key={solution.id}
                        solution={solution}
                        isSelected={solution.id === selectedSolution}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
            <button className="confirm-button" onClick={handleConfirm}>
                Confirm the solution!
            </button>
        </div>
    );
}

export default SolutionPage;
