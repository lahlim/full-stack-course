import React from 'react';
import { connect } from 'react-redux';

const Notification = props => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  const notificationMsg = props.notification;
  console.log('NOTIFICATION MSG IN COMPONENT: ', notificationMsg);

  if (!notificationMsg) style = { display: 'none' };

  return (
    <div style={style}>
      {notificationMsg}
      <div />
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
