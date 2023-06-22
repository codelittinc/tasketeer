import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { useSpeechRecognition } from "react-speech-kit";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField/InputField";
import MessagesService from "../../../services/messages.service";
import WhiteMessageIcon from "../../../../../assets/icons/white-send-message.svg";
import MicrophoneIcon from "../../../../../assets/icons/white-microphone.svg";
import StopIcon from "../../../../../assets/icons/stop.svg";
import styles from "./Chat.module.css";
import {
  submitButtonStyles,
  formStyles,
  microphoneConferenceBox,
  boxMessageStyle,
  boxAvatarStyle,
  lottieStyle,
  conferenceMicIconStyle,
  messageUserTitle,
  messageContent,
} from "./ChatMUIStyles";
import ChatActionButtons from "../../../components/ChatActionButtons";
import talkingJson from "../../../../../assets/animations/AI-talking.json";
import processingBlocksJson from "../../../../../assets/animations/processing-blocks.json";
import useWindowSize from "../../../hooks/useWindowSize";
import {
  LIMIT_CHARACTERS_TEXT,
  YOU_USER,
  createChatMessage,
  deleteChatMessages,
  getAuthor,
  getTrainTasketeerActions,
} from "./utils";
import LightTooltip from "../../../components/LightTooltip";
import Modal from "../../../components/Modal";
import GptApiKeyService from "../../../services/gptApiKey.service";

const ChatPage = ({ cable }) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] =
    useState(true);
  const [isConferenceMode, setIsConferenceMode] = useState(false);
  const [isAITalking, setIsAITalking] = useState(false);
  const [audioHasStopped, setAudioHasStopped] = useState(false);
  const [initialTooltip, setInitialTooltip] = useState(true);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showTrainingModal, setShowTrainingModal] = useState(true);
  const [showLimitCondition, setShowLimitCondition] = useState(false);
  const [showUnsupportedBrowser, setShowUnsupportedBrowser] = useState(false);
  const [submitTooltipText, setSubmitTooltipText] = useState("");
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const isUserAdmin = currentUser.is_admin;
  const isUserAbleToUseChat =
    !isUserAdmin && !currentUser.selected_organization.nlp_indexed;
  const isMessageLengthValid = value.length <= 8000;

  useEffect(() => {
    const fetchMessages = async () => {
      const { apiKey: apiKeyResponse } = await GptApiKeyService.getApiKey();

      if (!apiKeyResponse?.value) {
        setShowTrainingModal(true);
      }
    };

    if (currentUser.id) {
      fetchMessages();
    }
  }, [currentUser]);

  const resetScroll = useCallback(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  useEffect(() => {
    setShowTrainingModal(!currentUser.selected_organization.nlp_indexed);
  }, [currentUser]);

  const setMessagesAndScrollDown = useCallback(
    (data) => {
      setMessages(data);
      resetScroll();
    },
    [resetScroll]
  );

  const onReceived = (data) => {
    setValue("");
    const { message, audio } = data;

    if (audio) {
      setIsAITalking(true);
      const audioDataUrl = new Audio(`data:audio/mp3;base64,${audio}`);
      audioDataUrl.addEventListener("ended", () => {
        setAudioHasStopped(true);
      });
      audioDataUrl.play();
    }

    if (!message?.is_question) {
      setLoading(false);
    }

    setMessagesAndScrollDown([...messages, message]);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { messages: data } = await MessagesService.listMessages();
      setMessagesAndScrollDown(data);
    };

    if (userId) {
      fetchMessages();
    }
  }, [setMessagesAndScrollDown, userId]);

  useEffect(() => {
    cable.subscriptions.create(
      { channel: "MessagesChannel", user_id: `${userId}` },
      {
        // update your state whenever new data is received
        received: (data) => onReceived(data),
      }
    );
  }, [cable, userId, onReceived]);

  // Once we load the page in Coference mode, we show the tooltip to the user
  useEffect(() => {
    if (initialTooltip && isConferenceMode) {
      setTimeout(() => {
        setInitialTooltip(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConferenceMode]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult: (result) => {
      setValue(capitalizeFirstLetter(`${result}`));
    },
  });

  useEffect(() => {
    if (messages?.length) {
      setLoading(messages[messages.length - 1].writer_id != null);
      resetScroll();
    }
  }, [messages, resetScroll]);

  const deleteMessages = async () => {
    const response = await deleteChatMessages();
    if (response.status === 204) {
      setMessages([]);
      setLoading(false);
    }
  };

  const changeMode = () => {
    setIsConferenceMode(!isConferenceMode);
  };

  useEffect(() => {
    async function fetchMessage() {
      await createChatMessage(value, userId, true);
    }

    if (!listening && value.length && isConferenceMode) {
      fetchMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  // After the AI audio is stopped, we will change the microphone button icon
  useEffect(() => {
    if (audioHasStopped || isAITalking) {
      setIsAITalking(false);
      setAudioHasStopped(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioHasStopped]);

  const processingComponent = (
    <Lottie
      loop
      animationData={processingBlocksJson}
      play
      style={lottieStyle}
    />
  );

  const AItalkingComponent = (
    <Lottie loop animationData={talkingJson} play style={lottieStyle} />
  );

  const stopIconComponent = (
    <Box
      component="img"
      src={StopIcon}
      alt="Stop Listening"
      sx={conferenceMicIconStyle}
    />
  );

  const micIconComponent = (
    <Box
      component="img"
      src={MicrophoneIcon}
      alt="Microphone"
      sx={conferenceMicIconStyle}
    />
  );

  const renderIconButton = loading
    ? processingComponent
    : listening
    ? stopIconComponent
    : isAITalking
    ? AItalkingComponent
    : micIconComponent;

  const userInteractionSpan =
    listening || loading ? (
      <span className={styles.listeningSpan}>
        {listening ? "Listening..." : "Processing..."}
      </span>
    ) : null;

  const handleMicClick = async () => {
    if (!isMessageLengthValid) {
      setShowLimitCondition(true);
      setSubmitTooltipText(LIMIT_CHARACTERS_TEXT);
      return;
    }

    if (listening) {
      stop();
    }

    if (value.length) {
      setValue("");
      setLoading(true);

      await createChatMessage(value, userId, isSpeechRecognitionActive);
      setIsSpeechRecognitionActive(true);
    } else {
      setInitialTooltip(false);
      if (!supported) {
        setShowUnsupportedBrowser(true);
        setSubmitTooltipText(
          "Unsupported browser, please type in the input and send your question"
        );
      }
      listen();
    }
  };

  const getBoxMessage = (message, user, isConferenceBox) => {
    const messageUser = getAuthor(user, message);
    const isSender = messageUser.name === YOU_USER;
    return (
      <Box key={message?.id || "conference-key"} sx={boxMessageStyle(isSender)}>
        <Avatar
          src={isConferenceBox ? currentUser.avatar : messageUser.avatar}
          sx={boxAvatarStyle(isSender)}
        />
        <div>
          <Typography sx={messageUserTitle(isSender)}>
            {isConferenceBox ? YOU_USER : messageUser.name}
          </Typography>
          <Typography sx={messageContent(isSender)}>
            {isConferenceBox ? value : message?.body}
          </Typography>
        </div>
      </Box>
    );
  };

  return (
    <>
      <Container
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          component="div"
          sx={{
            display: "flex",
            flexFlow: "column",
            height: "calc(100vh - 159px)",
          }}
        >
          {/* CHAT INTRO */}
          {!messages.length && !isConferenceMode && (
            <>
              <h1 className={styles.emptyMessagesHeader}>
                Hey {currentUser.given_name || currentUser.email.split("@")[0]}!{" "}
                <br />
                How can I assist you today?
              </h1>
              <p className={styles.emptyMessagesParagraph}>
                Tasketeer has two ways to interact, writing a message in the
                field below or with voice command
                <span
                  className={classNames(
                    styles.smallIconContainer,
                    styles.smallMicIconContainer
                  )}
                >
                  <img src={MicrophoneIcon} />
                </span>
              </p>
              <p className={styles.emptyMessagesParagraph}>
                With written queries, you'll receive a written answer on the
                screen. When using the voice feature, Tasketeer not only
                provides a written response but also reads it aloud.
              </p>
            </>
          )}

          {/* CHAT MESSAGE CONTAINER */}
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              ...(isConferenceMode ? { paddingBottom: "150px" } : undefined),
            }}
          >
            {messages?.map((message) => getBoxMessage(message, currentUser))}

            {(listening || loading) &&
              isConferenceMode &&
              !!value.length &&
              getBoxMessage(value, currentUser, isConferenceMode)}
          </Box>

          {!isConferenceMode && (
            <Box sx={formStyles}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  mt: 1,
                  width: "100%",
                }}
              >
                <InputField
                  margin="normal"
                  id="message"
                  label="Write a Message"
                  name="message"
                  autoFocus
                  disabled={loading || isAITalking || isUserAbleToUseChat}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setIsSpeechRecognitionActive(!newValue.length);
                    setValue(capitalizeFirstLetter(newValue));
                  }}
                  value={value}
                  onKeyUp={(e) => {
                    if (e.code === "Enter") {
                      handleMicClick();
                    }
                  }}
                  sx={{ display: "flex", mr: 1, flexGrow: 1 }}
                />
                <LightTooltip
                  title={submitTooltipText}
                  placement={windowSize.width >= 650 ? "left" : "top"}
                  arrow
                  open={
                    (showLimitCondition && !isMessageLengthValid) ||
                    showUnsupportedBrowser
                  }
                  onOpen={() => {
                    if (!isMessageLengthValid) {
                      setShowLimitCondition(true);
                      setSubmitTooltipText(LIMIT_CHARACTERS_TEXT);
                    }
                  }}
                  onClose={() => {
                    setShowLimitCondition(false);
                    setShowUnsupportedBrowser(false);
                  }}
                  disableFocusListener
                >
                  <Button
                    variant="contained"
                    disabled={loading || isAITalking || isUserAbleToUseChat}
                    sx={submitButtonStyles(listening)}
                    disableRipple
                    onClick={handleMicClick}
                  >
                    {loading ? (
                      processingComponent
                    ) : listening ? (
                      stopIconComponent
                    ) : isAITalking ? (
                      AItalkingComponent
                    ) : !isSpeechRecognitionActive && value.length ? (
                      <Box
                        component="img"
                        src={WhiteMessageIcon}
                        alt="Send Message"
                        sx={{
                          mr: 0.125,
                          alignSelf: "center",
                        }}
                      />
                    ) : (
                      micIconComponent
                    )}
                  </Button>
                </LightTooltip>
              </Box>
            </Box>
          )}
        </Container>
        <ChatActionButtons
          onDeleteMessages={deleteMessages}
          onChangeMode={changeMode}
        />
        {isConferenceMode && (
          <>
            {userInteractionSpan}
            <LightTooltip
              title="Click the voice button to start/stop and Tasketeer will provide a written response and read it aloud."
              placement={windowSize.width >= 650 ? "left" : "top"}
              arrow
              open={initialTooltip}
              onOpen={() => setInitialTooltip(true)}
              onClose={() => setInitialTooltip(false)}
              disableFocusListener
            >
              <Button
                type="submit"
                variant="contained"
                disabled={loading || isAITalking}
                disableRipple
                disableTouchRipple
                sx={microphoneConferenceBox(listening)}
                onClick={handleMicClick}
              >
                {renderIconButton}
              </Button>
            </LightTooltip>
          </>
        )}
      </Container>
      <Modal
        title="Train Tasketeer First"
        content={`In order to unlock our chat feature, we need to train Tasketeer first with relevant documents and set up the necessary integrations. ${
          isUserAdmin ? "" : "Please contact your admin."
        }`}
        open={showTrainingModal}
        onClose={() => setShowTrainingModal(false)}
        actions={getTrainTasketeerActions(
          isUserAdmin,
          navigate,
          setShowTrainingModal
        )}
        keepMounted
        hideCloseIcon
        disableBackdropClick
        dialogActionsSx={{ padding: "20px" }}
      />
    </>
  );
};

export default ChatPage;
