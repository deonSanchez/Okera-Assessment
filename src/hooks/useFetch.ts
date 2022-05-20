import { useState, useEffect } from 'react';

const useFetch = (
  url: string = '',
  paramValue: string = '',
  skip: boolean = false
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${url}${paramValue}`);
        const json = await response.json();

        if (!signal.aborted) {
          setData(json);
        }
      } catch (err) {
        if (!signal.aborted) {
          console.error(err);
          setError(err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (!skip) {
      fetchData();
    }

    return () => {
      abortController.abort();
    };
  }, [url, paramValue, skip]);

  return { data, error, loading };
};

export default useFetch;
