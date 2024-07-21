import { useCallback } from 'react';
import {
  RefetchQueryFilters,
  useIsFetching,
  useQueryClient as useTanstackQueryClient,
} from '@tanstack/react-query';

/**
 * By default clears all queries. Specific queries can be cleared by passing either a functionName
 * from a contract that you want to refetch, or an address of a contract - in that case all queries
 * for that contract will be refetched.
 */
export const useRefetchQueries = () => {
  const tanstackQueryClient = useTanstackQueryClient();

  const isFetching = useIsFetching();

  const refetchQueries = useCallback(
    ({ doNotRefetch }: { doNotRefetch: string[] } = { doNotRefetch: [] }) => {
      const filter: RefetchQueryFilters = {
        predicate(query) {
          return !doNotRefetch.includes(query.queryKey[0] as string);
        },
      };
      return Promise.all([tanstackQueryClient.refetchQueries(filter)]);
    },
    [tanstackQueryClient],
  );

  return { refetchQueries, isFetching: isFetching > 0 };
};
