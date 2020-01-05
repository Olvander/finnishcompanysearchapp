import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import CompanyList from './CompanyList';

export default class CompanyDataScreen extends React.Component {

  static navigationOptions = ({navigationOptions}) => {
    return {
      title: 'Company List',
      headerTitleStyle: {flex: 1, textAlign: 'center',
      alignItems: 'center'},
      headerRight: <View style={{flex: 1}}></View>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      companyData: props.navigation.getParam('companyData')
    }
  }

  render() {
    return (
      <CompanyList companyData={this.state.companyData}
                   navigation={this.props.navigation} />
    )
  }
}
