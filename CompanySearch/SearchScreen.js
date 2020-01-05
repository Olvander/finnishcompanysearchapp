import React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import SearchAPI from '../API/SearchAPI.js';
import SearchButton from './SearchButton.js';
import CompanyList from './CompanyList';

export default class SearchScreen extends React.Component {

  static navigationOptions = ({navigationOptions}) => {
    return {
      title: 'Yrityshaku',
      headerTitleStyle: {flex: 1, textAlign: 'center',
      alignItems: 'center'}
    }
  }

  constructor(props) {
    super(props);
    this.setCompanyData = this.setCompanyData.bind(this);
    this.receiveSearchButtonPressedState = this.receiveSearchButtonPressedState.bind(this);

    this.onMaxResultsChanged = this.onMaxResultsChanged.bind(this);
    this.onSearchCompanyByNameChange = this.onSearchCompanyByNameChange.bind(this);
    this.onSearchCompanyByBusinessLineChange = this.onSearchCompanyByBusinessLineChange.bind(this);
    this.onSearchCompanyByOfficeLocationChange = this.onSearchCompanyByOfficeLocationChange.bind(this);
    this.onYearFoundedChanged = this.onYearFoundedChanged.bind(this);

    this.state = {
      data: [],
      companyData: [],
      search: false,
      navigation: props.navigation,
      companyName: '',
      officeLocation: '',
      businessLine: '',
      yearFounded: '',
      maxResults: ''
    }
  }

  setCompanyData(data) {
    let search = false;
    this.setState({
      companyData: data,
      search: search,
    });

    this.state.navigation.navigate('CompanyData', {companyData: data});
  }

  componentDidMount() {
    this.setState({
      data: {url: 'https://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=20&resultsFrom=0&companyRegistrationFrom=2014-02-28&companyRegistrationTo=2014-05-28'}
    });
  }

  receiveSearchButtonPressedState(b) {

    let maxResults = this.state.maxResults !== '' ?
                     '&maxResults=' + this.state.maxResults :
                     '&maxResults=10';

    let companyName = this.state.companyName !== '' ? '&name=' +
                      this.state.companyName :
                      '';

    let officeLocation = this.state.officeLocation !== '' ?
                         '&registeredOffice=' +
                         this.state.officeLocation :
                         '';

    let businessLine = this.state.businessLine !== '' ?
                       '&businessLine=' +
                       this.state.businessLine :
                       '';

    let yearFounded = this.state.yearFounded !== '' ?
                      '&companyRegistrationFrom=' +
                      this.state.yearFounded + '-01-01' :
                      '&companyRegistrationFrom=2019-01-01';

    let url = `https://avoindata.prh.fi/bis/v1?totalResults=false${maxResults}&resultsFrom=0${companyName}${officeLocation}${businessLine}${yearFounded}`

    if (b) {
      this.setState({
        data: {
          url: url
        },
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

  onMaxResultsChanged(text) {
    let maxResults = '';

    if (text != '') {
      maxResults = text.split('.').join('');
    }

    this.setState({
      maxResults: maxResults
    });
  }

  onSearchCompanyByNameChange(text) {

    let companyName = '';

    if (text != '') {
      companyName = text;
    }

    this.setState({
      companyName: companyName
    });
  }

  onSearchCompanyByBusinessLineChange(text) {

    let businessLine = '';

    if (text != '') {
      businessLine = text;
    }

    this.setState({
      businessLine: businessLine
    });
  }

  onSearchCompanyByOfficeLocationChange(text) {

    let officeLocation = '';

    if (text != '') {
      officeLocation = text;
    }

    this.setState({
      officeLocation: officeLocation
    });
  }

  onYearFoundedChanged(text) {

    let yearFounded = '';

    if (text != '') {
      yearFounded = text.split('.').join('');
    }

    this.setState({
      yearFounded: yearFounded
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchAPI sendPermissionOK={(ok) => this.receivePermissionOK(ok)}
                  returnCompanyData={(data) => this.setCompanyData(data)}
                              data={this.state.data} search={this.state.search}
        />
        
        
        <TextInput style={styles.textInput}
                   placeholder='Tulosten enimmäismäärä'
                   keyboardType='numeric'
                   onChangeText={(text) => this.onMaxResultsChanged(text)}
                   value={this.state.maxResults}
                   maxLength={3}
        />

        <TextInput style={styles.textInput}
                   placeholder='Hae yrityksen nimellä'
                   onChangeText={(text) => this.onSearchCompanyByNameChange(text)}
                   value={this.state.companyName}
        />

        <TextInput style={styles.textInput}
                   placeholder='Hae toimialan mukaan'
                   onChangeText={(text) => this.onSearchCompanyByBusinessLineChange(text)}
                   value={this.state.businessLine}
        />

        <TextInput style={styles.textInput}
                   placeholder='Hae sijainnin mukaan'
                   onChangeText={(text) => this.onSearchCompanyByOfficeLocationChange(text)}
                   value={this.state.officeLocation}
        />

        <TextInput style={styles.textInput}
                   placeholder='Hae perustamisvuoden mukaan'
                   keyboardType='numeric'
                   onChangeText={(text) => this.onYearFoundedChanged(text)}
                   value={this.state.yearFounded}
                   maxLength={4}
        />
        
        <SearchButton sendButtonPressedState={(b) => this.receiveSearchButtonPressedState(b)}
              permissionToEnableSearchButton={this.state.permissionOK}
        />

        <CompanyList companyData={this.state.companyData}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  textInput: {
    marginTop: 25,
    marginHorizontal: '5%',
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    width: '90%'
  }
});