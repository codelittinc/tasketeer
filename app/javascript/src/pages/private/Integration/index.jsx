import * as React from 'react';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import NotionIntegrationService from '../../../services/notion_integrarion.service';
import OrganizationsService from '../../../services/organizations.service';
import Alerts from '../../../constants/alerts';
import { showSnackbar } from '../../../features/feedbackSlice';
import NotionInput from './NotionInput';
import styles from './Integration.module.css';
import COLORS from '../../../utils/colors';
import { login } from '../../../features/authSlice';
import UsersService from '../../../services/users.service';

export default function IntegrationPage() {
  const {
    user,
  } = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();
  const [loadingRun, setLoadingRun] = React.useState(false);
  const [pages, setPages] = React.useState(null);

  const [notionApiKey, setNotionApiKey] = React.useState(user.selected_organization.notion_api_key);

  useEffect(() => {
    async function fetchPages() {
      const {
        pages,
      } = await NotionIntegrationService.allPages(user.selected_organization.id);

      setPages(pages);
    }
    fetchPages();
  }, []);

  const handleChangeKey = (notion) => {
    setNotionApiKey(notion);
  };

  const runIntegration = async (e) => {
    e.preventDefault();
    setLoadingRun(true);

    const {
      errorMessage: errorMessageUpdate,
    } = await OrganizationsService.updateOrganization(user.selected_organization.id, notionApiKey);
    if (errorMessageUpdate) {
      dispatch(showSnackbar({
        message: errorMessage,
        type: Alerts.error,
      }));
    }

    const {
      errorMessage,
    } = await NotionIntegrationService.runIntegration(user.selected_organization.id);

    if (errorMessage) {
      dispatch(showSnackbar({
        message: errorMessage,
        type: Alerts.error,
      }));
    } else {
      dispatch(showSnackbar({
        message: 'Notion integration started. It may take a few minutes to complete.',
        type: Alerts.success,
      }));
    }
    setLoadingRun(false);

    // Refresh the user so we have it with the notion api key
    const { user: userData } = await UsersService.getAuthenticatedUser();
    dispatch(login(userData));
  };

  const buildPageChildren = (page) => {
    if (!page.children || !page.children.length) {
      return;
    }
    return (
      <>
        {page.children.map((pageChildren) => (
          <TreeItem
            nodeId={pageChildren.attributes.id}
            label={pageChildren.attributes.name}
            sx={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '14px',
              minHeight: '24px',
              padding: '4px',
            }}
          >
            {buildPageChildren(pageChildren)}
          </TreeItem>
        ))}
      </>
    );
  };

  const buildPageTree = () => (
    <>
      {pages.length > 0 && pages.map((page) => (
        <TreeItem
          nodeId={page.attributes.id}
          label={page.attributes.name}
          sx={{
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '14px',
            minHeight: '24px',
            padding: '4px',
          }}
        >
          {buildPageChildren(page)}
        </TreeItem>
      ))}
    </>
  );

  return (
    <Box component="form" sx={{ mt: 1 }}>

      <p className={styles.title}>
        Configure Notion
      </p>
      <p className={styles.description}>
        Notion API key will be securely stored and used solely for retrieving relevant company information to enhance Tasketeer's responses.
      </p>

      <NotionInput
        value={notionApiKey}
        onChange={handleChangeKey}
      />

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={8}>
          <p>
            Don't have a Notion API key yet?
            {' '}
            <a className={styles.learnUrl} href="https://developers.notion.com/docs/create-a-notion-integration#step-1-create-an-integration" target="_blank" rel="noreferrer">
              <b>Learn how to generate it</b>
            </a>
          </p>
        </Grid>
        <Grid item xs={4}>
          <Button
            type="button"
            onClick={runIntegration}
            variant="contained"
            loading
            sx={{
              padding: '12px 16px',
              height: '48px',
              textTransform: 'none',
              float: 'right',
              width: '183px',
              borderRadius: '12px',
              backgroundColor: COLORS.primary200,
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '24px',
              color: COLORS.neutral100,
            }}
            disabled={loadingRun}
          >
            {loadingRun ? <CircularProgress color="primary" size={24} /> : 'Run Integration'}
          </Button>
        </Grid>
        {pages && pages.length ? (
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: COLORS.neutral900,
              borderRadius: '16px',
              padding: '0',
              mt: '24px',
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                borderBottom: `1px solid ${COLORS.neutral100}`,
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '16px',
                height: '56px',
                lineHeight: '56px',
                verticalAlign: 'middle',
              }}
            >
              Pages from Notion
            </Typography>

            <TreeView
              aria-label="Pages"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                flexGrow: 1,
                maxWidth: 1200,
                overflowY: 'scroll',
                height: '277px',
                mb: '16px',
                fontFamily: 'Montserrat',
              }}
            >
              {buildPageTree()}
            </TreeView>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}
