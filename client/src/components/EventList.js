import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
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

const GuestListItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of guests from  API endpoint
    const fetchGuests = async () => {
      try {
        const response = await fetch('/api/guests'); 
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
    <Container>
      <h2>Guest List</h2>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>Error: {error}</ErrorMessage>
      ) : (
        <ul>
          {guests.map((guest) => (
            <GuestListItem key={guest.id}>
              <strong>Name:</strong> {guest.name}
              <br />
              <strong>Response:</strong> {guest.response}
            </GuestListItem>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default GuestList;
