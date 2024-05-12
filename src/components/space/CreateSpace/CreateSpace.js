import React, { useState } from "react";

function CreateSpace() {
  const [spaceName, setSpaceName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateSpace = async () => {
    try {
      // Make a POST request to the API endpoint
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/spaces/createSpace`,
        // "http://localhost:3001/api/spaces/createSpace",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
          body: JSON.stringify({
            name: spaceName,
            description,
            username: sessionStorage.getItem("username"),
          }),
        }
      );

      if (response.ok) {
        console.log("Space created successfully");
        window.location.reload();
        // You can perform additional actions after creating the space
      } else {
        console.error("Error creating space:", response.statusText);
        setError(response.message);
      }
    } catch (error) {
       setError("Error creating space: " + error.message);
      console.error("Error creating space:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Space</h2>
      <div className="mb-3">
        <label htmlFor="spaceName" className="form-label">
          Space Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="spaceName"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Brief Description:
        </label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleCreateSpace}>
        Create Space
      </button>
    </div>
  );
}

export default CreateSpace;
