import { useLocation } from "react-router-dom";
import COLORS from "../../utils/colors";

export const navigationButton = (name) => {
  const { pathname } = useLocation();

  return {
    color: "white",
    borderBottom:
      name === pathname ? `2px solid ${COLORS.secondary100}` : "none",
    borderRadius: "0",
    display: "block",
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: "400",
    margin: "0 16px",
    padding: "16px 4px",
    textTransform: "none",
    width: "fit-content",
    "&:hover": {
      backgroundColor: "transparent",
      color: COLORS.neutral500,
    },
  };
};

export const sidebarButton = {
  marginBottom: "36px",
};

export const MenuTitleButton = {
  fontFamily: "Clash Display",
  padding: "0",
  "&:hover": {
    backgroundColor: "transparent",
    color: COLORS.neutral500,
  },
};

export const MenuContentButton = {
  fontSize: "16px",
  fontWeight: 600,
  gap: "8px",
  lineHeight: "24px",
  margin: "0",
  "&:hover": {
    backgroundColor: "transparent",
  },
};
