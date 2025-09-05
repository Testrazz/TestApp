import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tournament } from '@cricket-app/shared/types';
import { apiClient } from '@cricket-app/shared/apiClient';

const TournamentListPage: React.FC = () => {
  const { data: tournaments, isLoading, error } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const response = await apiClient.get<Tournament[]>('/tournaments');
      return response.data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Error loading tournaments</h3>
        <p className="text-gray-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Tournaments</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all cricket tournaments in the system.
          </p>
        </div>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tournaments?.map((tournament) => (
          <div key={tournament.id} className="card">
            <h3 className="text-lg font-medium text-gray-900">{tournament.name}</h3>
            <p className="mt-2 text-sm text-gray-600">{tournament.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                tournament.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                tournament.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {tournament.status}
              </span>
              <span className="text-sm text-gray-500">
                {tournament.teams.length} teams
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentListPage; 