import React, { useState, useEffect } from 'react';

function EventDetail({ eventId }) {
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
    return <p>Loading event details...</p>;
  }

  if (!eventDetails) {
    return <p>Error: Event not found</p>;
  }

  return (
    <div>
      <h2>Event Details</h2>
      <p><strong>Title:</strong> {eventDetails.title}</p>
      <p><strong>Description:</strong> {eventDetails.description}</p>
      <p><strong>Date:</strong> {new Date(eventDetails.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {eventDetails.location}</p>
      <p><strong>Ongoing:</strong> {eventDetails.ongoing ? 'Yes' : 'No'}</p>
      <p><strong>Budget:</strong> {eventDetails.budget}</p>
    </div>
  );
}

export default EventDetail;
