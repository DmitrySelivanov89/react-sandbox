import {useEffect, useState} from "react";

export const useFetch = <T>(url: string, initialValue: T, options?: RequestInit) => {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isFetching = true;
    const abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {...options, signal: abortController.signal});
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
      isFetching = false;
    };
  }, [url, options]);

  return {data, loading, error};
};
