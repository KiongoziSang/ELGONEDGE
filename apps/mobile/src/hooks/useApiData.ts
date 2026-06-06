import { useCallback, useEffect, useRef, useState } from "react";
import type { LoadingState } from "../types";

export function useApiData<T>(loader: () => Promise<T>, initialData: T): LoadingState<T> {
  const initialDataRef = useRef(initialData);
  const [state, setState] = useState<LoadingState<T>>({
    data: initialData,
    loading: true,
    error: null,
    reload: async () => {}
  });

  const reload = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));
    try {
      const data = await loader();
      setState({ data, loading: false, error: null, reload });
    } catch (err) {
      setState((current) => ({
        ...current,
        loading: false,
        error: err instanceof Error ? err.message : "Unable to load data.",
        reload
      }));
    }
  }, [loader]);

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const data = await loader();
        if (mounted) {
          setState({ data, loading: false, error: null, reload });
        }
      } catch (err) {
        if (mounted) {
          setState({
            data: initialDataRef.current,
            loading: false,
            error: err instanceof Error ? err.message : "Unable to load data.",
            reload
          });
        }
      }
    }

    void run();

    return () => {
      mounted = false;
    };
  }, [loader, reload]);

  return state;
}
