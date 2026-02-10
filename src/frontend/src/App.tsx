import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './features/cart/CartContext';
import { MainApp } from './MainApp';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
