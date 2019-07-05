import blogService from '../services/blogs';

const initialState = [];

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INITBLOGS',
      data: blogs
    });
  };
};

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog);
    dispatch({
      type: 'REMOVE',
      data: blog
    });
  };
};

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'ADD',
      data: newBlog
    });
  };
};

export const addLike = blog => {
  const blogUpdate = {
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes + 1,
    id: blog.id
  };

  return async dispatch => {
    await blogService.update(blog.id, blogUpdate);
    dispatch({
      type: 'VOTE',
      data: blog
    });
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITBLOGS':
      return action.data;
    case 'ADD':
      return [...state, action.data];
    case 'LIKE':
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      );
    case 'REMOVE':
      return [...state].filter(blog => blog.id !== action.data.id);
    default:
      return state;
  }
};

export default reducer;
