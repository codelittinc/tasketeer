import React from "react";
import CheckMark from "../../../../../../assets/icons/checkmark.svg";
import CheckMarkWhite from "../../../../../../assets/icons/checkmark-white.svg";
import styles from "./FeatureDescription.module.css";

const FeatureDescription = ({ description, color }) => {
  return (
    <div className={styles.container}>
      <img
        src={color === "Purple" ? CheckMarkWhite : CheckMark}
        width={24}
      />

      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default FeatureDescription;
