// pages/BrandOnboardingPage.tsx

import React, { useState } from 'react';
import Icon from '../components/Icon';
import axios from 'axios';
import { supabase } from '../config/supabaseClient';

// Helper to create authenticated API client
const createApi = (token: string) => {
  return axios.create({
    baseURL: '/api',
    headers: { Authorization: `Bearer ${token}` }
  });
};

interface BrandOnboardingPageProps {
  onBrandConnected: (brand: any) => void;
}

const BrandOnboardingPage: React.FC<BrandOnboardingPageProps> = ({ onBrandConnected }) => {
  const [brandInput, setBrandInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandInput.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      
      const api = createApi(session.access_token);
      // Call our new backend endpoint
      const response = await api.post('/brands/connect', { brandName: brandInput.trim() });
      
      // On success, call the function passed from App.tsx
      onBrandConnected(response.data);

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to connect brand.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl text-center bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow-lg">
        {isLoading ? (
            <div className="space-y-4">
                <div className="mx-auto w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-semibold text-primary">Connecting Brand...</p>
                <p className="text-gray-500">Simulating web scraping and importing queries. This might take a moment.</p>
            </div>
        ) : (
            <>
                <Icon name="sparkles" className="mx-auto w-16 h-16 text-primary" />
                <h1 className="mt-4 text-4xl font-bold text-gray-800 dark:text-white">Connect Your Brand</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Enter a brand name to generate and view its unified inbox.
                </p>
                 <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <input
                        id="brand-input"
                        name="brand"
                        type="text"
                        required
                        value={brandInput}
                        onChange={(e) => setBrandInput(e.target.value)}
                        className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-lg"
                        placeholder="e.g., TechNova"
                    />
                  </div>
                   {error && <p className="mt-2 text-sm text-danger">{error}</p>}
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Connect & Build Inbox
                    </button>
                  </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default BrandOnboardingPage;