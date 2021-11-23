import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from './ApiCallImpl';

export const ApiCall = () => {
  const queryClient = useQueryClient();

  const query = useQuery('test', api.getCall);
  const mutation = useMutation(api.postCall(), { onSuccess: () => queryClient.invalidateQueries('test') });

  return (
    <h1 className="mainContent">
      {query.isLoading ? 'Loading...' : query.error ? 'Error occurred: ' + query.error : query.data?.data.data}
    </h1>
  );
};
