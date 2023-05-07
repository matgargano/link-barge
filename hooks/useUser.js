"use client";
import { getCurrentUser } from "csc-start/utils/data";
import { useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";

const useUser = (url) => {
  const initialState = {
    fullyLoaded: false,
    user: null,
    loading: false,
    error: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "fullyLoaded":
        return { ...state, fullyLoaded: action.fullyLoaded };
      case "user":
        return { ...state, user: action.user };

      case "loading":
        return { ...state, loading: action.loading };

      case "error":
        return { ...state, error: action.error };
      case "reset":
        return { ...initialState };
    }
  };

  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { fullyLoaded, user, loading, error } = state;

  useEffect(() => {
    dispatch({ type: "loading", loading: true });

    const getUser = async () => {
      dispatch({ type: "loading", error: null });
      const request = await getCurrentUser();

      dispatch({ type: "user", user: request?.data });
      dispatch({ type: "loading", loading: false });
      dispatch({ type: "error", error: request?.error?.message });
      dispatch({ type: "fullyLoaded", fullyLoaded: true });
      if (!!request?.data && !!url) {
        debugger;
        router.push(url);
      }
    };

    getUser();
  }, [error, user, router, url]);

  return {
    user,
    loading,
    fullyLoaded,
    error,
  };
};

export default useUser;
