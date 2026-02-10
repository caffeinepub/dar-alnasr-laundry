import { useState } from 'react';
import { CatalogPage } from './features/catalog/CatalogPage';
import { CartPage } from './features/cart/CartPage';
import { CheckoutPage } from './features/checkout/CheckoutPage';
import { OrderConfirmationPage } from './features/orders/OrderConfirmationPage';
import { MyOrdersPage } from './features/orders/MyOrdersPage';
import { OrderDetailsPage } from './features/orders/OrderDetailsPage';

export type View = 'catalog' | 'cart' | 'checkout' | 'confirmation' | 'myOrders' | 'orderDetails';

export interface AppState {
  currentView: View;
  confirmedOrderId?: string;
  selectedOrderIndex?: number;
}

export function MainApp() {
  const [appState, setAppState] = useState<AppState>({ currentView: 'catalog' });

  const navigate = (view: View, data?: { orderId?: string; orderIndex?: number }) => {
    setAppState({
      currentView: view,
      confirmedOrderId: data?.orderId,
      selectedOrderIndex: data?.orderIndex,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {appState.currentView === 'catalog' && <CatalogPage onNavigate={navigate} />}
      {appState.currentView === 'cart' && <CartPage onNavigate={navigate} />}
      {appState.currentView === 'checkout' && <CheckoutPage onNavigate={navigate} />}
      {appState.currentView === 'confirmation' && (
        <OrderConfirmationPage orderId={appState.confirmedOrderId} onNavigate={navigate} />
      )}
      {appState.currentView === 'myOrders' && <MyOrdersPage onNavigate={navigate} />}
      {appState.currentView === 'orderDetails' && (
        <OrderDetailsPage orderIndex={appState.selectedOrderIndex} onNavigate={navigate} />
      )}
    </div>
  );
}
