import axios from "axios";
const port = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: port,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export const createNotification = async (userId, type, objectId) => {
  try {
    const response = await axiosInstance.post("api/notifications", { userId, type, objectId });
    return response.data;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export const getNotificationsByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error('userId is not defined');
    }
    const response = await axiosInstance.get(`api/notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axiosInstance.put(`api//notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};
