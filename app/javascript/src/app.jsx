import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { REACT_APP_ENABLE_SIGN_IN } from "env";
import TasketeerSnackbar from "./components/TasketeerSnackbar";
import Home from "./pages/public/Home";
import LoginPage from "./pages/public/Login";
import SignupPage from "./pages/public/Signup";
import AppLayout from "./components/AppLayout";
import styles from "./app.module.css";
import UsersService from "./services/users.service";
import { login } from "./features/authSlice";
import PrivateOutlet from "./components/RouteOutlets/PrivateOutlet";
import OnboardingPage from "./pages/private/OnboardingPage";
import LoggedOutOutlet from "./components/RouteOutlets/LoggedOutOutlet";
import NotFoundPage from "./pages/public/NotFound";
import routes from "./constants/routes";
import PrivacyPage from "./pages/public/Privacy";
import FaqPage from "./pages/public/Faq";
import SupportPage from "./pages/public/Support";
import FilesPage from "./pages/private/Files";
import CreateOrganizationOutlet from "./components/RouteOutlets/CreateOrganizationOutlet";
import OauthSlackPage from "./pages/public/Oauth/slack";
import IntegrationPage from "./pages/private/Integration";
import WaitApprovalPage from "./pages/private/WaitApprovalPage";
import WaitingApprovalOutlet from "./components/RouteOutlets/WaitingApprovalOutlet";
import AdminLayout from "./components/AdminLayout";
import AdminOutlet from "./components/RouteOutlets/AdminOutlet";
import SearchHistoryPage from "./pages/private/SearchHistoryPage";
import ChatPage from "./pages/private/Chat";
import WebCrawlerPage from "./pages/private/WebCrawler";
import CodelittLogo from "../../assets/images/codelitt-logo.svg";
import COLORS from "./utils/colors";
import PermissionsPage from "./pages/private/Permissions";
import AdminHome from "./pages/private/AdminHome";
import SetupPage from "./pages/private/Setup";
import ApiCredentials from "./pages/private/ApiCredentials";
import RecoverPassword from "./pages/public/RecoverPassword";
import ResetPassword from "./pages/public/ResetPassword";
import GoogleSetup from "./pages/private/GoogleSetup";

export default function App({ cable }) {
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const { pathname } = useLocation();
  const footerEnabledPages = [
    routes.root,
    routes.support,
    routes.privacy,
    routes.faq,
  ];

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (pageLoaded) return;

    const fetchAuthenticatedUser = async () => {
      const { user: userData } = await UsersService.getAuthenticatedUser();

      if (userData && userData.id) {
        dispatch(login(userData));
      }

      setPageLoaded(true);
    };

    fetchAuthenticatedUser();
  }, [dispatch, pageLoaded]);

  return (
    <Box className={styles.box}>
      <Routes>
        <Route path={routes.root} element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path={routes.privacy} element={<PrivacyPage />} />
          <Route path={routes.faq} element={<FaqPage />} />
          <Route path={routes.support} element={<SupportPage />} />

          <Route path={routes.root} element={<WaitingApprovalOutlet />}>
            <Route
              path={routes.waitingApproval}
              element={<WaitApprovalPage />}
            />
          </Route>

          <Route path={routes.root} element={<PrivateOutlet />}>
            <Route path={routes.root} element={<CreateOrganizationOutlet />}>
              <Route path={routes.welcome} element={<OnboardingPage />} />
            </Route>
            <Route path={routes.adminHome} element={<AdminHome />} />

            <Route path={routes.chat} element={<ChatPage cable={cable} />} />
            <Route path={routes.permissions} element={<PermissionsPage />} />
            <Route path={routes.setup} element={<SetupPage />} />
            <Route path={routes.apiCredentials} element={<ApiCredentials />} />

            <Route path={routes.root} element={<AdminLayout />}>
              <Route path={routes.organization} element={<FilesPage />} />
              <Route path={routes.integration} element={<IntegrationPage />} />
              <Route path={routes.webCrawler} element={<WebCrawlerPage />} />
              <Route path={routes.googleSetup} element={<GoogleSetup />} />
            </Route>
          </Route>

          <Route path={routes.root} element={<AdminOutlet />}>
            <Route path={routes.root} element={<AdminLayout />}>
              <Route path={routes.history} element={<SearchHistoryPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />

          <Route
            path={routes.authorizeOauthSlack}
            element={<OauthSlackPage />}
          />
          <Route path={routes.loginSlack} element={<OauthSlackPage />} />
          <Route path={routes.root} element={<LoggedOutOutlet />}>
            {REACT_APP_ENABLE_SIGN_IN === "true" && (
              <Route path={routes.login} element={<LoginPage />} />
            )}
            {REACT_APP_ENABLE_SIGN_IN === "true" && (
              <Route path={routes.signup} element={<SignupPage />} />
            )}
            <Route
              path={routes.recoverPassword}
              element={<RecoverPassword />}
            />
            <Route path={routes.updatePassword} element={<ResetPassword />} />
          </Route>
        </Route>
      </Routes>

      <Backdrop
        sx={{
          color: COLORS.neutral100,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={!pageLoaded}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {footerEnabledPages.includes(pathname) && (
        <Box component="footer" className={styles.footer}>
          <p className={styles.footerText}>
            Made with love, Mongo, Box and a mouse - by &nbsp;
            <img src={CodelittLogo} className={styles.footerImage} />
          </p>
        </Box>
      )}

      <TasketeerSnackbar />
    </Box>
  );
}
