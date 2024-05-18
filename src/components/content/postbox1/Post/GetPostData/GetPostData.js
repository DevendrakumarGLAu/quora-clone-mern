import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import PostModalPopup from "../postModalPopUP";
import Loader from "../../../../loader/Loader";
import { useNavigate } from "react-router-dom";
import { Avatar, ListItemAvatar } from "@material-ui/core";
import { getAllPosts, getPostByIdEdit, deletePost, postComment } from "../../../../../apiService";
import './GetPostData.css'
function GetPostData() {
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostContent, setSelectedPostContent] = useState("");
  const currentUser = sessionStorage.getItem("username");
  const [loading, setLoading] = useState(true);
  const [loadingComment, setLoadingComment] = useState(true);
  const Navigate = useNavigate();
  const port = process.env.REACT_APP_BACKEND_URL;
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       // const token = localStorage.getItem('token'); // Retrieve token from local storage
  //       // console.log("token in front", token);
  //       // if (!token) {
  //       //   console.error('Token not found in local storage');
  //       //   return;
  //       // }

  //       const response = await fetch(
  //         `${port}/api/posts/GetAllPosts`

  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setPosts(data);
  //         setLoading(false);
  //       } else {
  //         console.error('Error fetching posts:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPosts();
      if (data) {
        setPosts(data);
        setLoading(false);
      }
    };
    fetchData();
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

  // const handleEdit = async (postId) => {
  //   try {

  //     const response = await fetch(
  //       `${port}/api/posts/getPostById/${postId}`
  //       // `http://localhost:3001/api/posts/getPostById/${postId}`
  //     );
  //     if (response.ok) {
  //       const post = await response.json();
  //       setOpenPost(true);
  //       setSelectedPostId(postId);
  //       if (post.content) {
  //         setSelectedPostContent(post.content);
  //       } else {
  //         console.error("Post content is empty");
  //       }
  //     } else {
  //       console.error("Error fetching post by ID:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching post by ID:", error);
  //   }
  // };
  const handleEdit = async (postId) => {
    try {
      setLoading(true); // Set loading state to true while editing
      const post = await getPostByIdEdit(postId); // Pass postId to getPostByIdEdit
      if (post) {
        setOpenPost(true);
        setSelectedPostId(postId);
        if (post.content) {
          setSelectedPostContent(post.content);
        } else {
          console.error("Post content is empty");
        }
      }
    } catch (error) {
      console.error("Error editing post:", error);
    } finally {
      setLoading(false); // Set loading state to false after editing
    }
  };
  const handleDelete = async (postId) => {
    try {
      setLoading(true); // Set loading state to true while deleting
      const success = await deletePost(postId);
      if (success) {
        setPosts(posts.filter((post) => post._id !== postId));
        const answer = window.confirm("Do you want to delete this post?");
        if (answer) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false); // Set loading state to false after deleting
    }
  };

  // const handleDelete = async (postId) => {
  //   // console.log("Post ID:", postId);
  //   try {
  //     const response = await fetch(
  //       `${port}/api/posts/deletePost/${postId}`,
  //       // `http://localhost:3001/api/posts/deletePost/${postId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     if (response.ok) {

  //       // Remove the deleted post from the state
  //       setPosts(posts.filter((post) => post._id !== postId));
  //       const answer = window.confirm("Do you want to delete this post?");
  //       if (answer) {
  //         window.location.reload();
  //         // Navigate("/");
  //       }
  //       // console.log("Post deleted successfully");
  //     } else {
  //       console.error("Error deleting post:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //   }
  // };


  const onClosePost = () => {
    setOpenPost(false);
  };
  const handleToggleCommentInput = (postId) => {
    const token= localStorage.getItem('token')
    if(!token){
      const answer = window.confirm("You are not logged in! Please login first for comment")
      if(answer){
        Navigate("/login")
      }
      
    }
    else{
      console.log("post cid commnet", postId)
    setShowCommentInput({ ...showCommentInput, [postId]: !showCommentInput[postId] });
    setLoadingComment({ ...loadingComment, [postId]: true });
    setTimeout(() => {
      setLoadingComment({ ...loadingComment, [postId]: false });
    }, 1000);
    }
  };

  const handlePostComment = async (postId) => {
    try {
      const success = await postComment(postId, { comment, username: currentUser }); // Pass comment and username
      if (success) {
        const updatedPost = await getPostByIdEdit(postId);
        if (updatedPost) {
          setPosts(posts.map(post => post._id === postId ? updatedPost : post));
        }
        const answer= window.confirm('Comment posted successfully. Do you want to go to the home page?')
        if (answer) {
          window.location.reload(); 
        }

      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };


  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <div className="">
              <div className={`card mt-2 ${post._id}`}>
                <div className="p-3">
                  <div className="d-flex flex-column mb-3">
                    <div className="row">
                      <div className="col-md-1">
                        {post.profilePhoto ? (
                          <img
                            src={post.profilePhoto}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: "30px", height: "30px" }}
                          />
                        ) : (
                          <img
                            src={ListItemAvatar}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: "30px", height: "30px" }}
                          />
                        )}
                      </div>

                      <div className="col-md-7">
                        <div className="row">
                          <div className="col-md-12">
                            <h5> {post.username}</h5>
                          </div>
                          <div className="col-md-12 text-danger">
                            {formatDateTime(post.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-end">
                        <div className="dropdown">
                          <button className="dropdown-toggle" id="dropdownMenuButton">
                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {post.username === currentUser ? (
                              <>
                                <span className="dropdown-item">
                                  <button className="btn btn-primary" onClick={() => handleEdit(post._id)}>
                                    Edit
                                  </button>
                                </span>
                                <span className="dropdown-item">
                                  <button className="btn btn-danger" onClick={() => handleDelete(post._id)}>
                                    Delete
                                  </button>
                                </span>
                              </>
                            ) : (
                              <span className="dropdown-item"> Copy Link</span>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                    <div />
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-12">
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                  </div>
                  <hr></hr>

                  <div className="row">
                    <div className="col-md-2">
                      <p className="card-text" >
                        <i className="fa-regular fa-circle-up"></i> Upvotes: 0
                      </p>
                    </div>
                    <div className="col-md-2">
                      <p className="card-text" >
                        <i className="fa-regular fa-circle-down"></i> Downvotes: 0
                      </p>
                    </div>
                    <div className="col-md-2">
                      <p className="card-text" >
                        <i className="fa-regular fa-share-from-square"></i> Share: Public
                      </p>
                    </div>
                    <div className="col-md-2">
                      <p className="card-text" onClick={() => handleToggleCommentInput(post._id)}>
                        <i className="fa-regular fa-comment"></i> Comment: 0
                      </p>
                    </div>
                    <div className="col-md-2">
                      <p className="card-text" >
                        <i className="fa fa-wrench"></i>Last update: 0
                      </p>
                    </div>
                  </div>
                  {/* <div className="row d-flex justify-content-end">
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

                  </div> */}
                </div>
              </div>
            </div>
            {showCommentInput[post._id] && (
              <div>
                {/* Display loading spinner while loading */}
                {loadingComment[post._id] ? (
                  <div className="row mt-2">
                    <div className="col-md-12 text-center">
                      <div className="spinner-border text-primary " role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>

                ) : (
                  <div className="input-group mt-2 mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Comment</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={() => handlePostComment(post._id)}>Button</button>
                  </div>
                )}
              </div>
            )}

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
