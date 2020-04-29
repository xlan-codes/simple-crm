import React, { Component  } from 'react';
import { Button, Card, ButtonGroup, CardHeader, CardBody, Col, Input, Row, FormGroup, Label, Form, Container } from 'reactstrap';
import { post, put, deleteRequest } from '../../services/api.service';
import { CONSTANTS } from '../../constants';
import './Employee.scss'; 
import moment from 'moment';
import DataTable from 'react-data-table-component';


class Employee extends Component {

  columns = [
    {
      selector: "FirstName",
      name: "First Name",
      sortable: true,
    },
    {
      selector: "LastName",
      name: "Last Name",
      sortable: true,
    },
    {
      selector: "Email",
      name: "Email",
      sortable: true,
    },
    {
      selector: "Gender",
      name: "Gender",
      sortable: true,
    },
    {
      selector: "Position",
      name: "Position",
      sortable: true,
    },
    {
      selector: "NormalBusinessHour",
      name: "Payment For Normal Business Hour",
      sortable: true,
    },
    {
      selector: "AfterBusinessHour",
      name: "Payment For After Business Hour",
      sortable: true,
    },
    {
      selector: "Registered",
      name: "Registered",
      sortable: true,
      format:  d => moment(d.Registered).format('ll'),
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
      cell: (row) => <Button variant="contained" color="primary" value="delete" onClick = {() => { this.deleteEmployee(row);}}>Delete</Button>,
      button: true,
      name: "Delete"
    },
];


  constructor(props) {
		super(props);
    
		this.state = {
			defaultSelection: 'list',
      active: [],
      userList: [],
      roles: [],
      Id: 0,
      FirstName: '',
      LastName: '',
      Birthdate: "",
      Gender: '',
      Phone: 0,
      Position: '',
      NormalBusinessHour: '',
      AfterBusinessHour: '',
      Address: '',
      isPasswordShown: false,
      Username: '',
      Password: '',
      Role: []
		}
  }
  
  componentDidMount() {
    this.state.active['list'] = true;
    if(this.props.item){
      const { FirstName, LastName, Birthdate, Gender, Adress, Phone, Position, NormalBusinessHour, AfterBusinessHour } = this.props.item;
      this.setState({FirstName, LastName, Birthdate, Gender, Adress, Phone, Position, NormalBusinessHour, AfterBusinessHour });
    }
    fetch(CONSTANTS.url + CONSTANTS.employes)
      .then(response => response.json())
      .then(data => { this.setState({ userList: data })});
    fetch(CONSTANTS.url + CONSTANTS.role)
    .then(response => response.json())
    .then(data => { this.setState({ roles: data })});
  }

  getUser = (userid) => {
    const user = this.state.userList.find( ({ Id }) => Id === userid );
    return user;
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  setUserForEdit = (u) => {
    const user =  this.getUser(u.Id);

    this.setState({
      Id: user.Id,      
      FirstName: user.FirstName,
      LastName: user.LastName,
      Birthdate: user.Birthdate,
      Gender: user.Gender,
      Phone: user.Phone,      
      Position: user.Position,
      NormalBusinessHour: user.NormalBusinessHour,
      AfterBusinessHour: user.AfterBusinessHour,
      Address: user.Address,
      Username: user.Username,
      Password: user.Password
    });
  }

  deleteEmployee = (u) => {
    deleteRequest(CONSTANTS.url+CONSTANTS.employes + '/'+u.Id)
    .then(response => response.json())
    .then(item => {
      if(item === true) {
        window.location.reload();
        alert("Item Deleted Successfully");
      } else {
        alert("Item can't delete");
      }
    })
    .catch(err => alert("Item can't delete"))
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
  
  showDetais(employee) {
    this.setState({employee})
  }

  submitFormAdd = e => {

    console.log(this.state);
    e.preventDefault()
    post(CONSTANTS.url+CONSTANTS.employes, {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Birthdate: this.state.Birthdate,
      Gender: this.state.Gender,
      Phone: this.state.Phone,
      Position: this.state.Position,
      NormalBusinessHour: this.state.NormalBusinessHour,
      AfterBusinessHour: this.state.AfterBusinessHour,
      Username: this.state.Username,
      Password: this.state.Password,
      Role: []
    })
      .then(response => response.json())
      .then(item => {
        this.setState({
          Id: 0,
          FirstName: '',
          LastName: '',
          Birthdate: '',
          Gender: '',
          Phone: '',
          Position: '',
          NormalBusinessHour: '',
          AfterBusinessHour: '',
          Address: '',
          Username: '',
          Password: '',
          Role: ''
        });
        window.location.reload();
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault() 
    put(CONSTANTS.url+CONSTANTS.employes, {
      Id: this.state.Id,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Birthdate: this.state.Birthdate,
      Gender: this.state.Gender,
      Phone: this.state.Phone,
      Position: this.state.Position,
      NormalBusinessHour: this.state.NormalBusinessHour,
      AfterBusinessHour: this.state.AfterBusinessHour,
      Address: this.state.Address,
      Username: this.state.Username,
      Password: this.state.Password,
      Role: this.state.Role
    })
      .then(response => response.json())
      .then(item => {
        // if(Array.isArray(item)) {
          this.setState({
            Id: 0,
            FirstName: '',
            LastName: '',
            Birthdate: '',
            Gender: '',
            Phone: '',
            Position: '',
            NormalBusinessHour: '',
            AfterBusinessHour: '',
            Address: '',
            Username: '',
            Password: '',
            Role: ''
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
        const { isPasswordShown } = this.state;
				return <div>
              <Form onSubmit={this.state.Id !== 0 && this.state.Id !== '' ? this.submitFormEdit : this.submitFormAdd}>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">First Name</Label>
                      <Input type="text" id="FirstName" name="FirstName" placeholder="FirstName" onChange={this.onChange} value={this.state.FirstName === null ? '' : this.state.FirstName} required />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Last Name</Label>
                      <Input type="text" id="LastName" name="LastName" onChange={this.onChange} value={this.state.LastName === null ? '' : this.state.LastName}  placeholder="LastName" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row> 
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="ccyear">Birthdate</Label>
                      <Input type="date" name="Birthdate" id="Birthdate" onChange={this.onChange} value={this.state.Birthdate === null ? '' : this.state.Birthdate}/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="mobile">Address</Label>
                      <Input type="text" name="Address" onChange={this.onChange} value={this.state.Address === null ? '' : this.state.Address} id="Address" />
                    </FormGroup>
                  </Col>
                  <Col xs="1">
                    <FormGroup>
                      <Label htmlFor="ccyear">Gender</Label>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                      <FormGroup check className="radio" inline>
                        <Input className="form-check-input" type="radio" id="male" name="Gender"  onChange={this.onChange} value={this.state.Gender === null ? '' : this.state.Gender} value="M" />
                        <Label check className="form-check-label" htmlFor="male">Male</Label>
                      </FormGroup>
                      <FormGroup check className="radio" inline>
                        <Input className="form-check-input" type="radio" id="female" name="Gender" onChange={this.onChange} value={this.state.Gender === null ? '' : this.state.Gender} value="F" />
                        <Label check className="form-check-label" htmlFor="male">Female</Label>
                      </FormGroup>
                    </Col>
                </Row>
                <Row> 
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="mobile">Phone</Label>
                      <Input type="phone" name="Phone" id="Phone" onChange={this.onChange} value={this.state.Phone === null ? '' : this.state.Phone}  />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Position</Label>
                      <Input type="select" name="Position" onChange={this.onChange} value={this.state.Position === null ? '' : this.state.Position} id="Position" >
                        <option value=""></option>
                        <option value="Technic">Technic</option>
                        <option value="Project Manager">ProjectManager</option>
                        <option value="Cordinator">Cordinator</option>
                        <option value="Account">Account</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>

                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="NormalBusinessHour">Normal Business Hours</Label>
                      <Input type="text" name="NormalBusinessHour" onChange={this.onChange} value={this.state.NormalBusinessHour === null ? '' : this.state.NormalBusinessHour} id="NormalBusinessHour"/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="AfterBusinessHour">After Business Hours</Label>
                      <Input type="text" name="AfterBusinessHour" onChange={this.onChange} value={this.state.AfterBusinessHour === null ? '' : this.state.AfterBusinessHour} id="AfterBusinessHour"/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="Username">Username</Label>
                      <Input type="text" name="Username" onChange={this.onChange} value={this.state.Username === null ? '' : this.state.Username} id="Username"/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="Password">Password</Label>
                      <Input type={isPasswordShown ? "text" : "password"} onChange={this.onChange} value={this.state.Password === null ? '' : this.state.Password} name="Password" id="Password"/>
                      <i
                        className="fa fa-eye password-icon"
                        onClick={this.togglePasswordVisiblity}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Label htmlFor="Role">Role</Label>
                    <Input type="select" name="Role" onChange={this.onChange} value={this.state.Role === null ? '' : this.state.Role} id="Role" multiple></Input>
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
        const { employee } = this.state;
				return <div>
				<Container>
            <Row xs="2">
              <Col className="bold">First Name: </Col>
              <Col>{employee.FirstName}</Col>
              <Col className="bold">Last Name:</Col>
              <Col>{employee.LastName}</Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row xs="3">
              <Col className="bold">Birthdate:</Col>
              <Col>{employee.Birthdate}</Col>
              <Col className="bold">Gender:</Col>
              <Col>{employee.Gender}</Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row xs="4">
              <Col className="bold">Phone:</Col>
              <Col>{employee.Phone}</Col>
              <Col className="bold">Position:</Col>
              <Col>{employee.Position}</Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row xs="4">
              <Col className="bold">Normal Business Hour Price:</Col>
              <Col>{employee.NormalBusinessHour}</Col>
              <Col className="bold">After Business Hour:</Col>
              <Col>{employee.AfterBusinessHour}</Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row xs="1" sm="2" md="4">
              <Col className="bold">Address:</Col>
              <Col>{employee.Adress}</Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
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
                  title="Employee List"
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
              <i className="fa fa-align-justify"></i><strong>Employee</strong>
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

export default Employee;
