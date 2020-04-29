import React, { Component  } from 'react';
import { Button, Card, ButtonGroup, CardHeader, CardBody, Col, Input, Row, FormGroup, Label, Form, Container } from 'reactstrap';
import { post, put, deleteRequest } from '../../services/api.service';
import { CONSTANTS } from '../../constants';
import './Role.scss'; 
import DataTable from 'react-data-table-component';


class Role extends Component {

  columns = [
    {
      selector: "Name",
      name: "Name",
      sortable: true,
    },
    {
      selector: "Permissions",
      name: "Permissions",
      sortable: true,
    },
    {
      cell: (row) => <Button variant="contained" color="primary" value="details" onClick = {(e) => { this.showDetais(row); this.toggleContent(e); }}>Details</Button>,
      button: true,
      name: "Details"
    },
    {
      cell: (row) => <Button variant="contained" color="primary" value="edit" onClick = {(e) => { this.setUserForEdit(row); this.toggleContent(e)}}>Edit</Button>,
      button: true,
      name: "Edit"
    },
    {
      cell: (row) => <Button variant="contained" color="primary" value="delete" onClick = {() => { this.deleteRole(row);}}>Delete</Button>,
      button: true,
      name: "Delete"
    },
];


  constructor(props) {
		super(props);
    
		this.state = {
			defaultSelection: 'list',
      active: [],
      role: null,
      roles: [],
      Id: 0,
      Name: '',
      Permissions: []
		}
  }
  
  componentDidMount() {
    this.state.active['list'] = true;
    fetch(CONSTANTS.url + CONSTANTS.role)
    .then(response => response.json())
    .then(data => { this.setState({ roles: data })});
  }

  getRole = (roleId) => {
    const role = this.state.roles.find( ({ Id }) => Id === roleId );
    return role;
  }

  setUserForEdit = (u) => {
    const role =  this.getRole(u.Id);

    this.setState({
      Id: role.Id,
      Name: role.Name,
      Permissions: role.Permissions
    });
  }

  deleteRole = (u) => {
    deleteRequest(CONSTANTS.url+CONSTANTS.role + '/'+u.Id)
    .then(response => response.json())
    .then(item => {
      if(item === true) {
        window.location.reload();
        alert("Role Deleted Successfully");
      } else {
        alert("Role can't delete");
      }
    })
    .catch(err => alert("Role can't delete"))
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
  
  showDetails(role) {
    this.setState({role})
  }

  submitFormAdd = e => {

    console.log(this.state);
    e.preventDefault()
    post(CONSTANTS.url + CONSTANTS.role, {
      Name: this.state.Name,
      Permissions: this.state.Permissions
    })
      .then(response => response.json())
      .then(item => {
        this.setState({
          Id: 0,
          Name: '',
          Permissions: []
        });
        window.location.reload();
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault() 
    put(CONSTANTS.url+CONSTANTS.employes, {
      Id: this.state.Id,
      Name: this.state.Name,
      Permissions: this.state.Permissions
    })
      .then(response => response.json())
      .then(item => {
        // if(Array.isArray(item)) {
          this.setState({
            Id: 0,
            Id: 0,
            Name: '',
            Permissions: []
          });
          window.location.reload();
          // this.props.updateState(item[0])
          // this.props.toggle()
        // } else {
          // console.log('failure')
        // }
      })
      .catch(err => console.log(err))
  }
  
  
	switchContent = (value) => {
    const a = value === "edit" ? "create" : value
		switch (a) {
			case 'create':
				return <div>
              <Form onSubmit={this.state.Id !== 0 && this.state.Id !== '' ? this.submitFormEdit : this.submitFormAdd}>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Role</Label>
                      <Input type="text" id="Name" name="Name" placeholder="Name" onChange={this.onChange} value={this.state.Name === null ? '' : this.state.Name} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Row>
                        <Col className="bold">Module:</Col>
                        <Col className="bold">Access</Col>
                        <Col className="bold">Delete:</Col>
                        <Col className="bold">Edit</Col>
                        <Col className="bold">View</Col>
                      </Row>
                      <Row>
                        <Col className="bold" name="permisdion1">Employee:</Col>
                        <Col>
                          <Input type="select">
                            <option value="1">Non-Set</option>
                            <option value="2">Set</option>
                          </Input>
                        </Col>
                        <Col>
                          <Input type="select" name="permisdion2">
                            <option value="1">Non-Set</option>
                            <option value="2">Set</option>
                          </Input>
                        </Col>
                        <Col>
                          <Input type="select" name="permisdion3">
                            <option value="1">Non-Set</option>
                            <option value="2">Set</option>
                          </Input>
                        </Col>
                        <Col>
                          <Input type="select" name="permisdion4">
                            <option value="1">Non-Set</option>
                            <option value="2">Set</option>
                          </Input>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Input type="submit" name="submit" id="submit"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
				</div>;
			case 'details':
        const { role } = this.state;
				return <div>
				<Container>
            <Row xs="2">
              <Col className="bold">Role: </Col>
              <Col>{role.Name}</Col>
            </Row>
            <Row xs="3">
              <Col className="bold">Module:</Col>
              <Col className="bold">Access</Col>
              <Col className="bold">Delete:</Col>
              <Col className="bold">Edit</Col>
              <Col className="bold">View</Col>
            </Row>
            <Row xs="4">
              <Col className="bold">Employee:</Col>
              <Col>
                <Input type="select">
                  <option value="1">Non-Set</option>
                  <option value="2">Set</option>
                </Input>
              </Col>
              <Col>
                <Input type="select">
                  <option value="1">Non-Set</option>
                  <option value="2">Set</option>
                </Input>
              </Col>
              <Col>
                <Input type="select">
                  <option value="1">Non-Set</option>
                  <option value="2">Set</option>
                </Input>
              </Col>
              <Col>
                <Input type="select">
                  <option value="1">Non-Set</option>
                  <option value="2">Set</option>
                </Input>
              </Col>
            </Row>
          </Container>
			</div>;
			default:
        const { userList } = this.state;
				return <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
                <DataTable 
                  columns={this.columns}
                  data={userList}
                  defaultSortField="title"
                ></DataTable>
            </Card>
          </Col>
        </Row>
      </div>;;
		}
	}

  render() {
    const { paymentSelection } = this.state;
    return (
      <div>
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Roles</strong>
            </CardHeader>
            <CardBody>
                <ButtonGroup>
                  <Button outline className={this.state.active['list'] ? 'active': null} color="secondary" value="list" onClick={(e) => this.toggleContent(e)}>List</Button>
                  <Button outline className={this.state.active['details'] ? 'active': null} color="secondary" value="details" onClick={(e) => this.toggleContent(e)} hidden={this.state.active['details'] ? false: true} >Details</Button>
                  <Button outline className={this.state.active['create'] ? 'active': null} color="secondary" value="create" onClick={(e) => this.toggleContent(e)}>Create</Button>
                  <Button outline className={this.state.active['edit'] ? 'active': null} color="secondary" value="edit" onClick={(e) => this.toggleContent(e)} hidden={this.state.active['edit'] ? false: true} >Edit</Button>
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

export default Role;
