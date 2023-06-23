import COLORS from "../../utils/colors";

export const AccordionStyles = (expanded, item) => {
  return {
    backgroundImage: "none",
    border:
      expanded === item.id
        ? `2px solid ${COLORS.neutral100}`
        : `1px solid ${COLORS.neutral700}`,
    borderRadius: "16px",
    marginBottom: "16px",
    "&:before": {
      display: "none",
    },
    "&:first-of-type": {
      borderTopRightRadius: "16px",
      borderTopLeftRadius: "16px",
    },
    "&:last-of-type": {
      borderBottomRightRadius: "16px",
      borderBottomLeftRadius: "16px",
      marginBottom: "0",
    },
  };
};

export const AccordionSummaryStyles = (expanded, item) => {
  return {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "28px",
    margin: `${expanded === item.id ? "3px" : "4px"} 8px`,
  };
};

export const AccordionDetailsStyles = {
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "24px",
  padding: "0 24px 24px",
};

export const MenuAccordionStyles = {
  backgroundImage: "none",
  borderBottom: `2px solid ${COLORS.neutral700}`,
  "&:before": {
    display: "none",
  },
};

export const MenuAccordionSummaryStyles = {
  fontSize: "20px",
  fontWeight: "500",
  lineHeight: "32px",
};

export const MenuAccordionDetailsStyles = {
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
};
