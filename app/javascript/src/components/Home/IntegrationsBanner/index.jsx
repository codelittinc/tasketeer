import * as React from "react";
import Grid from "@mui/material/Grid";
import TasketeerMascot from "../../../../../assets/images/tasketeer-mascot-book.png";
import BlackDawnIcon from "../../../../../assets/icons/black-dawn.svg";
import GoogleDriveIcon from "../../../../../assets/icons/google-drive-icon.svg";
import NotionIcon from "../../../../../assets/icons/notion-icon.svg";
import SlackIcon from "../../../../../assets/icons/slack-icon.svg";
import JiraIcon from "../../../../../assets/icons/jira-icon.svg";
import GitHubIcon from "../../../../../assets/icons/github-icon.svg";
import BoxIcon from "../../../../../assets/icons/box-icon.svg";
import styles from "./IntegrationsBanner.module.css";

const IntegrationsBanner = () => {
  return (
    <Grid container className={styles.grid}>
      <Grid
        item
        xs={12}
        sm={12}
        md={11}
        lg={10}
        className={styles.mainGridItem}
      >
        <Grid container className={styles.contentSection}>
          <Grid item xs={12} sm={12} md={7} lg={8}>
            <div>
              <img src={BlackDawnIcon} className={styles.blackDawnIcon} />
              <h2 className={styles.sectionHeader}>
                Empowering Companies to Effortlessly Find and Manage
                Information.
              </h2>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            className={styles.integrationsGrid}
          >
            <div>
              <p className={styles.integrationsTitle}>Integrations:</p>

              <div className={styles.integrationBox}>
                <img src={SlackIcon} className={styles.integrationIcon} />
                <span className={styles.integrationBoxText}>Slack</span>
              </div>

              <div className={styles.integrationBox}>
                <img src={NotionIcon} className={styles.integrationIcon} />
                <span className={styles.integrationBoxText}>Notion</span>
              </div>

              <div className={styles.integrationBox}>
                <img src={GoogleDriveIcon} className={styles.integrationIcon} />
                <span className={styles.integrationBoxText}>
                  Google Drive (soon)
                </span>
              </div>

              <div className={styles.integrationBox}>
                <img src={JiraIcon} className={styles.integrationIcon} />
                <span className={styles.integrationBoxText}>Jira (soon)</span>
              </div>

              <div className={styles.integrationBox}>
                <img src={GitHubIcon} className={styles.integrationIcon} />
                <span className={styles.integrationBoxText}>Github (soon)</span>
              </div>

              <div className={styles.integrationBox}>
                <img src={BoxIcon} className={styles.integrationIcon} />
                <span className={styles.integrationBoxText}>Box (soon)</span>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <div className={styles.tasketeerMascotContainer}>
        <img src={TasketeerMascot} className={styles.tasketeerMascotImage} />
      </div>
    </Grid>
  );
};

export default IntegrationsBanner;
