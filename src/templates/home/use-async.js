import { useCallback, useEffect, useState } from 'react';

export const useAsync = (asyncFunction, shouldRun) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    status: 'iddle',
  });

  const run = useCallback(async () => {
    // await new Promise((r) => setTimeout(r, 2000)); apenas pra mostrar os outros status
    setState({
      result: null,
      error: null,
      status: 'pending',
    });

    // await new Promise((r) => setTimeout(r, 2000)); apenas pra mostrar os outros status

    return asyncFunction()
      .then((response) => {
        setState({
          result: response,
          error: null,
          status: 'settled',
        });
      })
      .catch((error) => {
        setState({
          result: null,
          error: error,
          status: 'error',
        });
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (shouldRun) {
      run();
    }
  }, [run, shouldRun]);

  return [run, state.result, state.error, state.status];
};
