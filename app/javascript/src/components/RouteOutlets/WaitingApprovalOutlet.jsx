import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../constants/routes';

const WaitingApprovalOutlet = () => {
  const {
    user,
  } = useSelector(
    (state) => state.auth,
  );
  const waitingApproval = user && user.waiting_for_approval;

  return waitingApproval ? <Outlet /> : (
    <Navigate
      to={{ pathname: routes.organization }}
    />
  );
};

export default WaitingApprovalOutlet;
