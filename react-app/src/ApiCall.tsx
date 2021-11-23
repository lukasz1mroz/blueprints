import { useQuery } from 'react-query';

export const ApiCall = () => {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('http://localhost:3000/test').then((res) => res.json())
  );

  return <h1 className="mainContent">{isLoading ? 'Loading...' : error ? 'Error occurred: ' + error : data.data}</h1>;
};
