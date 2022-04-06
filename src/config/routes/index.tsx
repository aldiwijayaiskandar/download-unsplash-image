import React from 'react';
import {Pressable, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {color} from '@common';
import {NavigationParams} from '@models';
import {navigationRef} from '@utils';

import DownloadScreen from '@screens/DownloadScreen';
import HomeScreen from '@screens/HomeScreen';

const Stack = createNativeStackNavigator<NavigationParams>();

export const RootNavigationContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'Images',
            headerTitleStyle: {
              fontSize: 16,
            },
            headerRight: () => (
              <Pressable
                onPress={() => navigationRef.navigate('Download')}
                style={{
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: color.text, fontSize: 12}}>
                  To Download Page
                </Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="Download"
          component={DownloadScreen}
          options={{
            headerTitle: 'Downloads',
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
