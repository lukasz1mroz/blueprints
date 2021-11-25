import { useQuery, useMutation } from 'react-query';
import api from './ApiCallImpl';

export const ApiCall = () => {
  const query = useQuery('test', api.getCall);
  const mutation = useMutation(api.postCall);

  return (
    <div className="content">
      <h1 className="mainContent">
        {query.isLoading ? 'Loading...' : query.error ? 'Error occurred: ' + query.error : query.data?.data.data}
      </h1>
      <button className="button" onClick={() => mutation.mutate()}>
        Send action
      </button>
    </div>
  );
};
