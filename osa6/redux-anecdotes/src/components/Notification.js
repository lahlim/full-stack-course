import React from 'react';

const Notification = ({ store }) => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  const { notificationMsg } = store.getState();

  if (!notificationMsg) style = { display: 'none' };

  return (
    <div style={style}>
      {notificationMsg}
      <div />
    </div>
  );
};

export default Notification;
