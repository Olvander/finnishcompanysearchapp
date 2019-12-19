import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchAPI from '../API/SearchAPI.js';
import SearchButton from './SearchButton.js';

export default class SearchScreen extends React.Component {

  static navigationOptions = ({navigationOptions}) => {
    return {
      title: 'Search',
      headerTitleStyle: {flex: 1, textAlign: 'center',
      alignItems: 'center'}
    }
  }

  constructor(props) {
    super(props);
    this.setCompanyData = this.setCompanyData.bind(this);
    this.receiveSearchButtonPressedState = this.receiveSearchButtonPressedState.bind(this);
    this.state = {
      data: [],
      companyData: [],
      search: false
    }
  }

  setCompanyData(data) {
    let search = false;
    this.setState({
      companyData: data,
      search: search,
    });

    data.forEach((company) => console.log(company));
  }

  componentDidMount() {
    this.setState({
      data: {url: 'https://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=20&resultsFrom=0&companyRegistrationFrom=2014-02-28&companyRegistrationTo=2014-05-28'}
    });
  }

  receiveSearchButtonPressedState(b) {
    if (b) {
      this.setState({
        search: true
      });
    } else {
      this.setState({
        search: false
      });
    }
  }

  receivePermissionOK(ok) {
    if (ok) {
      this.setState({
        permissionOK: true
      });
    } else {
      this.setState({
        permissionOK: false
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchAPI sendPermissionOK={(ok) => this.receivePermissionOK(ok)}
                  returnCompanyData={(data) => this.setCompanyData(data)}
                               data={this.state.data} search={this.state.search}
        />
        <SearchButton sendButtonPressedState={(b) => this.receiveSearchButtonPressedState(b)}
              permissionToEnableSearchButton={this.state.permissionOK}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
});