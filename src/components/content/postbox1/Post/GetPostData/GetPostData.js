import React, { useState, useEffect } from "react";

function GetPostData() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts from the server
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/posts/GetAllPosts"
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Error fetching posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Call the fetchPosts function
    fetchPosts();
  }, []); 
  const formatDateTime = (dateTimeString) => {
    const postDate = new Date(dateTimeString);
    const now = new Date();
    const timeDifference = now - postDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      return postDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    } else if (hoursDifference < 48) {
      return "Yesterday";
    } else {
      return postDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className={`card mt-4 ${post._id}`}>
          <div className="card-body">
            <div className="d-flex flex-column">
              <div className="text-right">
                <div class="container text-left">
                  <div class="row">
                    <div class="d-flex justify-content-between">
                      <div class="text-danger">Posted by: {post.username}</div>
                      <div class="text-danger">
                        Posted at: {formatDateTime(post.createdAt)}
                      </div>
                    </div>

                    <div class="col-md-auto text-justify">
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                  </div>
                </div>

                {/* <p>Answered by: {post.answeredBy}</p>
                <p>Created at: {post.createdAt}</p> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetPostData;
