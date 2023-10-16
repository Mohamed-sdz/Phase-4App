import React from 'react';

function Logout({ onLogout }) {
  const handleLogout = async () => {
    try {
      // Send a request to  backend to log out the user
      const response = await fetch('/api/logout', {
        method: 'POST',  
        credentials: 'include',  
      });

      if (response.ok) {
 
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
