import React, { useState, useEffect } from 'react';
import api from './ApiHandler';

const MainContent = () => {
  const [data, setData] = useState('Empty data');

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    api
      .sampleCall({ signal: signal })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((e) => console.log(e));

    return () => {
      abortController.abort();
    };
  }, [data]);

  return (
    <div>
      <h1 className="mainContent">This is backend response: {data}</h1>
    </div>
  );
};

export default MainContent;
