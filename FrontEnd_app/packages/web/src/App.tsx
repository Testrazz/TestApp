import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import TournamentListPage from './pages/TournamentListPage';
import MatchPage from './pages/MatchPage';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/tournaments" replace /> : <LoginPage />
        } />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/tournaments" replace />} />
          <Route path="tournaments" element={<TournamentListPage />} />
          <Route path="match/:matchId" element={<MatchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App; 