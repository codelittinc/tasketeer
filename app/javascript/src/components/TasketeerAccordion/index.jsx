import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import CircleUp from "../../../../assets/icons/minus-circle.svg";
import CircleDown from "../../../../assets/icons/plus-circle.svg";
import ArrowUp from "../../../../assets/icons/arrow-up.svg";
import ArrowDown from "../../../../assets/icons/arrow-down.svg";
import {
  AccordionDetailsStyles,
  AccordionStyles,
  AccordionSummaryStyles,
  MenuAccordionStyles,
  MenuAccordionSummaryStyles,
  MenuAccordionDetailsStyles,
} from "./TasketeerAccordionStyles";

const TasketeerAccordion = ({ items, isMenuAccordion }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (item) => (isExpanded) => {
    if (item.content) {
      expanded === item.id
        ? setExpanded(false)
        : setExpanded(isExpanded ? item.id : false);
    }
  };

  const CloseIcon = isMenuAccordion ? ArrowUp : CircleUp;
  const OpenIcon = isMenuAccordion ? ArrowDown : CircleDown;

  const renderFAQAccordion = () => {
    return items.map((item) => {
      return (
        <Accordion
          disableGutters
          expanded={expanded === item.id}
          key={item.id}
          onChange={handleChange(item)}
          sx={
            isMenuAccordion
              ? MenuAccordionStyles
              : AccordionStyles(expanded, item)
          }
        >
          <AccordionSummary
            expandIcon={
              !item.content ? null : expanded === item.id ? (
                <img src={CloseIcon} />
              ) : (
                <img src={OpenIcon} />
              )
            }
            sx={
              isMenuAccordion
                ? MenuAccordionSummaryStyles
                : AccordionSummaryStyles
            }
          >
            {item.title}
          </AccordionSummary>
          <AccordionDetails
            sx={
              isMenuAccordion
                ? MenuAccordionDetailsStyles
                : AccordionDetailsStyles
            }
          >
            {item.content}
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return <div>{renderFAQAccordion()}</div>;
};

export default TasketeerAccordion;
