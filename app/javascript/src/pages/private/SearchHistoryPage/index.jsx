import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import {
  Link, useLocation,
} from 'react-router-dom';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import SearchHistoryService from '../../../services/search_history.service';
import routes from '../../../constants/routes';

export default function SearchHistoryPage() {
  const [searches, setSearches] = React.useState([]);
  const [pagination, setPagination] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const location = useLocation();
  const query = React.useMemo(() => new URLSearchParams(location.search), [location]);
  const page = parseInt(query.get('page') || '1', 10);

  const getPageParams = (targetPage) => {
    const nextPageQuery = new URLSearchParams(location.search);
    nextPageQuery.set('page', targetPage);
    return nextPageQuery.toString();
  };

  const fetchData = async () => {
    setLoading(true);
    const {
      searches: searchHistoryData,
      pagination: paginationData,
    } = await SearchHistoryService.fetchSearchHistory(page);
    setSearches(searchHistoryData || []);
    setPagination(paginationData);
    setLoading(false);
  };

  React.useEffect(() => {
    const loadHistory = async () => {
      await fetchData();
    };
    loadHistory();
  }, [page]);

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Query</TableCell>
            <TableCell>Response</TableCell>
            <TableCell sx={{ width: 155 }}>Searched at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            Array(6)
              .fill(0)
              .map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton variant="rectangular" height={36} />
                  </TableCell>
                </TableRow>
              ))
          )}

          {!loading && searches.length > 0 && searches.map((searchResponse) => {
            const search = searchResponse.attributes;
            return (
              <TableRow key={search.id}>
                <TableCell>{search.id}</TableCell>
                <TableCell>{search.query}</TableCell>
                <TableCell>{search.response}</TableCell>
                <TableCell>{search.created_at}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {pagination && (
        <Box sx={{ mt: 2, mb: 2, float: 'right' }}>
          <Pagination
            page={pagination?.page || 1}
            count={pagination?.pages || 1}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`${routes.history}${item.page === 1 ? '' : `?${getPageParams(item.page)}`}`}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...item}
              />
            )}
          />
        </Box>
      )}

      {!loading && searches.length === 0 && <div>No searches found</div>}
    </>
  );
}
