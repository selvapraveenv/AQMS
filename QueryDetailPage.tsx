// pages/QueryDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Query } from '../types';
import Icon from '../components/Icon';
import axios from 'axios';
import { supabase } from '../config/supabaseClient';

const createApi = (token: string) => { /* ... same helper function ... */ };

const QueryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState<Query | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuery = async () => {
      if (!id) return;
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const api = createApi(session.access_token);
        // Call the new backend endpoint for a single query
        const response = await api.get(`/queries/${id}`);
        setQuery(response.data);
      } catch (error) {
        console.error("Failed to fetch query details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuery();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading query details...</div>;
  if (!query) return <div className="p-8 text-center">Query not found.</div>;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-primary hover:underline">
        <Icon name="arrow-left" className="w-4 h-4 mr-2" />
        Back
      </button>

      {/* Query Details Card */}
      <div className="bg-white dark:bg-dark p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">From: {query.sender}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">via {query.channel} • Status: {query.status}</p>
        <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{query.msg}</p>
      </div>

      {/* History Timeline */}
      <div className="bg-white dark:bg-dark p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">History</h3>
        {/* Supabase returns history as 'history_entries' */}
        {query.history_entries && query.history_entries.length > 0 ? (
          query.history_entries.map((entry: any) => (
            <div key={entry.id} className="border-l-2 pl-4 mb-4">
              <p className="font-semibold text-gray-800 dark:text-white">{entry.action}</p>
              <time className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</time>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No history available for this query.</p>
        )}
      </div>
    </div>
  );
};

export default QueryDetailPage;