import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import TrashIcon from '../../../../../../assets/icons/trash-icon.svg';

const headerColumnStyles = {
  fontFamily: 'Montserrat',
  fontWeight: '600',
  fontSize: '16px',
  fontStyle: 'normal',
  borderBottom: '1px solid var(--neutral400)',
  padding: '14px 24px',
};

const rowColumnStyles = (isLast) => ({
  fontFamily: 'Montserrat',
  fontWeight: '600',
  fontStyle: 'normal',
  fontSize: '14px',
  padding: '14px 24px',
  [isLast ? 'border-bottom' : '']: '0px',
});

const PermissionTable = ({ permissions, onDelete }) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell sx={headerColumnStyles}>User email</TableCell>
        <TableCell sx={headerColumnStyles}>Permission type</TableCell>
        <TableCell sx={headerColumnStyles}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {permissions.length > 0 && permissions.map((permission, index) => (
        <TableRow key={permission.id}>
          <TableCell sx={rowColumnStyles(index === permissions.length - 1)}>
            {permission.email}
          </TableCell>
          <TableCell sx={rowColumnStyles(index === permissions.length - 1)}>
            {permission.role}
          </TableCell>
          <TableCell sx={{
            ...rowColumnStyles(index === permissions.length - 1),
            textAlign: 'center',
          }}
          >
            <IconButton onClick={() => onDelete(permission.id)}>
              <img src={TrashIcon} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

PermissionTable.defaultProps = {
  onDelete: () => {},
  permissions: [],
};

PermissionTable.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    role: PropTypes.string,
  })),
  onDelete: PropTypes.func,
};

export default PermissionTable;
