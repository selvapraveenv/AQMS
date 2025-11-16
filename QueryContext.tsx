// context/QueryContext.tsx (Full-Featured API Version)

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Query } from '../types';
import { supabase } from '../config/supabaseClient';

const createApi = (token: string) => {
  return axios.create({
    baseURL: '/api',
    headers: { Authorization: `Bearer ${token}` }
  });
};

interface QueryContextType {
  queries: Query[];
  loading: boolean;
  error: string | null;
  fetchQueries: () => void;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const QueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQueries = useCallback(async () => {
    if(!loading) setLoading(true); 
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const api = createApi(session.access_token);
      const response = await api.get('/queries');
      setQueries(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (err: any) {
      console.error("Failed to fetch queries:", err);
      setError("Could not load query data.");
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        if(session) fetchQueries();
      } else if (event === "SIGNED_OUT") {
        setQueries([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchQueries]);

  const contextValue = { queries, loading, error, fetchQueries };

  return (
    <QueryContext.Provider value={contextValue}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueries = (): QueryContextType => {
  const context = useContext(QueryContext);
  if (!context) throw new Error('useQueries must be used within a QueryProvider');
  return context;
};