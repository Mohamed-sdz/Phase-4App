import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import EventForm from './EventForm';
import EventDetail from './EventDetail';
import EventList from './EventList';
import InvitationForm from './InvitationForm';  
import GuestList from './GuestList';  
import Logout from './Logout';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated and set the user state accordingly
    const checkAuthentication = async () => {
      try {
        const response = await fetch('/api/check-auth', {
          method: 'GET', // Adjust the method based on your authentication check
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    // Clear the user state when the user logs out
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/events/new">
          <EventForm />
        </Route>
        <Route path="/events/:id">
          <EventDetail />
        </Route>
        <Route path="/events">
          <EventList />
        </Route>
        <Route path="/invitation">
          <InvitationForm />
        </Route>
        <Route path="/guests">
          <GuestList />
        </Route>
      </Switch>
      {user && <Logout onLogout={handleLogout} />}
    </>
  );
}

export default App;
