import { useState } from 'react';
import { useAsync } from './use-async';

const fetchData = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await data.json();
  return json;
  // throw new Error('que chato');
};

export const Home = () => {
  const [posts, setPosts] = useState(null);
  const [reFetchData, result, error, status] = useAsync(fetchData, true);

  switch (status) {
    case 'iddle':
      return <pre>Nada executando</pre>;
    case 'pending':
      return <pre>Loading...</pre>;
    case 'error':
      return <pre>{error.message}</pre>;
    case 'settled':
      return <pre>{JSON.stringify(result, null, 2)}</pre>;
  }
  return <pre>IXII</pre>;
};
