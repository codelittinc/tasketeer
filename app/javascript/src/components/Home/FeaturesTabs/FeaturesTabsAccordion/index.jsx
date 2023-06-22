import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { featuresData } from "../utils";
import {
  AccordionDetailsStyles,
  AccordionStyles,
  AccordionSummaryStyles,
} from "./AccordionMUIStyles";
import FeaturesTabsChat from "../FeaturesTabsChat";
import FeatureDescription from "../FeatureDescription";
import Carousel from "nuka-carousel";
import styles from "./FeaturesTabsAccordion.module.css";

const FeaturesTabsAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const handleTabExpansion = (isExpanded, panelName) => {
    setExpanded(isExpanded ? panelName : false);
  };

  return featuresData.map((feature) => {
    const panelName = `panel${feature.color}`;

    const renderDescriptions = (feature) => {
      return feature.description.map((description, index) => {
        return (
          <FeatureDescription
            key={description - `${index}`}
            description={description}
            color={feature.color}
          />
        );
      });
    };

    return (
      <Accordion
        key={feature.color}
        expanded={expanded === panelName}
        onChange={(event, isExpanded) => {
          handleTabExpansion(isExpanded, panelName);
        }}
        sx={AccordionStyles(panelName)}
      >
        <AccordionSummary
          id={`panel${feature.color}-header`}
          aria-controls={`panel${feature.color}-content`}
          sx={AccordionSummaryStyles}
        >
          <p className={styles.tabTitle}>{feature.title}</p>
        </AccordionSummary>

        <AccordionDetails sx={AccordionDetailsStyles}>
          <div className={styles.chatContainer}>
            <FeaturesTabsChat feature={feature} />

            <Carousel
              renderCenterLeftControls={false}
              renderCenterRightControls={false}
              dragThreshold={0}
            >
              {renderDescriptions(feature)}
            </Carousel>
          </div>
        </AccordionDetails>
      </Accordion>
    );
  });
};

export default FeaturesTabsAccordion;
