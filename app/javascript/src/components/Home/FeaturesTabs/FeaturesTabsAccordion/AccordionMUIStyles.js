import COLORS from "../../../../utils/colors";

export const AccordionStyles = (name) => {
  let tabBackgroundColor;
  let tabColor;

  switch (name) {
    case "panelGrey":
      tabBackgroundColor = COLORS.neutral400;
      tabColor = COLORS.neutral1000;
      break;
    case "panelPurple":
      tabBackgroundColor = COLORS.primary200;
      tabColor = COLORS.secondary100;
      break;
    case "panelOrange":
      tabBackgroundColor = COLORS.complementary100;
      tabColor = COLORS.neutral1000;
      break;
    case "panelYellow":
      tabBackgroundColor = COLORS.complementary200;
      tabColor = COLORS.neutral1000;
      break;
  }

  return {
    "&.MuiPaper-root": {
      backgroundColor: tabBackgroundColor,
      backgroundImage: "none",
      border: "none",
      borderRadius: "24px",
      color: tabColor,
      margin: "0 0 -8px",
      padding: "12px 0",
      width: "100%",
      "&:before": {
        display: "none",
      },
      "&:first-of-type": {
        borderTopRightRadius: "24px",
        borderTopLeftRadius: "24px",
      },
      "&:last-of-type": {
        borderBottomRightRadius: "24px",
        borderBottomLeftRadius: "24px",
      },
    },
  };
};

export const AccordionSummaryStyles = {};

export const AccordionDetailsStyles = {
  "&.MuiAccordionDetails-root": {
    alignItems: "center",
    justifyContent: "center",
    padding: "0 16px",
    display: "flex",
  },
};
