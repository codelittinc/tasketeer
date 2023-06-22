import { dialogClasses } from "@mui/material";
import COLORS from "../../utils/colors";
import CloseIcon from "../../../../assets/icons/close-icon.svg";

export const DEFAULT_STYLE_DIALOG_WRAPPER = {
  backgroundColor: COLORS.blurColor,
  backdropFilter: "blur(8px)",
  [`& .${dialogClasses.paper}`]: {
    borderRadius: "24px",
  },
};

export const DEFAULT_STYLE_TITLE = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  fontFamily: "Clash Display",
  fontSize: "24px",
  lineHeight: "32px",
  padding: "24px",
  backgroundColor: COLORS.neutral900,
};

export const DEFAULT_STYLE_CONTENT = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: COLORS.neutral200,
  backgroundColor: COLORS.neutral900,
  borderBottom: `1px solid ${COLORS.neutral800}`,
};

export const DEFAULT_STYLE_ACTIONS = {
  backgroundColor: COLORS.neutral900,
  padding: "24px",
};

export const CLOSE_ICON = {
  width: 12,
  height: 12,
  svg: CloseIcon,
  alt: "Close",
};

export const DEFAULT_STYLE_ICON = {
  margin: "5px",
  right: "-15px",
  top: "-20px",
  backgroundColor: "transparent",
  width: "12px",
  height: "12px",
};
