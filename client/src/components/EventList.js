import React from 'react';

function EventList({ events, onViewEvent, onEditEvent, onDeleteEvent }) {
  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div>
              <strong>Title:</strong> {event.title}
            </div>
            <div>
              <strong>Date:</strong> {event.date}
            </div>
            <div>
              <strong>Location:</strong> {event.location}
            </div>
            <div>
              <button onClick={() => onViewEvent(event)}>View Event</button>
              <button onClick={() => onEditEvent(event)}>Edit Event</button>
              <button onClick={() => onDeleteEvent(event)}>Delete Event</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
