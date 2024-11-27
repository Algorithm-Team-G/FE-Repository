document.addEventListener("DOMContentLoaded", () => {
    // 서버에서 가져온 데이터를 하드코딩 (예시)
    const serverData = {
        leaderName: "Alice",
        teamName: "ABC Company",
        roles: {
            front1: "John",
            front2: "Lily",
            back1: "Emma",
            back2: "Soong",
            ai1: "Sophia",
            ai2: "Katie",
            designer1: "Chris",
            designer2: "Tommy"
        }
    };

    // 데이터를 HTML에 표시
    document.getElementById("leader-name").textContent = serverData.leaderName;
    document.getElementById("team-name").textContent = serverData.teamName;
    document.getElementById("front1-name").textContent = serverData.roles.front1;
    document.getElementById("front2-name").textContent = serverData.roles.front2;
    document.getElementById("back1-name").textContent = serverData.roles.back1;
    document.getElementById("back2-name").textContent = serverData.roles.back2;
    document.getElementById("ai1-name").textContent = serverData.roles.ai1;
    document.getElementById("ai2-name").textContent = serverData.roles.ai2;
    document.getElementById("designer1-name").textContent = serverData.roles.designer1;
    document.getElementById("designer2-name").textContent = serverData.roles.designer2;

    // Get reference to the header container
    const scheduleHeader = document.querySelector(".schedule-header");

    // Function to dynamically generate dates
    function populateDates() {
        const today = new Date();
        for (let i = 0; i < 8; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
 
            // Create a button for each date
            const button = document.createElement("button");
            button.textContent = formatDate(date);
            // Format date to a readable format "yyyy-mm-dd"
            scheduleHeader.appendChild(button);
        }
    }
 
    // Helper function to format dates as "YYYY-MM-DD"
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
 
    // Populate header with dates
    populateDates();

    const mockData = {
        1: {
            name: "ABC Company",
            workers: {
                101: {
                    name: "John",
                    tasks: [
                        { id: 1, title: "Task A", begin: "2024-11-27", duration: 1 }, // person A
                        { id: 2, title: "Task B", begin: "2024-11-28", duration: 2 }, // person B
                        { id: 4, title: "Task D", begin: "2024-11-30", duration: 1 }, // person C
                    ],
                },
                102: {
                    name: "Lily",
                    tasks: [
                        { id: 3, title: "Task C", begin: "2024-12-01", duration: 4 }, // person A
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
                        { id: 9, title: "Task E", begin: "2024-12-02", duration: 1 }, // person B
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
                        { id: 13, title: "Task A", begin: "2024-11-27", duration: 3 }, // person A
                        { id: 14, title: "Task E", begin: "2024-12-02", duration: 1 }, // person B
                    ],
                },
                108: {
                    name: "Tommy",
                    tasks: [
                        { id: 15, title: "Task A", begin: "2024-11-26", duration: 3 }, // person A
                        { id: 16, title: "Task E", begin: "2024-12-03", duration: 1 }, // person B
                    ],
                },
            },
        },
    };
    const scheduleGrid = document.querySelector(".schedule-grid");
    const today = new Date("2024-11-27"); // 기준 날짜 (Today)

    // HTML에 표시된 roles의 이름들 (웹페이지에서 가져오는 순서)
    const webPageWorkers = ["John", "Lily", "Emma", "Soong", "Sophia",
        "Katie", "Chris", "Tommy"]; // 웹 페이지의 순서
    const workersOrder = []; // Mock 데이터에서의 worker 객체를 HTML 순서대로 저장

    // duration 계산 (단위: day)
    function calculateDayOffset(startDate, referenceDate) {
        const start = new Date(startDate);
        return Math.floor((start - referenceDate) / (1000 * 60 * 60 * 24));
    }

    // Helper: Mock 데이터의 이름과 HTML 순서를 매칭
    function mapWorkersToWebPage(data, webPageWorkers) {
        webPageWorkers.forEach((workerName) => {
            // Mock 데이터에서 이름과 매칭되는 Worker 객체를 찾음
            const worker = Object.values(data.workers).find(
                (worker) => worker.name === workerName
            );

            if (worker) {
                workersOrder.push(worker);
            } else {
                // 해당 이름이 Mock 데이터에 없으면 빈 작업자로 추가
                workersOrder.push({ name: workerName, tasks: [] });
            }
        });
    }

    function adjustTaskPeriod(task, today) {
        const taskStart = new Date(task.begin);
        const todayDate = new Date(today);

        if (taskStart < todayDate) {
            const daysElapsed = Math.floor((todayDate - taskStart) / (1000 * 60 * 60 * 24));
            const remainingDuration = task.duration - daysElapsed;

            if (remainingDuration > 0) {
                task.begin = today.toISOString().split("T")[0];
                task.duration = remainingDuration;
            } else {
                return null;
            }
        }
        return task;
    }

    // Worker별로 작업(Task) 표시
    function renderTasks() {
        workersOrder.forEach((worker, rowIndex) => {
        
        // schedule-grid에 worker row 생성
        for (let i = 0; i < 8; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.style.border = "1px solid transparent";
            scheduleGrid.appendChild(emptyCell); // 빈 셀 추가
        }

        worker.tasks.forEach((task) => {
            const adjustedTask = adjustTaskPeriod(task, today);
            if (!adjustedTask) return;

            const dayOffset = calculateDayOffset(task.begin, today);

            if (dayOffset >= 0 && dayOffset < 8) {
                const taskDiv = document.createElement("div");
                taskDiv.className = "task";
                taskDiv.textContent = task.title;

                // grid 위치 및 길이 설정
                taskDiv.style.gridColumnStart = dayOffset + 1; // 시작 위치
                taskDiv.style.gridColumnEnd = dayOffset + 1 + task.duration; // 종료 위치
                taskDiv.style.gridRowStart = rowIndex + 1;

                scheduleGrid.appendChild(taskDiv);
            }
        });
            
        });
    }

    mapWorkersToWebPage(mockData[1], webPageWorkers);
    renderTasks(); 
});
