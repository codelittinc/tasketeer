import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import { featuresData } from './utils';
import FeaturesTabsChat from './FeaturesTabsChat';
import FeaturesTabsAccordion from './FeaturesTabsAccordion';
import FeatureDescription from './FeatureDescription';
import useWindowSize from '../../../hooks/useWindowSize';
import styles from './FeaturesTabs.module.css';

const FeaturesTabs = () => {
  const [displayMobile, setDisplayMobile] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(featuresData[0]);
  const windowSize = useWindowSize();

  useEffect(() => {
    setDisplayMobile(windowSize.width < 1161);
  }, [windowSize]);

  const renderFeatureDescriptions = () =>
    selectedFeature.description.map((description, index) => (
      <div className={styles.description} key={`description-${index}`}>
        <FeatureDescription
          description={description}
          color={selectedFeature.color}
        />
      </div>
    ));

  const renderTabs = () =>
    featuresData.map((feature, index) => (
      <div
        onClick={() => setSelectedFeature(featuresData[index])}
        className={clsx(
          selectedFeature === feature
            ? styles[`tab${feature.color}Active`]
            : styles[`tab${feature.color}`]
        )}
        key={`feature-${index}`}
      >
        {feature.title}
      </div>
    ));

  return (
    <Grid container className={styles.container}>
      {displayMobile ? (
        <FeaturesTabsAccordion />
      ) : (
        <>
          <div className={styles.tabsContainer}>{renderTabs()}</div>

          <div
            className={clsx(
              styles.featureDescription,
              styles[`description${selectedFeature.color}`]
            )}
          >
            <div className={styles.descriptionsContainer}>
              {renderFeatureDescriptions()}
            </div>

            <div className={styles.chatContainer}>
              <FeaturesTabsChat feature={selectedFeature} />
            </div>
          </div>
        </>
      )}
    </Grid>
  );
};

export default FeaturesTabs;
