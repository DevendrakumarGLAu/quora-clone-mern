import React, { useEffect, useState } from 'react';

function GetAllSpaces() {
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/spaces/getSpaces`
          // 'http://localhost:3001/api/spaces/getSpaces'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const spacesData = await response.json();
        setSpaces(spacesData);
      } catch (error) {
        console.error('Error fetching spaces:', error);
        setError('Error fetching spaces');
      }
    };

    fetchSpaces();
  }, []); // Empty dependency array means it will run once on mount

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {spaces.map((space) => (
            <li key={space._id}>{space.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetAllSpaces;
