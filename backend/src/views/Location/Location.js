import _ from "lodash";
import React,{useState} from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { Input, Container, Row, Col, Label } from "reactstrap";
import { CONSTANTS } from '../../constants';



const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiwgN3B2_UsMIBGrWJZ1J_0uvzMKSXGjo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {


  const [apiData=[],setapiData, lat, lng]=useState();

  fetch(CONSTANTS.url + CONSTANTS.employes)
  .then(response => response.json())
  .then(data => { 
    setapiData(data) 
  });

  const setLocation = (e) => {

    fetch(CONSTANTS.url + CONSTANTS.location + '/' + e.target.value).then(response => response.json()).then(location => { 
      if(location) {
        lng = location.Lng;
        lat = location.Lat;
      }
    });
    // const location = this.apiData.find((el) => el.Id === e);

  }

  const getEmployee = () => {

  }


  return (
    <Container> 
      <Row>
        <Col>
          <Label htmlFor="ccmonth"><b>Choose an Employee</b></Label>
          <Input type="select" onChange={ (e) => setLocation(e) }>
              <option></option>
              {apiData.map((el,idx) => <option key={idx} value={el.Id}>{el.FirstName+' '+ el.LastName}</option>)} 
          </Input>
        </Col>
      </Row>
      <Row>
        <Col>
          <GoogleMap defaultZoom={8} defaultCenter={{ lat: 43.76586 , lng:-79.555658 }}>
            <Marker position={{ lat, lng }} />
          </GoogleMap>
        </Col>
      </Row>
    </Container>

)}
);


const enhance = _.identity;

const ReactGoogleMaps = () => [

  <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);