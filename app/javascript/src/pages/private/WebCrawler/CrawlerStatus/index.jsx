import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './CrawlerStatus.module.css';

const CrawlerStatus = ({ url }) => {
  if (url.is_processing && !url.indexed) {
    return (
      <p className={styles.inProgress}>
        <div className={styles.dotInProgress} />
        In Progress
      </p>
    );
  }
  if (url.indexed) {
    return (
      <p className={styles.indexed}>
        <div className={styles.dotIndexed} />
        Indexed
      </p>
    );
  }
  return null;
};

CrawlerStatus.defaultProps = {
  url: {
    indexed: false,
    is_processing: false,
  },
};

CrawlerStatus.propTypes = {
  url: PropTypes.shape({
    indexed: PropTypes.bool,
    is_processing: PropTypes.bool,
  }),
};

export default CrawlerStatus;
