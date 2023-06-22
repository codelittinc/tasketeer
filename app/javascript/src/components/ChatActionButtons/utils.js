import React from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import Button from '@mui/material/Button';
import TrashIcon from '../../../../assets/icons/trash-icon.svg';
import InfoIcon from '../../../../assets/icons/info-icon.svg';
import ProcessIcon from '../../../../assets/icons/process-icon.svg';
import COLORS from '../../utils/colors';

const ICON_SIZE = 15;

export const INFO_ACTION_ID = 'Info';
export const MORE_ACTION_ID = 'More';
export const DELETE_ACTION_ID = 'Delete';

export const getModalContents = (onClose, onClearConversartion) => [
  {
    id: INFO_ACTION_ID,
    title: 'How it works?',
    content:
      "Tasketeer offers the flexibility of interacting through both, written queries and voice commands.\n With written queries, you'll receive a written answer on the screen. When using the voice feature, Tasketeer not only provides a written response but also reads it aloud.",
    actions: [
      <Button
        key="ok"
        variant="container"
        disableRipple
        sx={{
          backgroundColor: COLORS.primary200,
          borderRadius: '12px',
          '&:hover': { backgroundColor: COLORS.primary200 },
        }}
        onClick={onClose}
      >
        Ok
      </Button>,
    ],
    dialogActionsSx: {
      justifyContent: 'center',
      padding: '15px',
    },
  },
  {
    id: DELETE_ACTION_ID,
    title: 'Confirm Conversation Clean-up',
    content:
      'Are you sure you want to clean up the entire conversation history with Tasketeer? This action will permanently remove all chat messages and cannot be undone.',
    actions: [
      <Button
        key="cancel"
        variant="outline"
        disableRipple
        sx={{
          backgroundColor: COLORS.neutral900,
          border: `2px solid ${COLORS.neutral800}`,
          borderRadius: '12px',
          '&:hover': { backgroundColor: COLORS.neutral900 },
        }}
        onClick={onClose}
      >
        Cancel
      </Button>,
      <Button
        key="clear"
        variant="container"
        disableRipple
        sx={{
          backgroundColor: COLORS.primary200,
          borderRadius: '12px',
          '&:hover': { backgroundColor: COLORS.primary200 },
        }}
        onClick={onClearConversartion}
      >
        Clear Conversation
      </Button>,
    ],
    dialogActionsSx: {
      justifyContent: 'space-between',
      padding: '15px',
    },
  },
];

export const ACTION_BUTTONS = [
  {
    id: INFO_ACTION_ID,
    alt: 'Information',
    svg: InfoIcon,
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  {
    id: MORE_ACTION_ID,
    alt: 'More Options',
    svg: ProcessIcon,
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  {
    id: DELETE_ACTION_ID,
    alt: 'Delete',
    svg: TrashIcon,
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
];

const moreButtonItemStyle = {
  width: '100%',
  border: 'none',
  color: 'white',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  justifyContent: 'flex-start',
  textTransform: 'none',
  '&:hover': {
    border: 'none',
  },
};

export const moreButtonList = (onChangeMode, onSupportClick) => [
  <Button
    key="mode"
    sx={moreButtonItemStyle}
    startIcon={<AutorenewOutlinedIcon sx={{ fontSize: '11px' }} />}
    onClick={onChangeMode}
  >
    Change Mode
  </Button>,
  <Button
    key="support"
    sx={moreButtonItemStyle}
    startIcon={<EmailOutlinedIcon sx={{ fontSize: '13px' }} />}
    onClick={onSupportClick}
  >
    Support
  </Button>,
];

export default { ACTION_BUTTONS };
