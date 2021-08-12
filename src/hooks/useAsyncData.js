import { useEffect, useState } from "preact/hooks";

export function useAsyncData(promise) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    promise
      .then(data => setData(data))
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false));

  }, []);

  return { data, error, loading, update: setData };
}