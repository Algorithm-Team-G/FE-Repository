import React, { useEffect, useState } from "react";
import "./TeamSchedulePage.css";
import { getAssignedTasks } from "../../API/taskApi";
import Timeline from "../../components/Timeline/Timeline";

const TeamSchedulePage = () => {
    const [teams, setTeams] = useState({});
    const [loading, setLoading] = useState(true);
    const today = new Date();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAssignedTasks();
                console.log("Fetched teams data:", data);
                setTeams(data);
            } catch (error) {
                console.error("Failed to fetch teams data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (Object.keys(teams).length === 0)
        return <div>No schedule data available. Please assign tasks first!</div>;

    return (
        <div className="team-schedule-page">
            <div className="timeline-container">
                <Timeline teams={teams} today={today} />
            </div>
        </div>
    );
};

export default TeamSchedulePage;
