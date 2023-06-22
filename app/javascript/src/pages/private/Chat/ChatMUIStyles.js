import COLORS from "../../../utils/colors";

export const submitButtonStyles = (listening) => ({
  backgroundColor: listening ? COLORS.primary300 : COLORS.primary200,
  borderRadius: "56px",
  height: "56px",
  minWidth: "auto",
  width: "56px",
  mt: 3,
  mb: 2,
  "&: hover": {
    backgroundColor: listening ? COLORS.primary300 : COLORS.primary200,
  },
  "&: disabled": {
    backgroundColor: COLORS.neutral900,
  },
});

export const formStyles = {
  backgroundColor: "#121212",
  bottom: 0,
  marginTop: "auto",
  position: "sticky",
};

export const microphoneConferenceBox = (listening) => ({
  width: "80px",
  height: "80px",
  borderRadius: "24px",
  backgroundColor: listening ? COLORS.primary300 : COLORS.primary200,
  position: "fixed",
  right: "40px",
  bottom: "52px",
  "&: hover": {
    backgroundColor: listening ? COLORS.primary300 : COLORS.primary200,
  },
});

export const boxMessageStyle = (isSender) => ({
  backgroundColor: isSender ? "transparent" : COLORS.neutral900,
  color: COLORS.neutral100,
  display: "flex",
  width: "100%",
  borderRadius: "8px",
  padding: "12px 12px 20px",
});

export const boxAvatarStyle = (isSender) => ({
  border: isSender ? "none" : `2px solid ${COLORS.primary200}`,
  height: isSender ? "28px" : "34px",
  marginRight: "12px",
  width: isSender ? "28px" : "34px",
});

export const lottieStyle = { width: 48, height: 48 };

export const conferenceMicIconStyle = {
  height: 24,
  width: 24,
  mr: 0.125,
  alignSelf: "center",
};

export const messageUserTitle = (isSender) => ({
  color: isSender ? COLORS.neutral700 : COLORS.primary100,
  fontSize: "12px",
  fontWeight: "700",
  lineHeight: "16px",
  marginTop: "8px",
});

export const messageContent = (isSender) => ({
  color: isSender ? COLORS.neutral300 : COLORS.neutral100,
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
});
