import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import COLORS from '../../../../utils/colors';
import LinkIcon from '../../../../../../assets/icons/link.svg';

const CrawlerInput = ({ onChange, value }) => (
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
        src={LinkIcon}
      />
    </IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1.5, fontWeight: '600' }}
      placeholder="Write or paste a link here"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </Paper>
);

CrawlerInput.defaultProps = {
  onChange: () => {},
  value: '',
};

CrawlerInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default CrawlerInput;
