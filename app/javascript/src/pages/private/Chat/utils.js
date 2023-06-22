import React from 'react';
import { Box, Button } from '@mui/material';
import TasketeerAvatar from '../../../../../assets/images/tasketeer-avatar.png';
import MessagesService from '../../../services/messages.service';
import COLORS from '../../../utils/colors';
import routes from '../../../constants/routes';
import Continue from '../../../../../assets/icons/continue.svg';

const TASKETEER_INFO = {
  name: 'Tasketeer',
  avatar: TasketeerAvatar,
};

export const LIMIT_CHARACTERS_TEXT = 'Please, type a text of 8,000 characters or less';

export const YOU_USER = 'You';
export const getAuthor = (user, message) => {
  const { writer_id } = message;
  const { avatar_url } = user;

  const author = {
    name: YOU_USER,
    avatar: avatar_url,
  };

  return writer_id ? author : TASKETEER_INFO;
};

export const createChatMessage = async (body, user_id, has_audio) => MessagesService.createMessage({
  body,
  user_id,
  has_audio,
});

export const deleteChatMessages = async () => MessagesService.deleteAllMessages();

export const getTrainTasketeerActions = (isAdmin, navigate, setShowTrainingModal) => (isAdmin
  ? [
    <Button
      key="setup"
      variant="container"
      disableRipple
      sx={{
        backgroundColor: COLORS.primary200,
        borderRadius: '12px',
        padding: '12px 32px',
        textTransform: 'none',
        '&:hover': { backgroundColor: COLORS.primary200 },
      }}
      onClick={() => navigate(routes.adminHome)}
      endIcon={(
        <Box
          component="img"
          src={Continue}
          alt="Continue to Training"
          sx={{
            mr: 0.125,
            alignSelf: 'center',
          }}
        />
    )}
    >
      Go to Training Setup
    </Button>,
  ]
  : [
    <Button
      key="ok"
      variant="container"
      disableRipple
      sx={{
        backgroundColor: COLORS.primary200,
        borderRadius: '12px',
        padding: '12px 32px',
        textTransform: 'none',
        '&:hover': { backgroundColor: COLORS.primary200 },
      }}
      onClick={() => setShowTrainingModal(false)}
    >
      Ok
    </Button>,
  ]);
