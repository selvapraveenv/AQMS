// pages/LoginPage.tsx

import React, { useState } from 'react';
import Icon from '../components/Icon';
import { supabase } from '../config/supabaseClient'; // We are adding this import

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // After login, Google -> Supabase -> Your App's root
        redirectTo: window.location.origin, 
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
        <div className="mb-6 p-4 bg-primary/10 rounded-full inline-block">
             <Icon name="sparkles" className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          Sign in to manage your Audience Queries.
        </p>
        
        {error && <p className="mb-4 text-sm text-danger">{error}</p>}

        <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
            {loading ? (
               <span>Connecting...</span>
            ) : (
               <>
                 <Icon name="google-logo" className="w-5 h-5 mr-3" />
                 Sign in with Google
               </>
            )}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;