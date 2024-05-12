import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import PostModalPopup from "../postModalPopUP";

function GetPostData() {
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostContent, setSelectedPostContent] = useState("");

  useEffect(() => {
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

  const handleEdit = async (postId) => {
    console.log("post id", postId);
    
    console.log("selectedPostId id", selectedPostId);
    try {
      const response = await fetch(
        `http://localhost:3001/api/posts/getPostById/${postId}`
      );
      if (response.ok) {
        const post = await response.json();
        setOpenPost(true);

        setSelectedPostId(postId);
        if (post.content) {
          setSelectedPostContent(post.content);
        } else {
          console.error("Post content is empty");
        }
      } else {
        console.error("Error fetching post by ID:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching post by ID:", error);
    }
  };
  

  const onClosePost = () => {
    setOpenPost(false);
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className={`card mt-2 ${post._id}`}>
          <div className="card-body">
            <div className="d-flex flex-column">
              <div className="text-right">
                <div className="container text-left">
                  <div className="row">
                    <div className="d-flex justify-content-between">
                      <div className="text-danger">Posted by: {post.username}</div>
                      <div className="text-danger">
                        Posted at: {formatDateTime(post.createdAt)}
                      </div>
                    </div>
                    <div className="col-md-auto text-justify">
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                  </div>
                </div>
                <button 
                  className="btn btn-primary mt-2" 
                  onClick={() => handleEdit(post._id)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
<Modal open={openPost} onClose={onClosePost}>
  {/* {console.log("Selected post content:", selectedPostContent)} */}
  <PostModalPopup postId={selectedPostId} editMode={true} content={selectedPostContent} />
</Modal>

    </div>
  );
}

export default GetPostData;
