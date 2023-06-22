import React from "react";
import TasketeerAvatar from "../../../../../../assets/icons/tasketeer-avatar.svg";
import UserAvatar from "../../../../../../assets/icons/user-avatar.svg";
import styles from "./FeaturesTabsChat.module.css";

const FeaturesTabsChat = ({ feature }) => {
  return (
    <div className={styles.container}>
      <div className={styles[`chat${feature.color}`]}>
        <img src={UserAvatar} width={40} />

        <div>
          <p className={styles.chatUser}>You</p>
          <p className={styles.chatText}>{feature.question}</p>
        </div>
      </div>
      <div className={styles[`chat${feature.color}`]}>
        <img src={TasketeerAvatar} width={32} />

        <div>
          <p className={styles.chatTasketeer}>Tasketeer</p>
          <p className={styles.chatText}>{feature.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesTabsChat;
