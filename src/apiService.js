// import { useNavigate } from "react-router-dom";
const port = process.env.REACT_APP_BACKEND_URL;
let token = localStorage.getItem('token');
// let Navigate = useNavigate();
export const getAllPosts = async () => {
  try {
    const response = await fetch(`${port}/api/posts/GetAllPosts`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error fetching posts:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
};

export const getPostByIdEdit = async (postId) => {
  try {
    const response = await fetch(`${port}/api/posts/getPostById/${postId}`);
    if (response.ok) {
      const post = await response.json();
      return post;
    } else {
      console.error('Error fetching post by ID:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
};


export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${port}/api/posts/deletePost/${postId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      console.error('Error deleting post:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};

export const postComment = async (postId, commentData) => {
  try {
    // const 
    const response = await fetch(`${port}/api/posts/postComment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(commentData),
    });
    if (response.ok) {
      console.log('Comment posted successfully');
      return true;
    } else {
      console.error('Error posting comment:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error posting comment:', error);
    return false;
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await fetch(`${port}/api/posts/getAllComments/${postId}`);
    if (response.ok) {
      const comments = await response.json();
      return comments;
    }
    else {
      console.error('Error fetching comments:', response.statusText);
      return null;
    }
  }
  catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
}
export const upvotePost = async (postId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${port}/api/posts/upvote/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    if (response.ok) {
      console.log('Post upvoted successfully');
      return true;
    }
    else if (response.status === 401) {
      const answer = window.confirm("Token missing! Please login again to upvote");
      if (answer) {
        window.location.href = "/login";
      }
    }
    else {
      console.error('Error upvoting post:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error upvoting post:', error);
    return false;
  }
};

export const downvotePost = async (postId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${port}/api/posts/downvote/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    if (response.ok) {
      console.log('Post downvoted successfully');
      window.location.reload();
      return true;
    } else if (response.status === 401) {
      const answer = window.confirm("Token missing! Please login again to downvote");
      if (answer) {
        window.location.href = "/login";
      }
    }
    else {
      console.error('Error downvoting post:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error downvoting post:', error);
    return false;
  }
};
