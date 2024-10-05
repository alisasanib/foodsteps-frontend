import { useEffect, useState } from "react";
import { fetchData } from "utils/fetchData";
import { API_URL } from "config";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const loadData = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const fetchedData = await fetchData<T>(`${API_URL}/${url}`, controller.signal);
        if (isMounted) {
          setData(fetchedData);
          setIsLoading(false);
        }
      } catch (error) {
        if (!controller.signal.aborted && isMounted) {
          if (error instanceof Error) {
            setError(error.message ?? "Something went wrong");
          }
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return { data, error, isLoading };
}
