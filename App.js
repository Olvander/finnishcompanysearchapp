import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchScreen from './CompanySearch/SearchScreen.js';
import CompanyDataScreen from './CompanySearch/CompanyDataScreen';
import FavoritesScreen from './FavoriteCompanies/FavoritesScreen.js';
import CompanyDetailsScreen from './FavoriteCompanies/CompanyDetailsScreen.js';
import CreditsScreen from './Credits/CreditsScreen.js';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const searchStack = createStackNavigator({
  Search: {
    screen: SearchScreen
  },
  CompanyData: {
    screen: CompanyDataScreen
  }
});

const favoritesStack = createStackNavigator({
  Favorites: {
    screen: FavoritesScreen
  },
  Details: {
    screen: CompanyDetailsScreen
  }
});

const creditsStack = createStackNavigator({
  Credits: {
    screen: CreditsScreen
  }
});

const tabNavigation = createBottomTabNavigator({
  Yrityshaku: searchStack,
  Suosikit: favoritesStack,
  Credits: creditsStack
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
