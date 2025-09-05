import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Match, BallEvent } from '@cricket-app/shared/types';
import { apiClient } from '@cricket-app/shared/apiClient';
import { io, Socket } from 'socket.io-client';

const MatchPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [liveEvents, setLiveEvents] = useState<BallEvent[]>([]);

  const { data: match, isLoading } = useQuery({
    queryKey: ['match', matchId],
    queryFn: async () => {
      const response = await apiClient.get<Match>(`/matches/${matchId}`);
      return response.data;
    },
    enabled: !!matchId,
  });

  useEffect(() => {
    if (matchId) {
      const newSocket = io('http://localhost:3001', {
        query: { matchId },
      });

      newSocket.on('ball_event', (event: BallEvent) => {
        setLiveEvents(prev => [...prev, event]);
      });

      newSocket.on('match_update', (updatedMatch: Match) => {
        // Handle match updates
        console.log('Match updated:', updatedMatch);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [matchId]);

  if (isLoading || !match) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {match.team1} vs {match.team2}
          </h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            match.status === 'live' ? 'bg-red-100 text-red-800' :
            match.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {match.status}
          </span>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">{match.team1}</h3>
            <p className="text-3xl font-bold text-primary-600">
              {match.team1Score}/{match.team1Wickets}
            </p>
            <p className="text-sm text-gray-500">{match.team1Overs} overs</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">{match.team2}</h3>
            <p className="text-3xl font-bold text-primary-600">
              {match.team2Score}/{match.team2Wickets}
            </p>
            <p className="text-sm text-gray-500">{match.team2Overs} overs</p>
          </div>
        </div>

        {/* Live Commentary */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Live Commentary</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {liveEvents.map((event, index) => (
              <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                <span className="font-medium">
                  {event.over}.{event.ball}:
                </span>{' '}
                {event.commentary || `${event.runs} runs`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage; 