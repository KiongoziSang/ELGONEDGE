import { useEffect, useState } from "react";
import type { LoadingState } from "../types";

export function useApiData<T>(loader: () => Promise<T>, initialData: T): LoadingState<T> {
  const [state, setState] = useState<LoadingState<T>>({
    data: initialData,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const data = await loader();
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (err) {
        if (mounted) {
          setState({
            data: initialData,
            loading: false,
            error: err instanceof Error ? err.message : "Unable to load data."
          });
        }
      }
    }

    void run();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
