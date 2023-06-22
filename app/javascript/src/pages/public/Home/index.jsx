import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TasketeerButton, {
  buttonCategories,
  buttonSize,
} from "../../../components/TasketeerButton";
import routes from "../../../constants/routes";
import TasketeerAccordion from "../../../components/TasketeerAccordion";
import TasketeerImage from "../../../../../assets/images/home-hero-image.png";
import IntegrationsBanner from "../../../components/Home/IntegrationsBanner";
import DawnIcon from "../../../../../assets/icons/dawn.svg";
import ArrowCircle from "../../../../../assets/icons/arrow-circle.svg";
import FAQItems from "../../../constants/faqItems";
import FeaturesTabs from "../../../components/Home/FeaturesTabs";
import styles from "./Home.module.css";
import AddToSlackButton from "../../../components/SlackButtons/AddToSlackButton";

export default function Home() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.id) {
      user.is_admin ? navigate(routes.adminHome) : navigate(routes.chat);
    }
  }, [user]);

  return (
    <>
      <Grid container className={styles.heroGridContainer}>
        <Grid
          item
          order={{
            xs: 2,
            sm: 2,
            md: 1,
            lg: 1,
            xl: 1,
          }}
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          sx={{
            display: "flex",
            pr: 2,
          }}
        >
          <div className={styles.heroContentContainer}>
            <p className={styles.heroLegend}>
              Save Up to 80% of Your Time
              <img src={DawnIcon} className={styles.dawnIcon} />
            </p>
            <h1 className={styles.heroHeader}>
              Streamline Your Document Search
            </h1>
            <p className={styles.heroSubtitle}>
              Boost your productivity by talking to your documents, to get the
              information you need.
            </p>

            <AddToSlackButton />
          </div>
        </Grid>
        <Grid
          item
          order={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
          }}
          xs={12}
          sm={12}
          md={7}
          lg={7}
          xl={7}
          sx={{
            marginBottom: { xs: "28px", sm: "28px", md: "0" },
            pl: 2,
          }}
        >
          <Box
            component="img"
            src={TasketeerImage}
            alt="Tasketeer "
            sx={{
              maxWidth: "100%",
              pointerEvents: "none",
            }}
          />
        </Grid>
      </Grid>

      <FeaturesTabs />

      <IntegrationsBanner />

      <Grid container spacing={2} className={styles.faqGridContainer}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <h2 className={styles.faqSectionTitle}>Frequently Asked Questions</h2>
        </Grid>

        <Grid item xs={12} sm={12} md={9} lg={9}>
          <TasketeerAccordion items={FAQItems.slice(0, 5)} />

          <div className={styles.faqSectionButtonWrapper}>
            <TasketeerButton
              category={buttonCategories.secondary}
              icon={
                <img
                  src={ArrowCircle}
                  className={styles.faqSectionButtonIcon}
                />
              }
              onClick={() => navigate(routes.faq)}
              text="Read More"
            />
          </div>
        </Grid>
      </Grid>

      <Grid container className={styles.signupGridContainer}>
        <Grid item xs={10}>
          <section className={styles.signupSection}>
            <h2 className={styles.signupSectionTitle}>
              Try it today and discover a new way of document search efficiency
            </h2>

            <TasketeerButton
              category={buttonCategories.primary}
              size={buttonSize.large}
              onClick={() => navigate(routes.signup)}
              text="Try Tasketeer Now!"
            />
          </section>
        </Grid>
      </Grid>
    </>
  );
}
