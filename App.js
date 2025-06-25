import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "./screens/Map";
import Favorites from "./screens/Favorites";
import PropertyList from "./screens/Properties/PropertyList";
import PropertyDetail from "./screens/Properties/PropertyDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SinglePropertyContextProvider from "./store/context/single-property-context";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function PropertyOverview() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PropertyList" component={PropertyList} />
        <Stack.Screen
          name="PropertyDetail"
          component={PropertyDetail}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <SinglePropertyContextProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="List" component={PropertyOverview} />
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>
      </NavigationContainer>
    </SinglePropertyContextProvider>
  );
}
