import * as React from 'react';
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import UploadFileIcon from '../../../../assets/icons/upload-transparent.svg';
import ScreenSearchDesktopIcon from '../../../../assets/icons/world-transparent.svg';
import NotionIcon from '../../../../assets/icons/notion-white.svg';
import GoogleDriveIcon from '../../../../assets/icons/google-drive-icon.svg';
import routes from '../../constants/routes';
import COLORS from '../../utils/colors';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  React.useEffect(() => {
    // redirect to /chat if user is not admin
    if (user && !user.is_admin) {
      navigate(routes.chat);
    }
  }, []);

  const renderButton = (text, path, icon) => (
    <ListItem
      disablePadding
      sx={{ pb: 0.5, backgroundColor: COLORS.neutral1000 }}
    >
      <ListItemButton
        component={RouterLink}
        to={path}
        selected={location.pathname === path}
        className={classNames(
          styles.button,
          location.pathname === path && styles.buttonActive,
        )}
      >
        <ListItemIcon>
          <ReactSVG
            src={icon}
            className={classNames(
              text !== 'Set Notion API' && styles.buttonIcon,
            )}
          />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );

  return (
    user?.is_admin && (
      <div>
        <Grid container>
          <Grid
            item
            md={3}
            display={{
              xs: 'none',
              md: 'block',
            }}
            sx={{
              bgcolor: 'background.paper',
              paddingLeft: 2,
              paddingRight: 2,
              backgroundColor: COLORS.neutral1000,
            }}
          >
            <nav aria-label="main mailbox folders">
              <List sx={{ padding: 0 }}>
                {renderButton(
                  'Upload Files',
                  routes.organization,
                  UploadFileIcon,
                )}
                {renderButton('Set Notion API', routes.integration, NotionIcon)}
                {renderButton('Google Drive', routes.googleSetup, GoogleDriveIcon)}
                {renderButton(
                  'Domain Links',
                  routes.webCrawler,
                  ScreenSearchDesktopIcon,
                )}
              </List>
            </nav>
          </Grid>

          <Grid
            item
            md={9}
            sx={{
              width: '100%',
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Outlet />
          </Grid>
        </Grid>
      </div>
    )
  );
};

export default AdminLayout;
