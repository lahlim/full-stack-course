import React from 'react';
import { connect } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';

const Users = props => {
  return (
    <>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
          {props.blogUsers.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`users/${user.id}`}>{user.name}</Link>
              </td>

              {user.blogs.length !== null && <td>{user.blogs.length}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const mapDispatchToProps = {
  initializeUsers
};

const mapStateToProps = state => {
  return {
    blogUsers: state.blogUsers,
    blogs: state.blogs
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
