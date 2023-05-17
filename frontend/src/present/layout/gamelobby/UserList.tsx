import React, { useEffect, useState } from 'react';
import UserInfo from '../../component/gamelobby/UserInfo';

const UserList = ({ callback }: any) => {
  useEffect(() => {}, []);

  return (
    <>
      <UserInfo />
      <UserInfo />
      <UserInfo />
      <UserInfo />
      <UserInfo />
      <UserInfo />
    </>
  );
};

export default UserList;
