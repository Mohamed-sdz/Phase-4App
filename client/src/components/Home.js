import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
 
const HomeContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const EventList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EventItem = styled.li`
  background-color: #f5f5f5;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const EventTitle = styled.strong`
  font-size: 1.2rem;
  color: #333;
`;

const EventInfo = styled.div`
  margin-top: 5px;
  font-size: 0.9rem;
`;

const EventDescription = styled.p`
  margin-top: 5px;
  font-size: 1rem;
  color: #555;
`;

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data from your API here
    fetch('/api/events') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <HomeContainer>
      <h2>Welcome to My Event App</h2>
      <p>Explore upcoming events:</p>
      <EventList>
        {events.map((event) => (
          <EventItem key={event.id}>
            <EventTitle>{event.title}</EventTitle>
            <EventInfo>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </EventInfo>
            <EventDescription>{event.description}</EventDescription>
          </EventItem>
        ))}
      </EventList>
    </HomeContainer>
  );
}

export default Home;
