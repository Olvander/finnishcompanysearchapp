import React from 'react';
import {StyleSheet, Text, View, FlatList, AsyncStorage, TouchableHighlight} from 'react-native';

export default class FavoritesScreen extends React.Component {

  static navigationOptions = ({navigationOptions}) => {
    return {
      title: 'Suosikit',
      headerTitleStyle: {flex: 1, textAlign: 'center',
      alignItems: 'center'}
    }
  }

  constructor(props) {
    super(props);
    this.showCompanyDetails = this.showCompanyDetails.bind(this);
    this.clearAllFavorites = this.clearAllFavorites.bind(this);

    this.state = {
      navigation: props.navigation
    }

    this.getAllFavoriteCompanies();

  }

  getAllFavoriteCompanies() {
    let favoriteCompaniesArray = [];
    
    AsyncStorage.getAllKeys((error, favoriteCompanies) => {

      favoriteCompanies.forEach((key, index) => {

        AsyncStorage.getItem(key, (err, item) => {
          favoriteCompaniesArray.push(JSON.parse(item));

          if (index >= favoriteCompanies.length - 1) {
            this.setState({favoriteCompanies: favoriteCompaniesArray});
          }

        });
      });
    });
  }

  showCompanyDetails(company) {
    this.state.navigation.navigate('Details', {companyDetails: company});
  }

  clearAllFavorites() {
    AsyncStorage.clear((error) => {
      
      let favoriteCompaniesArray = [];
    
      AsyncStorage.getAllKeys((error, favoriteCompanies) => {
  
        favoriteCompanies.forEach((key, index) => {
  
          AsyncStorage.getItem(key, (err, item) => {
            favoriteCompaniesArray.push(JSON.parse(item));
  
            if (index >= favoriteCompanies.length - 1) {
              this.setState({favoriteCompanies: favoriteCompaniesArray});
            }
  
          });
        });
        
        if (favoriteCompanies.length === 0) {
          this.setState({favoriteCompanies: null});
        }
      });

    });
  }


  componentWillReceiveProps(props) {
    
    let favoriteCompaniesArray = [];
    
    AsyncStorage.getAllKeys((error, favoriteCompanies) => {

      favoriteCompanies.forEach((key, index) => {

        AsyncStorage.getItem(key, (err, item) => {
          favoriteCompaniesArray.push(JSON.parse(item));

          if (index >= favoriteCompanies.length - 1) {
            this.setState({favoriteCompanies: favoriteCompaniesArray});
          }

        });
      });
      
      if (favoriteCompanies.length === 0) {
        this.setState({favoriteCompanies: null});
      }
    });

  }

  componentWillMount() {

    let favoriteCompaniesArray = [];
    
    AsyncStorage.getAllKeys((error, favoriteCompanies) => {

      favoriteCompanies.forEach((key, index) => {

        AsyncStorage.getItem(key, (err, item) => {
          favoriteCompaniesArray.push(JSON.parse(item));

          if (index >= favoriteCompanies.length - 1) {
            this.setState({favoriteCompanies: favoriteCompaniesArray});
          }

        });
      });
    });

  }


  render() {

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() =>
            
            <View>

              <TouchableHighlight
                style={styles.clearAllButton}
                underlayColor="#e18105"
                activeOpacity={1}
                onPress={() => this.clearAllFavorites() }
              >
                <Text style={styles.rightText}>
                  Poista kaikki suosikit
                </Text>
              </TouchableHighlight>

              <View style={styles.separatorLine}/>

            </View>
          }

          data={this.state.favoriteCompanies}
          renderItem={({item}) => {
            return(
              <View style={{
                height: 'auto',
                paddingTop: 14,
                marginHorizontal: 7
              }}>

                <View style={styles.leftText}>
                  <TouchableHighlight
                    style={styles.toCompanyDetailsButton}
                    underlayColor="#e18105"
                    activeOpacity={1}
                    onPress={() => this.showCompanyDetails(item) }
                  >
                    <Text style={styles.title}>
                      {item.companyDetails.nimi}
                    </Text>
                  </TouchableHighlight>
                </View>

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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff'
  },
  leftText: {
    paddingLeft: 4
  },
  rightText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  toCompanyDetailsButton: {
    backgroundColor: '#fe9916',
    flexShrink: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 'auto',
    alignItems: 'flex-start',
    marginBottom: 4
  },
  clearAllButton: {
    backgroundColor: '#fe9916',
    flexShrink: 1,
    borderRadius: 10,
    paddingHorizontal: 7,
    marginLeft: 'auto',
    marginRight: 7,
    marginTop: 14,
    paddingVertical: 8,
    alignItems: 'flex-end',
    marginBottom: 18
  },
  separatorLine: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 1.5,
    width: '100%',
    marginTop: 5
  }
});