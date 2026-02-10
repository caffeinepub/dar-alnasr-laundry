import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { Catalog } from '@/backend';

export function useCatalogQuery() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<Catalog>({
    queryKey: ['catalog'],
    queryFn: async () => {
      if (!actor) {
        throw new Error('Backend actor not available');
      }
      return actor.getCatalog();
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 0, // Always fetch fresh data to ensure latest prices are displayed
    retry: 2,
  });
}
