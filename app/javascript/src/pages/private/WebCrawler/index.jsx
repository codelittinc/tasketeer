import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import WebPagesService from '../../../services/webPages.service';
import CrawlerInput from './CrawlerInput';
import CrawlerTable from './CrawlerTable';
import { showSnackbar } from '../../../features/feedbackSlice';
import styles from './WebCrawler.module.css';
import COLORS from '../../../utils/colors';
import Alerts from '../../../constants/alerts';

const WebCrawlerPage = () => {
  const dispatch = useDispatch();
  const [webPages, setWebPages] = useState([]);
  const [url, setUrl] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [getAllPages, setGetAllPages] = useState(false);

  const handleSubmit = async () => {
    const { webPage: webPageResponse, errorMessage } = await WebPagesService.createWebPage({
      web_page: {
        url,
      },
      get_all_pages: getAllPages,
    });

    if (errorMessage) {
      dispatch(showSnackbar({
        message: 'There was an error adding this Web Page. Please try again.',
        type: Alerts.error,
      }));
      return;
    }

    dispatch(showSnackbar({
      message: 'Page added successfully',
      type: Alerts.success,
    }));

    setWebPages([...webPages, webPageResponse]);
    setUrl('');
    setGetAllPages(false);
  };

  const handleDelete = async (id) => {
    const { Ok, errorMessage } = await WebPagesService.deleteWebPage(id);
    if (!Ok || errorMessage) {
      dispatch(showSnackbar({
        message: 'There was an error removing this Web Page. Please try again.',
        type: Alerts.error,
      }));
    } else if (Ok) {
      dispatch(showSnackbar({
        message: 'Page removed successfully',
        type: Alerts.success,
      }));
      const { webPages: data } = await WebPagesService.listWebPages();
      setWebPages(data);
    }
  };

  React.useEffect(() => {
    const validateForm = () => {
      if (!url) {
        return false;
      }

      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return false;
      }

      const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
        + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
        + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
        + '(\\#[-a-z\\d_]*)?$', 'i');
      if (!pattern.test(url)) {
        return false;
      }
      return true;
    };

    setIsFormValid(validateForm());
  }, [url]);

  useEffect(() => {
    const fetchWebPages = async () => {
      const { webPages: data } = await WebPagesService.listWebPages();
      setWebPages(data);
    };

    fetchWebPages();
  }, []);

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <p className={styles.title}>
        Add Links
      </p>
      <p className={styles.description}>
        You can further enrich the information available for user queries by adding domain links. By providing links to relevant websites or internal resources, Tasketeer can analyze and extract valuable insights to provide accurate and up-to-date answers.
      </p>

      <Box component="form" sx={{ mt: 1 }}>
        <CrawlerInput
          value={url}
          onChange={setUrl}
        />
      </Box>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={8}>
          <p>
            <FormControlLabel
              control={(
                <Checkbox
                  value={getAllPages}
                  onChange={() => {
                    setGetAllPages(!getAllPages);
                  }}
                />
          )}
              label="Crawl the links starting with the URL (limited to 5 pages)"
            />
          </p>
        </Grid>
        <Grid item xs={4}>
          <Button
            type="button"
            variant="contained"
            disabled={!isFormValid}
            onClick={handleSubmit}
            loading
            sx={{
              padding: '12px 16px',
              height: '48px',
              textTransform: 'none',
              float: 'right',
              width: '98px',
              borderRadius: '12px',
              backgroundColor: COLORS.primary200,
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '24px',
              color: COLORS.neutral100,
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      {webPages.length ? (
        <Box
          sx={{
            mt: 4,
            mb: 8,
            backgroundColor: '#1A1A1A',
            borderRadius: '12px',
            overflow: 'auto',
          }}
        >
          <CrawlerTable
            urls={webPages}
            onDelete={handleDelete}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default WebCrawlerPage;
