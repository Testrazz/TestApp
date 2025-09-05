import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Tournament } from '@cricket-app/shared/types';
import { apiClient } from '@cricket-app/shared/apiClient';

const TournamentListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { data: tournaments, isLoading, refetch } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const response = await apiClient.get<Tournament[]>('/tournaments');
      return response.data || [];
    },
  });

  const renderTournament = ({ item }: { item: Tournament }) => (
    <TouchableOpacity
      className="bg-white p-4 rounded-lg mb-4 shadow-sm"
      onPress={() => navigation.navigate('Match' as never, { matchId: item.id } as never)}
    >
      <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
      <Text className="text-sm text-gray-600 mt-1">{item.description}</Text>
      <View className="flex-row justify-between items-center mt-3">
        <Text className={`px-2 py-1 rounded-full text-xs ${
          item.status === 'ongoing' ? 'bg-green-100 text-green-800' :
          item.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </Text>
        <Text className="text-sm text-gray-500">{item.teams.length} teams</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <FlatList
        data={tournaments}
        renderItem={renderTournament}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">No tournaments found</Text>
          </View>
        }
      />
    </View>
  );
};

export default TournamentListScreen; 