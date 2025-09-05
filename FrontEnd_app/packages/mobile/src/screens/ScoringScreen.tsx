import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { BallEventType, WicketType } from '@cricket-app/shared/types';

const ScoringScreen: React.FC = () => {
  const [currentOver, setCurrentOver] = useState(1);
  const [currentBall, setCurrentBall] = useState(1);

  const ballEvents: BallEventType[] = [
    'dot', 'single', 'double', 'triple', 'four', 'six',
    'wide', 'no-ball', 'wicket', 'bye', 'leg-bye'
  ];

  const wicketTypes: WicketType[] = [
    'bowled', 'caught', 'lbw', 'run-out', 'stumped',
    'hit-wicket', 'obstructing-field', 'timed-out', 'retired-out'
  ];

  const handleBallEvent = (eventType: BallEventType) => {
    if (eventType === 'wicket') {
      Alert.alert(
        'Wicket Type',
        'Select wicket type',
        wicketTypes.map(type => ({
          text: type,
          onPress: () => recordBallEvent(eventType, type),
        }))
      );
    } else {
      recordBallEvent(eventType);
    }
  };

  const recordBallEvent = (eventType: BallEventType, wicketType?: WicketType) => {
    // Record the ball event
    console.log('Ball event:', { eventType, wicketType, over: currentOver, ball: currentBall });
    
    // Update ball count
    if (currentBall < 6) {
      setCurrentBall(currentBall + 1);
    } else {
      setCurrentOver(currentOver + 1);
      setCurrentBall(1);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="bg-white rounded-lg p-6 shadow-sm mb-4">
        <Text className="text-xl font-bold text-center text-gray-900 mb-4">
          Scoring Panel
        </Text>
        <Text className="text-center text-lg text-blue-600 mb-2">
          Over {currentOver}.{currentBall}
        </Text>
      </View>

      <View className="bg-white rounded-lg p-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Ball Events</Text>
        <View className="flex-row flex-wrap justify-between">
          {ballEvents.map((event) => (
            <TouchableOpacity
              key={event}
              className={`w-[30%] py-3 px-2 rounded-lg mb-3 ${
                event === 'wicket' ? 'bg-red-100' : 'bg-blue-100'
              }`}
              onPress={() => handleBallEvent(event)}
            >
              <Text className="text-center font-medium text-gray-900">
                {event.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ScoringScreen; 