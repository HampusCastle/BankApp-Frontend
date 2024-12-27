import axiosInstance from '../utils/axiosInstance';

export interface ChatbotResponse {
  status: string;
  message: string;
}

export const sendChatbotQuery = async (query: string): Promise<ChatbotResponse> => {
  const token = localStorage.getItem('jwtToken');  

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axiosInstance.post(
      'http://localhost:8080/chatbot/query',  
      { query },  
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }
    );

    return response.data;  
  } catch (error) {
    console.error("Error sending query to chatbot API", error);
    throw new Error("Failed to communicate with chatbot");
  }
};