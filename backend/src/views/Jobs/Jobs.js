import React, { Component  } from 'react';
import { Button, Card, ButtonGroup, CardHeader, CardBody, Col, Input, Row, FormGroup, Label, Form } from 'reactstrap';
import { post, put } from '../../services/api.service';
import { CONSTANTS } from '../../constants';
import DataTable from 'react-data-table-component';
import { deleteRequest } from '../../services/api.service';



class Jobs extends Component {

  columns = [
      {
        selector: "JobNumber",
        name: "Job Number",
        sortable: true,
      },
      {
        selector: "JobAddress",
        name: "Job Address",
        sortable: true,
      },
      {
        selector: "JobDescription",
        name: "Job Description",
        sortable: true,
      },
      // {
      //   selector: "Id",
      //   name: "ID",
      //   sortable: true,
      // },
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
      jobs: [],
      Id: 0,
      JobDescription: '',
      // JobNumber: '',
      JobName: '',
      JobType: '',
      JobContact: '',
      JobAddress: '',
      JobStatus: ''
		}
  }

  getJob = (jobId) => {
    const job = this.state.jobs.find( ({ Id }) => Id === jobId );
    return job;
  }

  setJobForEdit = (jobId) => {

    const job =  this.getJob(jobId.Id);

    this.setState({
      Id: job.Id,      
      JobDescription: job.JobDescription,
      JobNumber: job.JobNumber,
      JobType: job.JobType,
      JobContact: job.JobContact,
      JobAddress: job.JobAddress,
      JobStatus: job.JobStatus

    });

  }

  componentDidMount() {
    this.state.active['list'] = true;
    if(this.props.item){
      const { Id, JobDescription, JobNumber, JobName } = this.props.item;
      this.setState({Id, JobDescription, JobNumber, JobName });
      
    }
    fetch(CONSTANTS.url + CONSTANTS.job)
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
    post(CONSTANTS.url+CONSTANTS.job, {
      JobNumber: this.state.JobNumber,
      JobDescription: this.state.JobDescription,
      JobType: this.state.JobType,
      JobContact: this.state.JobContact,
      JobAddress: this.state.JobAddress,
      JobStatus: this.state.JobStatus

    })
      .then(response => response.json())
      .then((data) => {
        let dat = this.state.jobs;
        dat.push(data)
        this.setState({jobs: dat});
        alert("Job Saved Succesfully")
            this.setState({
              Id: 0,
              JobNumber: '',
              JobName: '',
              JobDescription: '',
              JobType: '',
              JobContact: '',
              JobAddress: '',
              JobStatus: ''
            });
      })
      .catch(() => alert("Something goes wrong. Job dont saved"))
    } else if(this.state !== '') {

      put(CONSTANTS.url+CONSTANTS.job, {
        Id: this.state.Id,
        JobNumber: this.state.JobNumber,
        JobName: this.state.JobName,
        JobDescription: this.state.JobDescription,
        JobType: this.state.JobType,
        JobContact: this.state.JobContact,
        JobAddress: this.JobAddress,
        JobStatus: this.JobStatus
      })
        .then(response => response.json())
        .then(item => {
          alert("Job Saved Succesfully")
            this.setState({
              Id: 0,
              JobNumber: '',
              JobName: '',
              JobDescription: '',
              JobType: '',
              JobContact: '',
              JobAddress: '',
              JobStatus: ''
            });
        })
        .catch(err => alert("Something goes wrong. Job dont saved"))
    }

  }

  deleteJob = (job) => {
    deleteRequest(CONSTANTS.url + CONSTANTS.job + "/" + job.Id)
    .then(response => response.json())
    .then(item => {
      if(item) {
        const dat = this.state.jobs.filter(e => e.Id !== job.Id);
        this.setState({jobs: dat});
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
                      <Label htmlFor="name">JobNumber</Label>
                      <Input type="text" id="JobNumber" name="JobNumber" placeholder="JobNumber" onChange={this.onChange} value={this.state.JobNumber === null ? '' : this.state.JobNumber} required />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">JobType</Label>
                      <Input type="select" id="JobType" name="JobType" onChange={this.onChange} value={this.state.JobType === null ? '' : this.state.JobType}  placeholder="JobType" required >
                        <option value=""></option>
                        <option value="ADE">Additional Emergency Work</option>
                        <option value="ADR">Additional Repair</option>
                        <option value="CD">COVID-19</option>
                        <option value="CE">Inspection</option>
                        <option value="AR">Amenities Refurbishment</option>
                        <option value="AA">Asbestos Abatement</option>
                        <option value="BV">Break in - Vandalism</option>
                        <option value="BR">Building Refurbishment</option>
                        <option value="CC">Carpet Cleaning</option>
                        <option value="CE">Comparative Estimate</option>
                        <option value="CR">Corridor Refurbishment</option>
                        <option value="DC">Dryer Vent Cleaning</option>
                        <option value="ES">Emergency Services</option>
                        <option value="FE">Fire Emergency</option>
                        <option value="GC">General Cleaning</option>
                        <option value="HC">Hoarding Cleanup</option>
                        <option value="LR">Lobby Refurbishment</option>
                        <option value="NB">No Billing</option>
                        <option value="OR">Odor Removal</option>
                        <option value="RB">Re-build</option>
                        <option value="SB">Sewer Backup</option>
                        <option value="TR">Trauma</option>
                        <option value="VI">Vehicle Impact</option>
                        <option value="WA">Water Damage</option>
                        <option value="WA">Water Proofing</option>
                        <option value="WE">Weather</option>
                        <option value="T">Tender</option>
                        <option value="TL">Testing/Lab Fees</option>
                        <option value="U">Upgrade</option>
                        <option value="G">Glyco</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">JobAddress</Label>
                      <Input type="text" id="JobAddress" name="JobAddress" placeholder="JobAddress" onChange={this.onChange} value={this.state.JobAddress === null ? '' : this.state.JobAddress} required />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Contact Information</Label>
                      <Input type="text" id="JobContact" name="JobContact" onChange={this.onChange} value={this.state.JobContact === null ? '' : this.state.JobContact}  placeholder="Contact Information" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="JobDescription">JobDescription</Label> <br/>
                      <textarea type="text" name="JobDescription" id="JobDescription" rows="10" cols="60" onChange={this.onChange} value={this.state.JobDescription === null ? '' : this.state.JobDescription} />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="name">Job Status</Label>
                      <Input type="select" id="JobStatus" name="JobStatus" onChange={this.onChange} value={this.state.JobStatus === null ? '' : this.state.JobStatus}  placeholder="JobStatus" required >
                        <option value="true">Open</option>
                        <option value="false">Closed</option>>
                      </Input>
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
        const { jobs } = this.state;
				return <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
                <DataTable 
                  columns={this.columns}
                  data={jobs}
                  title="Job List"
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
              <i className="fa fa-align-justify"></i><strong>Jobs</strong>
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

export default Jobs;
