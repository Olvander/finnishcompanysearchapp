import React from 'react';

export default class SearchAPI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sendPermissionOK: props.sendPermissionOK
    }
    this.finishSearch = this.finishSearch.bind(this);
  }

  async componentWillReceiveProps(props) {
    if (props.search && props.data.length !== 0) {
      const companyData = await this.fetchCompanyDataFromUrl(props.data.url);
      this.finishSearch(props, companyData);
    }
  }

  async finishSearch(props, companyData) {
    props.returnCompanyData(companyData);
    this.state.sendPermissionOK(true);
  }

  async getRelevantCompanyDataFrom(basicCompanyData) {

    const relevantCompanyData = [];

    for (let result of basicCompanyData.results) {
      
      if (result.name != null) {
        const companyDetails = await this.fetchCompanyDetails(result);

        relevantCompanyData.push({
          companyDetails,
          key: companyDetails.nimi 
        });
      }
    }

    return relevantCompanyData;
  }

  async fetchCompanyDetails(result) {
    
    const details = await fetch(result.detailsUri).then((details) => details.json());

    let businessLine = "N/A";
    let yearFounded = result.registrationDate.substr(0, 4);
    let companyName = result.name;
    let location = "N/A";
    
    if (details.results[0].registedOffices.length > 0) {
      location = details.results[0].registedOffices[0].name;
    }
    location = location.substr(0, 1) + location.substr(1, location.length - 1).toLowerCase();

    if (details.results[0].businessLines.length > 0) {
      businessLine = details.results[0].businessLines[1].name;
    }

    const companyDetails = {
      'nimi': companyName,
      'perustamisvuosi': yearFounded,
      'toimiala': businessLine,
      'toimipaikka': location,
    }

    return companyDetails;
  }

  async fetchCompanyDataFromUrl(url) {
    let relevantCompanyData = [];
    const basicCompanyData = await fetch(url).then((resp) => resp.json());
    relevantCompanyData = await this.getRelevantCompanyDataFrom(basicCompanyData);
    return relevantCompanyData;
  }

  render() {
    return(
      null
    )
  }
}