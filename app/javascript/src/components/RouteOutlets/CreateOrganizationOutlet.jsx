import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../constants/routes';

const CreateOrganizationOutlet = () => {
  const {
    user,
  } = useSelector(
    (state) => state.auth,
  );
  const hasOrganization = !!user.selected_organization?.id;

  return hasOrganization ? (
    <Navigate
      to={{ pathname: routes.organization }}
    />
  ) : <Outlet />;
};

export default CreateOrganizationOutlet;
