import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { ACTION_BUTTONS, getModalContents } from './utils';
import Icon from '../Icon';
import GroupButtons from './GroupButtons';
import Modal from '../Modal';

const ChatActionButtons = ({ onDeleteMessages, onChangeMode }) => {
  const [actionClick, setActionClick] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickIcon = (item) => {
    setActionClick(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setActionClick(undefined);
    setIsModalOpen(false);
  };

  const handleDeleteMessages = () => {
    onDeleteMessages?.();
    setIsModalOpen(false);
  };

  const infoActionButton = ACTION_BUTTONS[0];
  const clearActionButton = ACTION_BUTTONS[2];
  const modalContents = getModalContents(handleClose, handleDeleteMessages);

  return (
    <>
      <Container
        component='div'
        sx={{ width: '100px', position: 'fixed', right: '32px' }}
      >
        <Container component='div'>
          <>
            <Icon
              icon={infoActionButton}
              onClick={() => handleClickIcon(modalContents[0])}
            />
            <GroupButtons onChangeMode={onChangeMode} />
            <Icon
              icon={clearActionButton}
              onClick={() => handleClickIcon(modalContents[1])}
            />
          </>
        </Container>
      </Container>
      {actionClick && (
        <Modal
          title={actionClick.title}
          content={actionClick.content}
          open={isModalOpen}
          onClose={handleClose}
          actions={actionClick.actions}
          dialogActionsSx={actionClick.dialogActionsSx}
        />
      )}
    </>
  );
};

export default ChatActionButtons;
