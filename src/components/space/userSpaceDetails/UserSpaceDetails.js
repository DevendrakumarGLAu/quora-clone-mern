import React from "react";

function UserSpaceDetails() {
  // Placeholder data (replace with actual data)
  const spaceDetails = {
    name: "Your Space Name",
    description: "This is a sample space description.",
    members: 100, // Replace with actual number of members
    posts: 50, // Replace with actual number of posts
    topics: ["Topic 1", "Topic 2", "Topic 3"], // Replace with actual topics
  };

  return (
    <div className="container">
      {/* Header */}
      <header>
        <h2>{spaceDetails.name}</h2>
      </header>

      {/* Space Details */}
      <section>
        <p>{spaceDetails.description}</p>

        {/* Stats */}
        <div className="space-stats">
          <div>
            <strong>{spaceDetails.members}</strong> Members
          </div>
          <div>
            <strong>{spaceDetails.posts}</strong> Posts
          </div>
        </div>

        {/* Topics */}
        <div className="space-topics">
          <strong>Topics:</strong>
          <ul>
            {spaceDetails.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Placeholder Content */}
      <section>
        <h3>Latest Posts</h3>
        <div className="latest-posts">
          {/* Display latest posts */}
          {/* ... */}
        </div>
      </section>
    </div>
  );
}

export default UserSpaceDetails;
