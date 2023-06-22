import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../constants/routes';

const LoggedOutOutlet = () => {
  const {
    user,
  } = useSelector(
    (state) => state.auth,
  );
  const signedIn = user && user.id;

  return signedIn ? (
    <Navigate
      to={{ pathname: routes.welcome }}
    />
  ) : <Outlet />;
};

export default LoggedOutOutlet;
