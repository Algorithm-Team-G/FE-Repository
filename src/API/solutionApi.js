import axios from 'axios';

const BASE_URL = 'http://your-server-url/api';

// 업무 분배 케이스 생성하기
export const generateTaskRecommendations = async (taskIds) => {
    try {
        const response = await axios.post(`${BASE_URL}/task/recommend`, taskIds);
        return response.data;
    } catch (error) {
        console.error("Error generating task recommendations:", error);
        throw error;
    }
};
