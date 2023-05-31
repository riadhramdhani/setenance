import React, { useEffect } from 'react'
import { get_users } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function Users() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_users());
      }, []);
  return (
    <div>Users</div>
  )
}

export default Users