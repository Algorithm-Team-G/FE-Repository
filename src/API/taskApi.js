import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

// 분배되지 않은 업무 불러오기
export const getUnassignedTasks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/task/unassign`);
        return response.data;
    } catch (error) {
        console.error("Error fetching unassigned tasks:", error);
        throw error;
    }
};


// Task 추가 API 호출

export const addTask = async (taskData) => {
    try {
        const response = await axios.post(`${BASE_URL}/task/`, taskData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error.response?.data || error.message);
        throw error;
    }
};




// // 선택된 Task ID로 분배 요청
// export const assignTasks = async (taskIds) => {
//     console.log("Sending task IDs to backend:", taskIds); // 디버깅용
//     try {
//         const response = await axios.post(`${BASE_URL}/task/recommend`, taskIds, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         console.log("Received response from backend:", response.data);
//         return response.data; // 서버 응답 데이터 반환
//     } catch (error) {
//         console.error("Error assigning tasks:", error.response?.data || error.message);
//         throw error;
//     }
// };


export const assignTasks = async (taskIds) => {
    try {
        const response = await axios.post(`${BASE_URL}/task/recommend`, taskIds, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data; // 백엔드에서 받은 스케줄 데이터 반환
    } catch (error) {
        console.error("Error assigning tasks:", error.response?.data || error.message);
        throw error;
    }
};




// 분배된 업무 불러오기
export const getAssignedTasks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/task/assign`);
        return response.data; // API 응답 데이터 반환
    } catch (error) {
        console.error("Error fetching assigned tasks:", error);
        throw error;
    }
};

//
// // API/taskApi.js
// export const assignTasks = (tasks) => {
//     return new Promise((resolve) => {
//         console.log("Assigning tasks:", tasks);
//         resolve();
//     });
// };


