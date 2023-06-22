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
  padding: '14px 24px',
};

const headerLastColumnStyles = {
  fontFamily: 'Montserrat',
  fontWeight: '600',
  fontSize: '16px',
  fontStyle: 'normal',
  padding: '14px 24px',
  textAlign: 'center',
};

const rowColumnStyles = {
  fontFamily: 'Montserrat',
  fontWeight: '600',
  fontStyle: 'normal',
  fontSize: '14px',
  padding: '14px 24px',
  borderBottom: '0px',
};

const SetupTable = ({ apiKey, onDelete }) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell sx={headerColumnStyles}>Key</TableCell>
        <TableCell sx={headerLastColumnStyles}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow key={apiKey.id}>
        <TableCell sx={rowColumnStyles}>
          ***********************************************
          {apiKey.value}
        </TableCell>
        <TableCell
          sx={{
            textAlign: 'center',
            borderBottom: '0px',
          }}
        >
          <IconButton onClick={() => onDelete(apiKey.id)}>
            <img src={TrashIcon} alt="delete" />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

SetupTable.defaultProps = {
  onDelete: () => {},
  apiKey: '',
};

SetupTable.propTypes = {
  apiKey: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};

export default SetupTable;
