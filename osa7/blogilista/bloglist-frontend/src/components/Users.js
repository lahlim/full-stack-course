import React from 'react';
import { connect } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Users = props => {
  return (
    <>
      <h1>Users</h1>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Name</th>
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
      </Table>
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
