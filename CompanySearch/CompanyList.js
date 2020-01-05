import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableHighlight, AsyncStorage} from 'react-native';

export default class CompanyList extends React.Component {

  constructor(props) {
    super(props);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.state = {
      companyData: this.props.companyData,
      navigation: props.navigation
    }
  }

  addToFavorites(company) {
    
    let favoriteCompanyExists = false;

    AsyncStorage.getItem(company.key, (error, result) => {
      if (result != undefined) {
        favoriteCompanyExists = true;
      }
      if (!favoriteCompanyExists) {
        AsyncStorage.setItem(company.key, JSON.stringify(company), (error) => {
          this.state.navigation.navigate('Favorites', {'success': 'update view'})
        });
      }
    });
  }

  render() {
    return(
    <View style={styles.container}>
      <FlatList
        data={this.state.companyData}
        renderItem={({item}) => {
          return(
            <View style={{
              height: 'auto',
              paddingTop: 14,
              marginHorizontal: 7
            }}>
              <Text style={styles.title}>
                {item.companyDetails.nimi}
              </Text>

              <View style={styles.adjacentTexts}>

                <Text style={styles.leftText}>
                  Perustamisvuosi: 
                </Text>
                
                <Text style={styles.rightText}>
                  {item.companyDetails.perustamisvuosi}
                </Text>
                
              </View>

              <View style={styles.adjacentTexts}>

                <Text style={styles.leftText}>
                  Toimiala: 
                </Text>
                
                <Text style={styles.rightText}>
                  {item.companyDetails.toimiala}
                </Text>
                
              </View>

              <View style={styles.adjacentTexts}>

                <Text style={styles.leftText}>
                  Toimipaikka: 
                </Text>

                <Text style={styles.rightText}>
                {item.companyDetails.toimipaikka}
                </Text>

              </View>

                <TouchableHighlight
                  style={styles.addToFavoritesButton}
                  underlayColor="#e18105"
                  activeOpacity={1}
                  onPress={() => this.addToFavorites(item) }>
                  <Text style={styles.addToFavoritesText}>
                    Lisää suosikkeihin
                  </Text>
                </TouchableHighlight>

              <View style={styles.separatorLine}/>

            </View>
          )
        }}
        removeClippedSubviews={false}
      />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    flex: 1
  },
  title: {
    backgroundColor: '#fff',
    textAlign: 'left',
    paddingHorizontal: 4,
    marginRight: 'auto',
    flexShrink: 1,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  adjacentTexts: {
    flexDirection: 'row',
    flex: 1
  },
  leftText: {
    flex: 4,
    paddingLeft: 4
  },
  rightText: {
    flex: 8
  },
  addToFavoritesButton: {
    backgroundColor: '#fe9916',
    borderRadius: 7,
    paddingHorizontal: 12,
    marginLeft: 'auto',
    alignItems: 'flex-end'
  },
  addToFavoritesText: {
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