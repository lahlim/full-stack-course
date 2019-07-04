import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';

const Users = props => {
  useEffect(() => {
    props.initializeUsers();
  }, []);

  console.log(props.users);

  return (
    <>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
          {props.users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
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
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
