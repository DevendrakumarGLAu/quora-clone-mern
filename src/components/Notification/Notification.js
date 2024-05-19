import React, { useState, useEffect } from 'react';
import { getNotificationsByUserId, markNotificationAsRead, createNotification } from './notificationAPI';
// import jwt_decode from 'jwt-decode';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    
    // Decode the JWT token to extract user information
    // const decodedToken = jwt_decode(localStorage.getItem('token'));
    // const userId = decodedToken.userId;
    const userId = localStorage.getItem("userId");
    // console.log("userId", userId)

    useEffect(() => {
        // Fetch notifications data when the component mounts
        const fetchNotifications = async () => {
            try {
                const data = await getNotificationsByUserId(userId);
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, [userId]); // Include userId in the dependency array

    // Function to mark a notification as read
    const handleMarkAsRead = async (notificationId) => {
        try {
            await markNotificationAsRead(notificationId);
            setNotifications(prevNotifications => prevNotifications.map(notification => {
                if (notification._id === notificationId) {
                    return { ...notification, isRead: true };
                }
                return notification;
            }));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div>
            {notifications ? (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification._id}>
                            <span>{notification.message}</span>
                            {!notification.isRead && (
                                <button onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notifications found.</p>
            )}
        </div>
    );
}

export default Notification;
