// App.tsx (Corrected Version - No Onboarding)

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './config/supabaseClient';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import QueryDetailPage from './pages/QueryDetailPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TeamsPage from './pages/TeamsPage';
import MainLayout from './components/MainLayout';
import { QueryProvider } from './context/QueryContext';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  // We no longer need the 'brand' state for routing
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an active session when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for authentication state changes (e.g., login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Clean up the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
     await supabase.auth.signOut();
  };

  // Show a loading indicator while checking for a session
  if (loading) {
    return <div className="h-screen flex items-center justify-center text-xl">Authenticating...</div>;
  }

  return (
    <QueryProvider>
      <HashRouter>
        <Routes>
          {/*
            This is the main routing logic.
            If a user has a session, they are in the "main app" section.
            If they do NOT have a session, any attempt to access a page
            will redirect them to the /login route.
          */}
          {!session ? (
            // If NOT logged in, only the login page is accessible.
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            // If LOGGED IN, the main app layout and routes are accessible.
            <Route 
              path="/*"
              element={
                <MainLayout brandName="All Brands" onLogout={handleLogout}>
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/query/:id" element={<QueryDetailPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/teams" element={<TeamsPage />} />
                    {/* Default route for logged-in users */}
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </MainLayout>
              }
            />
          )}
        </Routes>
      </HashRouter>
    </QueryProvider>
  );
};

export default App;