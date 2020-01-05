import React from 'react';
import {StyleSheet, Text, View, AsyncStorage, FlatList, TouchableHighlight} from 'react-native';
import Hyperlink from 'react-native-hyperlink';

export default class CreditsScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigationOptions, navigation}) => {
    return {
      title: 'Credits',
      headerTitleStyle: {flex: 1, textAlign: 'center',
      alignItems: 'center'},
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Hyperlink linkDefault={true}
                    linkStyle={styles.link}>
          <Text style={styles.centerText}>
            This app utilizes the open data of the Finnish Patent and Registration Office (PRH).
            The original open data website is available at https://avoindata.prh.fi/index_en.html
          </Text>
          
          <Text style={styles.centerText}>
            The copyright notice and the disclaimer of PRH can be found at:
          </Text>
          <Text style={[
            styles.centerText,
            {marginTop: 0}]}>
            https://www.prh.fi/en/presentation_and_duties/tietoasivustosta.html
          </Text>

          <Text style={styles.centerText}>
            The Creative Commons Attribution 4.0 license and the Public Administration Recommendations
            (JHS recommendations) are applied to the material.
          </Text>

          <Text style={styles.centerText}>
            The Creative Commons Attribution 4.0 (CC BY 4.0) licence can be viewed at
            https://creativecommons.org/licenses/by/4.0/
          </Text>

          <Text style={styles.centerText}>
            This app is not an official app of the Finnish Patent and Registration Office.
            It merely utilizes its database as permitted by the CC license.
          </Text>
        </Hyperlink>

        <View style={styles.separatorLine}></View>

      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingTop: 14,
    marginHorizontal: 7,
    flexDirection: 'column'
  },
  centerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000',
    fontSize: 14
  },
  link: {
    color: '#00ccff',
  },
  separatorLine: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 1.5,
    width: '100%',
    marginTop: 20
  }
});