import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function GetUserSpace() {
  const [userSpaces, setUserSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/spaces/getSpaces")
      .then((response) => response.json())
      .then((data) => {
        setUserSpaces(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const getSessionUsername = () => {
    return sessionStorage.getItem("username");
  };

  return (
    <div>
      <div className="card position-fixed">
        <div className="card-body">
          <h5 className="card-title text-danger">Your Spaces</h5>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : userSpaces.length > 0 ? (
            userSpaces.some(
              (space) => space.username === getSessionUsername()
            ) ? (
              <div>
                <ol>
                  {userSpaces
                    .filter((space) => space.username === getSessionUsername())
                    .map((space) => (
                      <li key={space._id} className="text-left">
                        <Link
                          className="text-danger"
                          to={`/UserSpaceDetails/${space._id}`}
                        >
                          {space.name}
                        </Link>
                      </li>
                    ))}
                </ol>
              </div>
            ) : (
              <link to="/createSpace" className="text-left">
                Create Space
              </link>
            )
          ) : (
            <p className="text-left">No spaces available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetUserSpace;
