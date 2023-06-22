import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../constants/routes';

const AdminOutlet = () => {
  const {
    user,
  } = useSelector(
    (state) => state.auth,
  );
  const isAdmin = user && user.id && user.is_admin;

  return isAdmin ? <Outlet /> : (
    <Navigate
      to={{ pathname: routes.organization }}
    />
  );
};

export default AdminOutlet;
