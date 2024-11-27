// import axios from 'axios';
//
// const BASE_URL = 'http://your-server-url/api';
//
// // 분배되지 않은 업무 불러오기
// export const getUnassignedTasks = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/task/unassigned`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching unassigned tasks:", error);
//         throw error;
//     }
// };
//
// // 업무 추가하기
// export const addTask = async (task) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/task`, task);
//         return response.data;
//     } catch (error) {
//         console.error("Error adding task:", error);
//         throw error;
//     }
// };
//


// API/taskApi.js
export const assignTasks = (tasks) => {
    return new Promise((resolve) => {
        console.log("Assigning tasks:", tasks);
        resolve();
    });
};

export const getUnassignedTasks = () => {
    return new Promise((resolve) => {
        resolve([
            { id: 1, name: "Task 1" },
            { id: 2, name: "Task 2" },
        ]);
    });
};

