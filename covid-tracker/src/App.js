import React, {useState, useEffect} from "react";
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core"
import './App.css';
import InfoBox from "./InfoBox"
import Map from "./Map"
import Table from "./Table"
import {sortData} from './util'
import LineGraph from './LineGraph'

function App() {

const [countries, setCountries] = useState([]);
const [country, setCountry]= useState("worldwide");
const [countryInfo, setCountryInfo]= useState({});
const [tableData, setTableData]= useState([]);

useEffect(()=>{
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response=>response.json())
  .then(data =>{
    setCountryInfo(data);
  })
},[])

 useEffect(()=>{
//code insde run once whent the component App() loads
  //async -> send a request, wait for it, do something with it
  const getCountriesData= async ()=>{
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response)=> response.json())
    .then((data)=>{
      //returning the object with name and value
      const countries = data.map((country)=>(
    {
      name: country.country, //United Kingdom, United States
      value: country.countryInfo.iso2 //UK,USA, FR
    }
  ));
  const sortedData = sortData(data);
  setTableData(sortedData)
  setCountries(countries);
});
};
getCountriesData();
},[]);//or when the varibale changes

const onCountryChange = async (event) =>{
  const countryCode= event.target.value;
  setCountry(countryCode);
  //make a call to get specific coutry data https://disease.sh/v3/covid-19/countries/[country_code]
  //make a call to get all countries https://disease.sh/v3/covid-19/all
  const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then((response)=> response.json())
    .then((data)=>{
      setCountryInfo(data);
        console.log(countryInfo)
    });

};
  return (
    <div className="app">
    <div className="app__left">
    <div className="app__header">
    <h1>COVID-19 TRACKER</h1>
    <FormControl className="app__dropdown">
    <Select variant="outlined" onChange={onCountryChange} value={country} >
      <MenuItem value="worldwide">Worldwide</MenuItem>
    {/*loop througth all teh countries and show the dropdown of the options*/}
      {
        countries.map(country =>(
        <MenuItem value={country.value}>{country.name}</MenuItem>
      ))
    }
    </Select>
    </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
        <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
        <InfoBox title="Death" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
      {/*InfoBox cases*/}
      {/*InfoBox recovery*/}
      {/*InfoBox death*/}
      </div>


      <Map/>
      {/*Map*/}
  </div>
  <Card className="app__right">
  <CardContent>
  <h3>Live Cases by Country</h3>
  {/*Table*/}
  <Table countries={tableData}/>
  <h3>Worldwide new cases</h3>
  {/*Graph*/}
  <LineGraph />
  </CardContent>


  </Card>
    </div>
  );
}

export default App;
