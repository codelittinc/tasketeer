import * as React from 'react';
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import RolesService from '../../../services/roles.service';
import PermissionsService from '../../../services/permissions.service';
import { showSnackbar } from '../../../features/feedbackSlice';
import PermissionInput from './PermissionInput';
import PermissionTable from './PermissionTable';
import Alerts from '../../../constants/alerts';
import styles from './Permission.module.css';

const PermissionsPage = () => {
  const dispatch = useDispatch();
  const [roles, setRoles] = React.useState([]);
  const [permissions, setPermissions] = React.useState([]);

  const handleCreate = async ({ email, role }) => {
    const {
      Ok, notFound, errorMessage, alreadyExists,
    } = await PermissionsService.createPermission(email, role);

    if (notFound) {
      dispatch(showSnackbar({
        message: 'User not found in organization. Please try again.',
        type: Alerts.warning,
      }));
    } else if (alreadyExists) {
      dispatch(showSnackbar({
        message: 'This user already has this permission. Please check the email and role and try again.',
        type: Alerts.warning,
      }));
    } else if (!Ok || errorMessage) {
      dispatch(showSnackbar({
        message: 'There was an error. Please try again.',
        type: Alerts.error,
      }));
    } else if (Ok) {
      dispatch(showSnackbar({
        message: 'Permission added successfully',
        type: Alerts.success,
      }));
      const { roles: items } = await PermissionsService.listPermissions();
      setPermissions(items || []);
    }
  };

  const handleDelete = async (id) => {
    const { Ok, errorMessage } = await PermissionsService.deletePermission(id);
    if (!Ok || errorMessage) {
      dispatch(showSnackbar({
        message: 'There was an error removing this Permission. Please try again.',
        type: Alerts.error,
      }));
    } else if (Ok) {
      dispatch(showSnackbar({
        message: 'Permission removed successfully',
        type: Alerts.success,
      }));
      const { roles: items } = await PermissionsService.listPermissions();
      setPermissions(items || []);
    }
  };

  React.useEffect(() => {
    const loadRoles = async () => {
      const { roles } = await RolesService.listRoles();
      setRoles(roles || []);
    };

    const loadPermissions = async () => {
      const { roles } = await PermissionsService.listPermissions();
      setPermissions(roles || []);
    };

    loadPermissions();
    loadRoles();
  }, []);

  return (
    <Container component="div" maxWidth="md" sx={{ mt: 8 }}>
      <p className={styles.title}>
        User Permissions
      </p>
      <p>
        As an admin, this section allows you to assign specific permissions to users, granting them appropriate levels of access to edit, manage, and view files. By assigning permissions, you can ensure that the right people have the right access, promoting effective collaboration and maintaining data security.
      </p>

      <Box component="form">
        <Box
          sx={{
            width: '85%',
            alignItems: 'center',
            display: 'flex',
            mt: 4,
          }}
        >
          <PermissionInput
            onSave={handleCreate}
            roles={roles}
          />
        </Box>
      </Box>

      <Box
        sx={{
          mt: 4,
          mb: 8,
          width: '85%',
          backgroundColor: '#1A1A1A',
          borderRadius: '12px',
          overflow: 'auto',
        }}
      >
        <PermissionTable
          permissions={permissions}
          onDelete={handleDelete}
        />
      </Box>
    </Container>
  );
};

export default PermissionsPage;
