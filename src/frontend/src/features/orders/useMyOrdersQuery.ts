import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import type { Order } from '@/backend';

export function useMyOrdersQuery() {
  const { actor, isFetching: isActorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Order[]>({
    queryKey: ['myOrders'],
    queryFn: async () => {
      if (!actor) throw new Error('Backend actor not available');
      return actor.getMyOrders();
    },
    enabled: !!actor && !isActorFetching && !!identity,
    retry: 2,
  });
}
