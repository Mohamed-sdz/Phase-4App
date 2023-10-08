import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EventDetailsContainer = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ff0000;
`;

const EventInfo = styled.div`
  margin-top: 20px;
`;

const EventDetail = ({ eventId }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const eventData = await response.json();
        setEventDetails(eventData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return <LoadingMessage>Loading event details...</LoadingMessage>;
  }

  if (!eventDetails) {
    return <ErrorMessage>Error: Event not found</ErrorMessage>;
  }

  return (
    <EventDetailsContainer>
      <h2>Event Details</h2>
      <EventInfo>
        <p><strong>Title:</strong> {eventDetails.title}</p>
        <p><strong>Description:</strong> {eventDetails.description}</p>
        <p><strong>Date:</strong> {new Date(eventDetails.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {eventDetails.location}</p>
        <p><strong>Ongoing:</strong> {eventDetails.ongoing ? 'Yes' : 'No'}</p>
        <p><strong>Budget:</strong> {eventDetails.budget}</p>
      </EventInfo>
    </EventDetailsContainer>
  );
}

export default EventDetail;
