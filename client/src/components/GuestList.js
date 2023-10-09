import React, { useEffect, useState } from 'react';

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of guests from your API endpoint
    const fetchGuests = async () => {
      try {
        const response = await fetch('/api/guests'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch guest data');
        }
        const data = await response.json();
        setGuests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  return (
    <div>
      <h2>Guest List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest.id}>
              <strong>Name:</strong> {guest.name}
              <br />
              <strong>Response:</strong> {guest.response}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GuestList;
