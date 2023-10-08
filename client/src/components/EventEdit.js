import React, { useState } from 'react';

function EventEdit({ event, onSave }) {
  // State to hold the edited event data
  const [editedEvent, setEditedEvent] = useState(event);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSave function to save the updated event data
    onSave(editedEvent);
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedEvent.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Event Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={editedEvent.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={editedEvent.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Event Description:</label>
          <textarea
            id="description"
            name="description"
            value={editedEvent.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Save Event</button>
      </form>
    </div>
  );
}

export default EventEdit;
