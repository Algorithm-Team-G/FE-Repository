import './styles.css';
import React, { useState, useEffect } from "react";

const App = () => {
  const [serverData, setServerData] = useState(null);
  const [mockData, setMockData] = useState(null);
  const [today] = useState(new Date());

  useEffect(()=>{
    setServerData({
      leaderName:"Alice",
      teamName: "ABC company",
      roles:{
        front1: "John",
        front2: "Lily",
        back1: "Emma",
        back2: "Soong",
        ai1: "Sophia",
        ai2: "Katie",
        designer1: "Chris",
        designer2: "Tommy",
      },
    });

    setMockData({
      1:{
        workers: {
          101: {
            name: "John",
            tasks: [
              {id:1, title:"Task A", begin:"2024-11-27", duration:5},
              {id:2, title:"Task B", begin:"2024-11-28", duration:2},
            ],
          },
          102: {
            name: "Lily",
            tasks: [
                { id: 3, title: "Task C", begin: "2024-12-02", duration: 4 }, // person A
                { id: 5, title: "Task E", begin: "2024-11-29", duration: 1 }, // person B
            ],
          },
          // data input 순서가 웹화면과 같지 않아도 매칭되어 찾아감
          103: {
            name: "Soong",
            tasks: [
                { id: 6, title: "Task C", begin: "2024-12-01", duration: 4 }, // person A
                { id: 7, title: "Task E", begin: "2024-11-29", duration: 1 }, // person B
            ],
          },
          104: {
            name: "Emma",
            tasks: [
                { id: 8, title: "Task A", begin: "2024-11-28", duration: 3 }, // person A
            ],
          },
          105: {
            name: "Sophia",
            tasks: [
                { id: 10, title: "Task C", begin: "2024-11-28", duration: 1 }, // person A
                { id: 11, title: "Task B", begin: "2024-12-01", duration: 2 }, // person B
            ],
          },
          106: {
            name: "Katie",
            tasks: [
                { id: 12, title: "Task A", begin: "2024-11-30", duration: 3 }, // person A
            ],
          },
          107: {
            name: "Chris",
            tasks: [
                { id: 13, title: "Task D", begin: "2024-11-27", duration: 3 }, // person A
                { id: 14, title: "Task E", begin: "2024-12-02", duration: 1 }, // person B
            ],
          },
          108: {
            name: "Tommy",
            tasks: [
                { id: 15, title: "Task A", begin: "2024-11-26", duration: 3 }, // person A
                { id: 16, title: "Task E", begin: "2024-12-03", duration: 1 }, // person B
                { id: 17, title: "Task B", begin: "2024-11-30", duration: 2 }, // p
            ],
          },
        },
      },
    });
  }, []);

  if (!serverData || !mockData) {
    return <div>Loading...</div>;
  }

  const { leaderName, teamName, roles } = serverData;

  // 역할별 데이터를 출력
  const renderRoles = () => {
    return Object.entries(roles).map(([roleId, name], index) => (
      <div className="role" key={index}>
        <button className="role-button">{roleId}</button>
        <span className="highlight">{name}</span>
      </div>
    ));
  };

  // 날짜 헤더 생성
  const renderScheduleHeader = () => {
    const days = Array.from({ length: 8 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date.toISOString().split("T")[0];
    });

    return (
      <div className="schedule-header">
        {days.map((day, index) => (
          <button key={index}>{day}</button>
        ))}
      </div>
    );
  };

  // 작업 렌더링
  const renderTasks = () => {
    const workerData = mockData[1].workers;
    const workersOrder = Object.values(workerData);

    return workersOrder.map((worker, rowIndex) => (
      <div key={rowIndex} className="schedule-row">
        {worker.tasks.map((task, taskIndex) => {
          const startDate = new Date(task.begin);
          const offset = Math.floor(
            (startDate - today) / (1000 * 60 * 60 * 24)
          );

          if (offset >= 0 && offset < 8) {
            return (
              <div
                key={taskIndex}
                className="task"
                style={{
                  gridColumnStart: offset + 1,
                  gridColumnEnd: offset + 1 + task.duration,
                }}
              >
                {task.title}
              </div>
            );
          }

          return null;
        })}
      </div>
    ));
  };

  return (
    <div>
      <header className="header">
        <h1>Schedule for your team</h1>
        <div className="leader-info">
          <label htmlFor="leader-name">Leader: </label>
          <span id="leader-name" className="highlight">
            {leaderName}
          </span>
        </div>
      </header>
      <main className="main-content">
        <div className="roles">
        <div className="team-info">
          <label htmlFor="team-name">Team: </label>
          <span id="team-name" className="highlight">
            {teamName}
          </span>
        </div>
          {renderRoles()}
        </div>
        <div className="schedule-container">
        {renderScheduleHeader()}
        <div className="schedule-grid">{renderTasks()}</div>
        </div>
      </main>
    </div>
  );
};

/*
function App() {
  return (
    <div>
      <header className="header">
        <h1>Schedule for your team</h1>
        <div className="leader-info">
          <label htmlFor="leader-name">Leader: </label>
          <span id="leader-name" className="highlight">Leader name</span>
        </div>
      </header>
      <main className="main-content">
        <div className="team-info">
          <label htmlFor="team-name">Team: </label>
          <span id="team-name" className="highlight">Team name</span>
          <div className="schedule-container">
            <div className="roles">
              <div className="role">
                <button className="role-button">Front-end</button>
                <span id="front1-name" className="highlight">Loading...</span>
              </div>
              <div className="role">
                <button className="role-button">Front-end</button>
                <span id="front2-name" className="highlight">Loading...</span>
              </div>
              <div className="role">
                <button className="role-button">Back-end</button>
                <span id="back1-name" className="highlight">Loading...</span>
              </div>
              <div className="role">
                <button className="role-button">Back-end</button>
                <span id="back2-name" className="highlight">Loading...</span>
              </div>
              <div className="role">
                <button className="role-button">AI</button>
                <span id="ai1-name" className="highlight">Loading...</span>
              </div>
              <div className="role">
                <button className="role-button">AI</button>
                <span id="ai2-name" className="highlight">Loading...</span>
              </div>
              <div className="role">
                <button className="role-button">Designer</button>
                <span id="designer1-name" className="highlight">Loading...</span>
              </div>
              <div className="role">
                <button className="role-button">Designer</button>
                <span id="designer2-name" className="highlight">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <div className="schedule">
          <div className="schedule-header"></div>
          <div className="schedule-grid"></div>
        </div>
        <div className="actions">
          <button id="add-task-button">+ Add Task</button>
        </div>
      </main>
    </div>
  );
}
*/

export default App;