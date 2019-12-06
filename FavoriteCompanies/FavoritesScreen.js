import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class FavoritesScreen extends React.Component {

  static navigationOptions = ({navigationOptions}) => {
    return {
      title: 'Favorites',
      headerTitleStyle: {flex: 1, textAlign: 'center',
      alignItems: 'center'}
    }
  }


  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});