import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchScreen from './CompanySearch/SearchScreen.js';
import FavoritesScreen from './FavoriteCompanies/FavoritesScreen.js';
import CompanyDetailsScreen from './FavoriteCompanies/CompanyDetailsScreen.js';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const searchStack = createStackNavigator({
  Search: {
    screen: SearchScreen
  }
});

const favoritesStack = createStackNavigator({
  Favorites: {
    screen: FavoritesScreen
  },
  Details: CompanyDetailsScreen
});

const tabNavigation = createBottomTabNavigator({
  Search: searchStack,
  Favorites: favoritesStack
});

const App = createAppContainer(tabNavigation);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
