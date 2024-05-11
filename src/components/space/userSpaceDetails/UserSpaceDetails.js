import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import image from '../../images/banner.jpg'
function UserSpaceDetails() {
  // Placeholder data (replace with actual data)
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getSpaces');

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

    fetchData();
  }, []);

  return (
    <div>
      <img src={image} alt="Your Image" className="img-fluid" />

      <h1>Spaces</h1>
      <ul>
        {spaces.map((space) => (
          <li key={space._id}>
            <Link to={`/spaces/${space._id}`}>{space.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSpaceDetails;
