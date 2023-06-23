import * as React from "react";
import classNames from "classnames";
import styles from "./TasketeerButton.module.css";

export const buttonCategories = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  quaternary: "quaternary",
};

export const buttonSize = {
  medium: "Medium",
  large: "Large",
  extraLarge: "ExtraLarge",
  fullWidth: "FullWidth",
};

const TasketeerButton = ({
  category,
  disabled,
  icon,
  onClick,
  size = buttonSize.medium,
  text,
  variablesClassName,
}) => {
  const isCategoryPrimary = category === buttonCategories.primary;
  const isCategorySecondary = category === buttonCategories.secondary;
  const isCategoryTertiary = category === buttonCategories.tertiary;
  const isCategoryQuaternary = category === buttonCategories.quaternary;

  return (
    <button
      className={classNames(
        styles.button,
        styles[`button${size}`],
        variablesClassName,
        {
          [styles.primaryButton]: isCategoryPrimary,
          [styles.secondaryButton]: isCategorySecondary,
          [styles.tertiaryButton]: isCategoryTertiary,
          [styles.quaternaryButton]: isCategoryQuaternary,
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {icon && icon}
    </button>
  );
};

export default TasketeerButton;
