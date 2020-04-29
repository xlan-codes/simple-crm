import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { CONSTANTS } from '../../constants';
import moment from 'moment';


  const columns = [
    {
        selector: "Registered",
        name: "Date",
        sortable: true,
        format: d => moment(d.Registered).format('ll'),
      },
      {
        selector: "Job.JobNumber",
        name: "Job Number",
        sortable: true,
      },
      {
        selector: "Employee.FirstName",
        name: "Employee First Name",
        sortable: true,
      },
      {
        selector: "Employee.LastName",
        name: "Employee",
        sortable: true,
      },
      {
        selector: "StartHour",
        name: "Time",
        sortable: true,
        format: d => moment(d.StartHour).format('HH:mm:ss'),
      },
      {
        selector: "Type",
        name: "Type",
        sortable: true,
      }
  ];
  

class WorkingHour extends Component {



    constructor(props) {
          super(props);
      
          this.state = {
              defaultSelection: 'list',
              active: [],
              timeSheet: []
          }
    }
  
    getWorkingHours = (userid) => {
      const timesheet = this.setState.timeSheet.find( ({ Id }) => Id === userid );
      return timesheet;
    }
   
    componentDidMount() {
      if(this.props.item){
        // const { JobDescription, JobNumber, TimeWork, JobSite, Technic, JobName } = this.props.item;
        // this.setState({JobDescription, JobNumber, TimeWork, JobSite, Technic, JobName });
      }
      fetch(CONSTANTS.url + CONSTANTS.timesheet)
        .then(response => response.json())
        .then(data => { 
          this.setState({ timeSheet: data })
        });
    }
  
    toggleContent = (event) => {
    //   let activeItem = [...this.state.active]
    //   let active = activeItem.map((val) => {
    //       return (val = false);
    //   });
    //   active[event.target.value] = true;
  
    //   this.setState({
    //       paymentSelection: event.target.value,
    //       active
    //   })
    }

  
    onChange = e => {
    //   this.setState({[e.target.name]: e.target.value})
    }
  
    submitFormAdd = e => {
  

    }
  
    submitFormEdit = e => {
      
    }
    
  
    render() {
      const { timeSheet } = this.state;
      return (
        <div>
            <DataTable
                title="Time Sheet"
                columns={columns}
                data={timeSheet}
                defaultSortField="title"
            />
        </div>
        
      );
    }
  }
  
  export default WorkingHour;
