import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import TrashIcon from '../../../../../../assets/icons/trash-icon.svg';
import styles from './CrawlerTable.module.css';

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

const getTitle = (item) => {
  let title = item.url;
  if (!title) {
    title = item.name;
  }

  if (!title) {
    return '';
  }

  if (title.length > 50) {
    return `${title.substring(0, 50)}...`;
  }

  return title;
};

const CrawlerTable = ({ urls, onDelete }) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell sx={headerColumnStyles}>Link</TableCell>
        <TableCell sx={headerColumnStyles}>Status</TableCell>
        <TableCell sx={headerColumnStyles}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {urls.length > 0 && urls.map((item, index) => (
        <TableRow key={item.id}>
          <TableCell sx={rowColumnStyles(index === urls.length - 1)}>
            <p title={item.url || item.name}>{getTitle(item)}</p>
          </TableCell>
          <TableCell sx={rowColumnStyles(index === urls.length - 1)}>
            <p className={item.indexed ? styles.indexed : styles.inProgress}>
              <div className={item.indexed ? styles.dotIndexed : styles.dotInProgress} />
              {item.indexed ? 'Indexed' : 'In Progress'}
            </p>
          </TableCell>
          <TableCell sx={{
            ...rowColumnStyles(index === urls.length - 1),
            textAlign: 'center',
          }}
          >
            <IconButton onClick={() => onDelete(item.id)}>
              <img src={TrashIcon} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

CrawlerTable.defaultProps = {
  onDelete: () => {},
  urls: [],
};

CrawlerTable.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    role: PropTypes.string,
  })),
  onDelete: PropTypes.func,
};

export default CrawlerTable;
