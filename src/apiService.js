// import { useNavigate } from "react-router-dom";

const port = process.env.REACT_APP_BACKEND_URL;

const token = localStorage.getItem('token');
// const Navigate = useNavigate();

// if (!token) {
//     Navigate('/login');
// }

// export {
//     port,
//     Navigate
// };

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

// Define other API functions as needed
