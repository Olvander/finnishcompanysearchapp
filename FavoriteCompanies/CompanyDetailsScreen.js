import React from 'react';
import {StyleSheet, Text, View, AsyncStorage, FlatList, TouchableHighlight} from 'react-native';

export default class CompanyDetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);

    this.state = {
      companyDetails: props.navigation.getParam('companyDetails').companyDetails,
      navigation: props.navigation
    };
  }

  static navigationOptions = ({navigationOptions, navigation}) => {
    return {
      title: navigation.getParam('companyDetails').companyDetails.nimi,
      headerTitleStyle: {flex: 1, textAlign: 'center',
      alignItems: 'center'},
      headerRight: <View style={{flex: 1}}></View>
    }
  }

  componentWillMount() {

  }

  removeFromFavorites(companyName) {
    AsyncStorage.removeItem(companyName, (error) =>{
      this.state.navigation.navigate('Favorites', {'successProp': 'Success'});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.state.companyDetails.nimi}
        </Text>
        
        <View style={styles.adjacentTexts}>

          <Text style={styles.leftText}>
            Perustamisvuosi: 
          </Text>
          
          <Text style={styles.rightText}>
            {this.state.companyDetails.perustamisvuosi}
          </Text>
          
        </View>

        <View style={styles.adjacentTexts}>

          <Text style={styles.leftText}>
            Toimiala: 
          </Text>
          
          <Text style={styles.rightText}>
            {this.state.companyDetails.toimiala}
          </Text>
          
        </View>

        <View style={styles.adjacentTexts}>
          <Text style={styles.leftText}>
            Toimipaikka: 
          </Text>

          <Text style={styles.rightText}>
            {this.state.companyDetails.toimipaikka}
          </Text>
        </View>

        <View style={styles.adjacentTexts}>
        
          <View style={styles.leftText}></View> 
          <View style={styles.rightText}> 
            <TouchableHighlight
              style={styles.removeFromFavoritesButton}
              underlayColor="#e18105"
              activeOpacity={1}
              onPress={() => this.removeFromFavorites(this.state.companyDetails.nimi) }>
              <Text style={styles.removeFromFavoritesText}>
                Poista suosikeista
              </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.separatorLine}></View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',

    flexDirection: 'column',
    paddingTop: 14,
    marginHorizontal: 7,
    flexDirection: 'column'
  },
  title: {
    backgroundColor: '#fff',
    textAlign: 'left',
    paddingHorizontal: 4,
    marginRight: 'auto',
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  adjacentTexts: {
    flexDirection: 'row',
  },
  leftText: {
    flex: 4,
    paddingLeft: 4,
    color: '#000',
    fontSize: 14
  },
  rightText: {
    flex: 8,
    color: '#000',
    fontSize: 14
  },
  removeFromFavoritesButton: {
    backgroundColor: '#fe9916',
    borderRadius: 7,
    paddingHorizontal: 12,
    marginLeft: 'auto',
    alignItems: 'flex-end'
  },
  removeFromFavoritesText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  separatorLine: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 1.5,
    width: '100%',
    marginTop: 5
  }
});