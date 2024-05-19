import React, { useState, useEffect } from 'react';
import Notification from './Notification'; // Import the Notification component
import { getNotifications } from './notificationAPI'; // Import your API function

function ParentComponent() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications data when the component mounts
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  // Function to mark a notification as read
  const handleMarkAsRead = async (notificationId) => {
    // Implement your logic to mark the notification as read
    console.log('Marking notification as read:', notificationId);
  };

  return (
    <div>
      {/* Render the Notification component and pass notifications data and handleMarkAsRead function as props */}
      <Notification notifications={notifications} handleMarkAsRead={handleMarkAsRead} />
    </div>
  );
}

export default ParentComponent;
