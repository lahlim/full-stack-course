import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';

const NavBarTop = ({ props }) => {
  const logOut = () => {
    props.logout();
    window.localStorage.clear();
  };

  return (
    <>
      <Navbar bg='dark justify-content-between mb-5'>
        <div>
          <Link style={{ padding: 5, color: '#ccc' }} to='/'>
            Blogs
          </Link>
          <Link style={{ padding: 5, color: '#ccc' }} to='/users'>
            Users
          </Link>
        </div>
        <div>
          {props.user !== null && (
            <LoggedInfo user={props.user} logOut={logOut} />
          )}
        </div>
      </Navbar>
    </>
  );
};

const LoggedInfo = ({ user, logOut }) => {
  const handleLogOut = () => logOut();
  return (
    <>
      <p style={{ color: '#ccc' }}>{user.username} is logged in</p>
      <Button className='primary' onClick={handleLogOut}>
        LogOut
      </Button>
    </>
  );
};

export default NavBarTop;
