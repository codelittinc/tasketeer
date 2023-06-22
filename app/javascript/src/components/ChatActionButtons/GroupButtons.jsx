import React, { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { ACTION_BUTTONS, moreButtonList } from './utils';
import Icon from '../Icon';
import COLORS from '../../utils/colors';
import routes from '../../constants/routes';

const GroupButtons = ({ onChangeMode }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeModeClick = () => {
    onChangeMode?.();
    handleClose();
  };

  const handleSupportClick = () => {
    navigate(routes.support);
  };

  const moreButtonBgColor = open ? COLORS.primary200 : COLORS.neutral900;

  return (
    <>
      <ButtonGroup
        variant='contained'
        aria-label='split button'
        sx={{ boxShadow: 'none' }}
      >
        <Icon
          icon={ACTION_BUTTONS[1]}
          onClick={handleClick}
          sx={{
            backgroundColor: moreButtonBgColor,
            '&:hover': { backgroundColor: moreButtonBgColor },
            '&:active': { backgroundColor: moreButtonBgColor },
          }}
        />
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorEl} placement='left-start' transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                display: 'flex',
                marginRight: 1,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <ButtonGroup
                  orientation='vertical'
                  aria-label='vertical button group'
                  sx={{
                    backgroundColor: COLORS.neutral900,
                    alignItems: 'flex-start',
                  }}
                >
                  {moreButtonList(handleChangeModeClick, handleSupportClick)}
                </ButtonGroup>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default GroupButtons;
