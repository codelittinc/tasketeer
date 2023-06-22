/* eslint-disable react/prop-types */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../constants/routes';

const PrivateOutlet = () => {
  const {
    user,
  } = useSelector(
    (state) => state.auth,
  );
  const signedIn = user && user.id;
  const waitingApproval = signedIn && user.waiting_for_approval;

  if (waitingApproval) {
    return (
      <Navigate
        to={{ pathname: routes.waitingApproval }}
      />
    );
  }

  return signedIn ? <Outlet /> : (
    <Navigate
      to={{ pathname: routes.login }}
    />
  );
};

export default PrivateOutlet;
