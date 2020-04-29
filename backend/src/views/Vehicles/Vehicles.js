import React, { Component  } from 'react';
import { Button, Card, ButtonGroup, CardHeader, CardBody, Col, Input, Row, FormGroup, Label, Form } from 'reactstrap';
import { post, put } from '../../services/api.service';
import { CONSTANTS } from '../../constants';
import DataTable from 'react-data-table-component';
import { deleteRequest } from '../../services/api.service';



class Vechicle extends Component {

  columns = [
      {
        selector: "Name",
        name: "Vechicle",
        sortable: true,
      },
      {
        selector: "Type",
        name: "Type",
        sortable: true,
      },
      {
        selector: "Targa",
        name: "License Plate",
        sortable: true,
      },
      {
        selector: "VehicleCode",
        name: "Vehicle Code",
        sortable: true,
      },
      {
        cell: (row) => <Button variant="contained" color="primary" value="edit" onClick = {(e) => { this.setJobForEdit(row); this.toggleContent(e)}}>Edit</Button>,
        button: true,
        name: "Edit"
      },
      {
        cell: (row) => <Button variant="contained" color="primary" value="edit" onClick = {(e) => { this.deleteJob(row);}}>Delete</Button>,
        button: true,
        name: "Edit"
      },
  ];


  constructor(props) {
		super(props);
    
		this.state = {
			defaultSelection: 'list',
      active: [],
      vehicles: [],
      Id: 0,
      Name: '',
      Type: '',
      Targa: '',
      VehicleCode: ''
		}
  }

  getVehicle = (vehicleId) => {
    const vehicle = this.state.vehicles.find( ({ Id }) => Id === vehicleId );
    return vehicle;
  }

  setVehicleForEdit = (jobId) => {

    const vehicle =  this.getVehicle(jobId.Id);

    this.setState({
      Id: vehicle.Id,
      Name: vehicle.Name,
      Type: vehicle.Type,
      Targa: vehicle.Targa,
      VehicleCode: vehicle.VehicleCode
    });

  }

  componentDidMount() {
    this.state.active['list'] = true;
    fetch(CONSTANTS.url + CONSTANTS.vehicle)
      .then(response => response.json())
      .then(data => { this.setState({ jobs: data })});
  }

	toggleContent = (event) => {
    let activeItem = [...this.state.active]
    let active = activeItem.map((val) => {
        return (val = false);
    });
    active[event.target.value] = true;

		this.setState({
			paymentSelection: event.target.value,
			active
		})
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    if (this.state.Id === '' || this.state.Id === 0) {
    post(CONSTANTS.url+CONSTANTS.role, {
      Id: this.state.Id,
      Name: this.state.Name,
      Type: this.state.Type,
      Targa: this.state.Targa,
      VehicleCode: this.state.VehicleCode
    })
      .then(response => response.json())
      .then((data) => {
        let dat = this.state.vehicles;
        dat.push(data)
        this.setState({vehicles: dat});
        alert("Vehicle Saved Succesfully")
            this.setState({
              Id: 0,
            });
      })
      .catch(() => alert("Something goes wrong. Vehicle dont saved"))
    } else if(this.state !== '') {

      put(CONSTANTS.url+CONSTANTS.vehicle, {
        Id: this.state.Id,
        Name: this.state.Name,
        Type: this.state.Type,
        Targa: this.state.Targa,
        VehicleCode: this.state.VehicleCode
      })
        .then(response => response.json())
        .then(item => {
          alert("Vehicle Saved Succesfully")
            this.setState({
              Id: 0,
            });
        })
        .catch(err => alert("Something goes wrong. Vehicle dont saved"))
    }

  }

  deleteVehicle = (vehicle) => {
    deleteRequest(CONSTANTS.url + CONSTANTS.vehicle + "/" + vehicle.Id)
    .then(response => response.json())
    .then(item => {
      if(item) {
        const dat = this.state.vehicles.filter(e => e.Id !== vehicle.Id);
        this.setState({vehicles: dat});
        alert("Item Deleted Successfully");
      } else {
        alert("Item can't delete");
      }
    })
    .catch(err => alert("Item can't delete"))
  }
  
	switchContent = (value) => {
    const a = value === "edit" ? "create" : value
		switch (a) {
			case 'create':
				return <div>
              <Form onSubmit={this.submitFormAdd}>
                <Row><Input type="hidden" id="Id" name="Id" placeholder="Id" onChange={this.onChange} value={this.state.Id === null ? '' : this.state.Id} required /></Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="Name" name="Name" placeholder="Name" onChange={this.onChange} value={this.state.Name === null ? '' : this.state.Name} required />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Vehicle Type</Label>
                      <Input type="select" id="VehicleType" name="VehicleType" onChange={this.onChange} value={this.state.VehicleType === null ? '' : this.state.VehicleType}  placeholder="VehicleType" required >
                        <option value=""></option>
                        <option value="T1">Type 1</option>
                        <option value="T2">Type 2</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Targa</Label>
                      <Input type="text" id="Targa" name="Targa" placeholder="Targa" onChange={this.onChange} value={this.state.Targa === null ? '' : this.state.Targa} required />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Vehicle Code</Label>
                      <Input type="text" id="VehicleCode" name="VehicleCode" onChange={this.onChange} value={this.state.VehicleCode === null ? '' : this.state.VehicleCode}  placeholder="Vehicle Code" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6"></Col>
                  <Col xs="6">
                    <FormGroup>
                      <Input type="submit" name="submit" id="submit" value="Submit"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
        </div>;
			case 'details':
          break;
			default:
        const { vehicles } = this.state;
				return <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
                <DataTable 
                  columns={this.columns}
                  data={vehicles}
                  defaultSortField="title"
                ></DataTable>
            </Card>
          </Col>
        </Row>
      </div>
		}
  }
  
  render() {
    const { paymentSelection } = this.state;
    return (
      <div>
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Vehicles</strong>
            </CardHeader>
            <CardBody>
                <ButtonGroup>
                  <Button outline className={this.state.active['list'] ? 'active': null} color="secondary" value="list" onClick={(e) => this.toggleContent(e)}>List</Button>
                  {/* <Button outline className={this.state.active['Details'] ? 'active': null} color="secondary" value="details" onClick={(e) => this.toggleContent(e)}>Details</Button> */}
                  <Button outline className={this.state.active['create'] ? 'active': null} color="secondary" value="create" onClick={(e) => this.toggleContent(e)}>Create</Button>
                  <Button outline className={this.state.active['edit'] ? 'active': null} color="secondary" >Edit</Button>
                </ButtonGroup>
                {this.switchContent(paymentSelection)}
            </CardBody>
          </Card>
        </div>
        <div className="app flex-row">
        </div>
      </div>
      
    );
  }
}

export default Vechicle;
