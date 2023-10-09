import React from 'react';

function Logout({ onLogout }) {
  const handleLogout = async () => {
    try {
      // Send a request to your backend to log out the user
      const response = await fetch('/api/logout', {
        method: 'POST', // or 'GET' depending on your backend implementation
        credentials: 'include', // Include credentials for session-based authentication
      });

      if (response.ok) {
        // Perform any additional actions on successful logout, such as clearing user data from state
        onLogout();
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
}

export default Logout;
