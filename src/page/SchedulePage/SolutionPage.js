import React, { useState, useEffect } from "react";
import SolutionCard from "../../components/SolutionCard/SolutionCard";
import "./SolutionPage.css";
import { generateTaskRecommendations } from "../../API/solutionApi";

function SolutionPage() {
    const [solutions, setSolutions] = useState([]); // 솔루션 데이터를 저장
    const [selectedSolution, setSelectedSolution] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // 분배 작업을 생성하여 솔루션 데이터를 가져오기
    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoading(true);
            try {
                // 실제 API에 요청할 Task IDs
                const taskIds = [1, 2, 3, 4]; // 선택된 task IDs (테스트용으로 설정)
                const response = await generateTaskRecommendations(taskIds);
                setSolutions(response); // 서버에서 반환된 솔루션 데이터를 저장
            } catch (error) {
                console.error("Failed to fetch task recommendations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    // 솔루션 선택 핸들러
    const handleSelect = (solutionId) => {
        setSelectedSolution(solutionId);
    };

    // 선택된 솔루션 확인
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
            <h1 className="solution-header">Choose solution for your team work</h1>
            {isLoading ? (
                <p>Loading solutions...</p>
            ) : (
                <div className="solution-container">
                    {solutions.map((solution) => (
                        <SolutionCard
                            key={solution.id}
                            solution={solution}
                            isSelected={solution.id === selectedSolution}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            )}
            <button className="confirm-button" onClick={handleConfirm} disabled={isLoading}>
                Confirm the solution!
            </button>
        </div>
    );
}

export default SolutionPage;
