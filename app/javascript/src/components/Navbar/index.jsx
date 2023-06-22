import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { REACT_APP_ENABLE_SIGN_IN } from "env";
import routes from "../../constants/routes";
import SlackLoginButton from "../SlackButtons";
import TasketeerLogo from "../../../../assets/images/tasketeer-logo.svg";
import LoginIcon from "../../../../assets/icons/login-black.svg";
import CloseIcon from "../../../../assets/icons/close-icon.svg";
import TasketeerButton, {
  buttonCategories,
  buttonSize,
} from "../TasketeerButton";
import {
  navigationButton,
  sidebarLink,
  MenuAccordionLink,
} from "./NavbarMUIStyles";
import useWindowSize from "../../hooks/useWindowSize";
import UserMenu from "./userMenu";
import { usePageTitle } from "../../hooks/usePageTitle";
import COLORS from "../../utils/colors";
import TasketeerAccordion from "../TasketeerAccordion";
import NotionIcon from "../../../../assets/icons/notion-menu-icon.svg";
import GPTIcon from "../../../../assets/icons/chatgpt-menu-icon.svg";
import LinksIcon from "../../../../assets/icons/links-menu-icon.svg";
import UploadIcon from "../../../../assets/icons/upload-menu-icon.svg";
import AddToSlackButton from "../SlackButtons/AddToSlackButton";
import useLogout from "../../hooks/useLogout";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const logout = useLogout();
  const { user } = useSelector((state) => state.auth);
  const windowSize = useWindowSize();
  const navigate = useNavigate();

  const appNotInstalledToSlack =
    user?.selected_organization?.notifications_id === "0";

  const drawerWidth = 453;

  const [sideBar, setSideBar] = React.useState(false);

  const [signedIn, setSignedIn] = useState(null);

  useEffect(() => {
    user && setSignedIn(user.id);
  }, [user]);

  const handleLogout = () => {
    logout();
    setSignedIn(null);
    setSideBar(false);
  };

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const handleDrawerToggle = () => {
    setSideBar((prevState) => !prevState);
  };

  const handleNavigate = (route) => {
    handleDrawerToggle();
    navigate(route);
  };

  const renderMenuTitle = (name, route) => {
    return (
      <ListItem sx={{ padding: "0" }}>
        <ListItemButton
          onClick={() => {
            route && handleNavigate(route);
          }}
          sx={{ padding: "0", fontFamily: "Clash Display" }}
        >
          {name}
        </ListItemButton>
      </ListItem>
    );
  };

  const renderMenuContent = (name, icon, route) => {
    return (
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            route && handleNavigate(route);
          }}
          sx={MenuAccordionLink}
        >
          <img src={icon} />
          {name}
        </ListItemButton>
      </ListItem>
    );
  };

  const renderMenu = (name, route) => {
    return (
      <ListItem disablePadding sx={sidebarLink}>
        <ListItemButton onClick={() => navigate(route)}>
          <p className={styles.mobileLinkText}>{name}</p>
        </ListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} className={styles.sidebar}>
      <div className={styles.sidebarHeaderContainer}>
        <IconButton
          sx={{
            backgroundColor: COLORS.neutral900,
            borderRadius: "8px",
            height: "56px",
            marginRight: 3,
            width: "56px",
          }}
        >
          <img src={CloseIcon} />
        </IconButton>
        <img src={TasketeerLogo} />
      </div>

      {signedIn ? (
        <List
          sx={{ marginTop: signedIn ? "24px" : "auto" }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {user?.is_admin && (
            <>
              <TasketeerAccordion
                isMenuAccordion
                items={[
                  {
                    id: "navbar-item-1",
                    title: renderMenuTitle("Training Setup"),
                    content: (
                      <>
                        {renderMenuContent("GPT Setup", GPTIcon, routes.setup)}
                        {renderMenuContent(
                          "Upload Files",
                          UploadIcon,
                          routes.organization
                        )}
                        {renderMenuContent(
                          "Set Notion API",
                          NotionIcon,
                          routes.integration
                        )}
                        {renderMenuContent(
                          "Domain Links",
                          LinksIcon,
                          routes.webCrawler
                        )}
                      </>
                    ),
                  },
                  {
                    id: "navbar-item-2",
                    title: renderMenuTitle(
                      "Team Permissions",
                      routes.permissions
                    ),
                  },
                  {
                    id: "navbar-item-3",
                    title: renderMenuTitle(
                      "Conversation History",
                      routes.history
                    ),
                  },
                  {
                    id: "navbar-item-4",
                    title: renderMenuTitle("Support", routes.support),
                  },
                  {
                    id: "navbar-item-5",
                    title: renderMenuTitle("FAQ", routes.faq),
                  },
                ]}
              />

              <ListItem
                disablePadding
                sx={{ marginBottom: "56px", marginTop: "4px" }}
              >
                <ListItemButton
                  onClick={() => navigate(routes.chat)}
                  sx={{ paddingLeft: "0" }}
                >
                  <TasketeerButton
                    category={buttonCategories.primary}
                    size={buttonSize.extraLarge}
                    onClick={() => handleNavigate(routes.chat)}
                    text="Chat"
                  />
                </ListItemButton>
              </ListItem>

              <Box display={"flex"} sx={{ gap: "30px" }}>
                <TasketeerButton
                  category={buttonCategories.tertiary}
                  onClick={handleLogout}
                  text="Log out"
                />
                <TasketeerButton
                  category={buttonCategories.quaternary}
                  onClick={() => handleNavigate(routes.privacy)}
                  text="Privacy Policy"
                />
              </Box>
            </>
          )}
        </List>
      ) : (
        <List sx={{ marginTop: "auto" }}>
          {renderMenu("FAQ", routes.faq)}
          {renderMenu("Support", routes.support)}
          {renderMenu("Privacy", routes.privacy)}

          <ListItem disablePadding>
            <TasketeerButton
              category={buttonCategories.primary}
              size={buttonSize.large}
              onClick={() => navigate(routes.signup)}
              text="Get Started for Free"
            />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundImage: "none",
          marginTop: windowSize.width < 900 ? "16px" : "32px",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: "72px",
            justifyContent: "space-between",
            padding: `0 ${windowSize.width < 900 ? "20px" : "32px"}`,
          }}
        >
          <div className={styles.navLogoContainer}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                backgroundColor: COLORS.neutral900,
                borderRadius: "8px",
                display: signedIn
                  ? "flex"
                  : windowSize.width < 900
                  ? "flex"
                  : "none",
                height: "56px",
                margin: "0 35px 0 0",
                width: "56px",
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component={RouterLink}
              to={
                !signedIn
                  ? routes.root
                  : user.is_admin
                  ? routes.adminHome
                  : routes.chat
              }
              sx={{
                height: "27px",
              }}
            >
              <img src={TasketeerLogo} />
            </Typography>
          </div>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {signedIn ? (
              <h1 style={{ marginRight: "196px" }}>{usePageTitle()}</h1>
            ) : (
              <>
                <Button
                  key="faq"
                  onClick={() => navigate(routes.faq)}
                  sx={navigationButton(routes.faq)}
                >
                  FAQ
                </Button>
                <Button
                  key="support"
                  onClick={() => navigate(routes.support)}
                  sx={navigationButton(routes.support)}
                >
                  Support
                </Button>
                <Button
                  key="privacy"
                  onClick={() => navigate(routes.privacy)}
                  sx={navigationButton(routes.privacy)}
                >
                  Privacy
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {signedIn ? (
              <>
                {appNotInstalledToSlack && windowSize.width >= 900 && (
                  <AddToSlackButton isSmall />
                )}
                <UserMenu logout={handleLogout} />
              </>
            ) : REACT_APP_ENABLE_SIGN_IN === "true" ? (
              <div className={styles.buttonsContainer}>
                <TasketeerButton
                  category={buttonCategories.primary}
                  onClick={() => navigate(routes.signup)}
                  text="Get Started for Free"
                  variablesClassName={styles.signupButton}
                />
                <TasketeerButton
                  category={buttonCategories.secondary}
                  onClick={() => navigate(routes.login)}
                  text="Log in"
                  icon={
                    windowSize.width >= 900 && (
                      <img className={styles.loginIcon} src={LoginIcon} />
                    )
                  }
                />
              </div>
            ) : (
              <SlackLoginButton />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={sideBar}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {
              xs: "block",
            },
            "& .MuiDrawer-paper": {
              backgroundImage: "none",
              boxSizing: "border-box",
              width: {
                xs: "100%",
                sm: "100%",
                md: drawerWidth,
              },
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
