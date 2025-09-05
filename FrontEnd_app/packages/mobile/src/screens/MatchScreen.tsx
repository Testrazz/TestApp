import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Match } from '@cricket-app/shared/types';
import { apiClient } from '@cricket-app/shared/apiClient';

const MatchScreen: React.FC = () => {
  const route = useRoute();
  const { matchId } = route.params as { matchId: string };

  const { data: match, isLoading } = useQuery({
    queryKey: ['match', matchId],
    queryFn: async () => {
      const response = await apiClient.get<Match>(`/matches/${matchId}`);
      return response.data;
    },
    enabled: !!matchId,
  });

  if (isLoading || !match) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="bg-white rounded-lg p-6 shadow-sm">
        <Text className="text-xl font-bold text-center text-gray-900 mb-4">
          {match.team1} vs {match.team2}
        </Text>

        <View className="flex-row justify-between mb-6">
          <View className="flex-1 items-center">
            <Text className="text-lg font-semibold text-gray-900">{match.team1}</Text>
            <Text className="text-3xl font-bold text-blue-600">
              {match.team1Score}/{match.team1Wickets}
            </Text>
            <Text className="text-sm text-gray-500">{match.team1Overs} overs</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-lg font-semibold text-gray-900">{match.team2}</Text>
            <Text className="text-3xl font-bold text-blue-600">
              {match.team2Score}/{match.team2Wickets}
            </Text>
            <Text className="text-sm text-gray-500">{match.team2Overs} overs</Text>
          </View>
        </View>

        <View className="border-t pt-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">Match Status</Text>
          <Text className={`px-3 py-1 rounded-full text-sm self-start ${
            match.status === 'live' ? 'bg-red-100 text-red-800' :
            match.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {match.status}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MatchScreen; 