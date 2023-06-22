import { useLocation } from 'react-router-dom';
import routes from '../constants/routes';

export const usePageTitle = () => {
  const url = useLocation().pathname;

  switch (url) {
    case routes.organization:
    case routes.webCrawler:
    case routes.integration:
      return 'Training Setup';
    case routes.chat:
      return 'Chat';
    case routes.history:
      return 'Conversation History';
    case routes.permissions:
      return 'Team Permissions';
    default:
      return '';
  }
};
