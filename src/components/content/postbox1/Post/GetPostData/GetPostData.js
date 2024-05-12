import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import PostModalPopup from "../postModalPopUP";
import Loader from "../../../../loader/Loader";
import { useNavigate } from "react-router-dom";
function GetPostData() {
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostContent, setSelectedPostContent] = useState("");
  const currentUser = sessionStorage.getItem("username");
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  const port = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${port}/api/posts/GetAllPosts`
          // "http://localhost:3001/api/posts/GetAllPosts"
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          setLoading(false);
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
    try {
      const response = await fetch(
        `${port}/api/posts/getPostById/${postId}`
        // `http://localhost:3001/api/posts/getPostById/${postId}`
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
  const handleDelete = async (postId) => {
    // console.log("Post ID:", postId);
    try {
      const response = await fetch(
        `${port}/api/posts/deletePost/${postId}`,
        // `http://localhost:3001/api/posts/deletePost/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Remove the deleted post from the state
        setPosts(posts.filter((post) => post._id !== postId));
        const answer = window.confirm("Do you want to delete this post?");
        if (answer) {
          window.location.reload();
          // Navigate("/");
        }
        // console.log("Post deleted successfully");
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };


  const onClosePost = () => {
    setOpenPost(false);
  };

  return (
    <div>
      {loading ? ( // Render loader while loading
        <Loader />
      ) : (
        posts.map((post) => (
          <div key={post._id} className={`card mt-2 ${post._id}`}>
            <div className="">
              <div className="">
                <div className="">
                  <div className="d-flex flex-column mb-3">
                    
                      <div className="text-danger">Posted by: {post.username}</div>
                      <div className="text-danger">Posted at: {formatDateTime(post.createdAt)}</div>
                   
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                  </div>
                  
                  <div className="row d-flex justify-content-end">
                    <div className="col-md-6 ">
                      {post.username === currentUser && (
                        <button
                          className="btn btn-primary float-right mt-2 mb-2"
                          onClick={() => handleEdit(post._id)}
                        >
                          Edit
                        </button>

                      )}
                    </div>
                    <div className="col-md-6">
                    {post.username === currentUser && (
                      <button className="btn btn-danger float-right mt-2 mb-2" onClick={() => handleDelete(post._id)}>Delete</button>
                    )}
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <Modal open={openPost} onClose={onClosePost}>
        <PostModalPopup postId={selectedPostId} editMode={true} content={selectedPostContent} />
      </Modal>
    </div>
  );
}

export default GetPostData;
