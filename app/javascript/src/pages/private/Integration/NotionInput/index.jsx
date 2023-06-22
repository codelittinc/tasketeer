import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import COLORS from '../../../../utils/colors';
import NotionIcon from '../../../../../../assets/icons/notion-white.svg';

const NotionInput = ({ onChange, value }) => (
  <Paper
    component="form"
    variant="outlined"
    sx={{
      width: '100%',
      p: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      border: `2px solid ${COLORS.neutral100}`,
      borderRadius: '12px',
      height: '56px',
    }}
  >
    <IconButton sx={{ p: '10px' }} aria-label="menu">
      <img
        src={NotionIcon}
      />
    </IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1.5, fontWeight: '600' }}
      placeholder="Notion API Key"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </Paper>
);

NotionInput.defaultProps = {
  onChange: () => {},
  value: '',
};

NotionInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default NotionInput;
