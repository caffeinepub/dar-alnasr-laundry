import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import type { CartState } from '../cart/types';
import type { Order, OrderItem } from '@/backend';

interface PlaceOrderParams {
  cart: CartState;
  deliveryAddress: string;
  customerInfo: {
    name: string;
    phone: string;
    pickupAddress: string;
    pickupDate: string;
    pickupTime: string;
    notes: string;
  };
}

export function usePlaceOrderMutation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cart, deliveryAddress }: PlaceOrderParams) => {
      if (!actor) throw new Error('Backend actor not available');

      const items: OrderItem[] = Object.values(cart).map(item => ({
        categoryName: item.categoryName,
        itemName: item.itemName,
        quantity: BigInt(item.quantity),
        price: item.unitPrice,
      }));

      const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        BigInt(0)
      );

      const order: Order = {
        items,
        totalPrice,
        deliveryAddress,
      };

      await actor.placeOrder(order);
      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
    },
  });
}
