import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiCall } from './ApiCall';

const queryClient = new QueryClient();

export default function ApiHandler() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiCall />
    </QueryClientProvider>
  );
}
