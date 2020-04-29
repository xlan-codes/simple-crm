import React, { Component } from 'react';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
import { DragDropContext as dragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import './Schedule.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Input, Row,   FormGroup, Label, Form } from 'reactstrap';
import { CONSTANTS } from '../../constants';
import { post,get, put } from '../../services/api.service';
import DateTimePicker from 'react-datetime-picker';
import { useParams } from "react-router-dom";



class Schedule extends Component {

    schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day);

    constructor(props) {
        super(props)
        moment.locale('en-CA');
        this.schedulerData.setLocaleMoment(moment);
        this.state = {
            modal: false,
            active: [],
            schedules: [],
            events: [],
            resources: [],
            scheduleType: 0,
            Id: 0,
            schedulesubject: '',
            starthour: new Date(),
            endhour: new Date(),
            job: '',
            employee: "",
            taskdescription: "",
            jobs: [],
            employees: [],
            Vehicle: ''
        }
    }

    componentDidMount() {
        if(this.props.item){
            const { modal, starthour, endhour, job, employee, taskdescription, Vehicle } = this.props.item;
            this.setState({modal, starthour, endhour, job, employee, taskdescription, Vehicle });
        }
        // const { paramId } = useParams(); 

        
        this.getSchdedule();
        this.getJobs();
        this.getEmployees();
    }

    getEmployees() {
        get(CONSTANTS.url + CONSTANTS.employes).then(response => response.json()).then((data) => {
            this.setState({employees: data})
        });
    }

    getJobs() {
        get(CONSTANTS.url + CONSTANTS.job).then(response => response.json()).then((data) => {
            this.setState({jobs: data})
        });
    }


    getSchdedule(startdate = new Date(), enddate = new Date()) {
        get(CONSTANTS.url + CONSTANTS.schedule)
        .then(response => response.json())
        .then(data => {

            const events = data.map((event) => {
                var sHour = moment(new Date(event.StartHour)).format('YYYY-MM-DD HH:mm:ss'); 
                var eHour = moment(new Date(event.EndHour)).format('YYYY-MM-DD HH:mm:ss');
                const temp = {
                    id: event.Id ? event.Id:"" ,
                    start: sHour, //,
                    end: eHour, //e,
                    resourceId: event.Id,
                    title: event.ScheduleSubject && event.Job.JobNumber && event.Job.JobAddress ? event.ScheduleSubject + " " + event.Job.JobNumber + " " + event.Job.JobAddress : "",
                    hourwork: '10 hour work',
                    bgColor: this.generateColor(),
                };
                return temp;
            });


            const resources = data.map((el) => {
                const t = {
                    id: el.Id,
                    name: el.ScheduleSubject ? el.ScheduleSubject : "",
                };
                return t;
            });
            this.schedulerData.setResources(resources);
            this.schedulerData.setEvents(events);
            this.setState({schedules: data})
            this.setState({ events, resources })
        }); 
    }


    generateColor () {
        return '#' +  Math.random().toString(16).substr(-6);
    }

        
    toggle = () => { 
        this.setState(prevState => ({
            modal: !prevState.modal,
            Id: 0,
            starthour: '',
            endhour: '',
            job: '',
            employee: "",
            taskdescription: "",
            schedulesubject: "",
            Vehicle: ''
        }));
    };

    saveTask = () => {
        if(this.state.Id === "" || this.state.Id === 0) {

            post(CONSTANTS.url + CONSTANTS.schedule, {
                StartHour: this.state.starthour,
                EndHour: this.state.endhour,
                Job: this.state.job,
                Employee: this.state.employee,
                ScheduleSubject: this.state.schedulesubject,
                TaskDescription: this.state.taskdescription,
                Vehicle: this.state.Vehicle
            }).then(response => response.json()).then((res) => {
                var sHour = moment(new Date(res.StartHour)).format('YYYY-MM-DD HH:mm:ss'); 
                var eHour = moment(new Date(res.EndHour)).format('YYYY-MM-DD HH:mm:ss');
                const temp = {
                    id: res.Id ? res.Id:"" ,
                    start: sHour, //,
                    end: eHour, //e,
                    resourceId: res.Id,
                    title: res.ScheduleSubject ? res.ScheduleSubject : "",
                    hourwork: '10 hour work',
                    bgColor: this.generateColor(),
                };
                this.setState(state => {
                    const events = state.events.concat(temp);
                    return events;
                });

                const t = {
                    id: res.Id,
                    name: res.ScheduleSubject ? res.ScheduleSubject : "",
                };
                this.setState(state => {
                    const resources = state.events.concat(t);
                    return resources;
                });
                this.schedulerData.setEvents(this.state.events)
                this.schedulerData.setResources(this.state.resources)
                this.toggle();
            }).catch((rej) => {
                alert("Something goes wrong");
            });
        } else {

            put(CONSTANTS.url + CONSTANTS.schedule, {
                Id: this.state.Id,
                StartHour: this.state.starthour,
                EndHour: this.state.endhour,
                Job: this.state.job,
                Employee: this.state.employee,
                ScheduleSubject: this.state.schedulesubject,
                TaskDescription: this.state.taskdescription,
                Vehicle: this.state.Vehicle
            }).then(response => response.json()).then((res) => {
                var sHour = moment(new Date(res.StartHour)).format('YYYY-MM-DD HH:mm:ss'); 
                var eHour = moment(new Date(res.EndHour)).format('YYYY-MM-DD HH:mm:ss');
                const temp = {
                    id: res.Id ? res.Id:"" ,
                    start: sHour, //,
                    end: eHour, //e,
                    resourceId: res.Id,
                    title: res.ScheduleSubject ? res.ScheduleSubject : "",
                    hourwork: '10 hour work',
                    bgColor: this.generateColor()
                };
                const e = this.setState(state => {
                    const events = state.events.concat(temp);
                    return events;
                });

                const t = {
                    id: res.Id,
                    name: res.ScheduleSubject ? res.ScheduleSubject : "",
                };
                const r = this.setState(state => {
                    const resources = state.events.concat(t);
                    return resources;
                });
                this.schedulerData.setEvents(e)
                this.schedulerData.setResources(r)
                this.toggle();
            }).catch((rej) => {
                alert("Something goes wrong");
            });
        }
    }


    onChange = e => {
        this.setState({[e.target.name]: e.target.value});

    }

    onEndDateChange = e => {
        this.setState({endhour: e})
    }

    onStartDateChange = e => {
        this.setState({starthour: e})
    }


    state = {
        Id: 0,
        schedulesubject: "",
        starthour: '',
        endhour: '',
        job: '',
        employee: "",
        taskdescription: "",
        jobs: [],
        employees: [],
        Vehicle: ''
      }
  
    render() {
        const { employees, jobs } = this.state;
        return (
        <div className="animated fadeIn">
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Task</ModalHeader>
                    <ModalBody>

                         <Form>
                             <Row>
                                 <Col xs="12">
                                 <Label htmlFor="schedulesubject">Schedule Subject</Label>
                                        <Input type="text" name="schedulesubject" onChange={this.onChange} value={this.state.schedulesubject === null ? '' : this.state.schedulesubject}  id="schedulesubject" required/>
                                 </Col>
                             </Row>
                            <Row>
                                <Col xs="6">
                                <FormGroup>
                                    <Label htmlFor="name">Job</Label>

                                    <Input type="hidden" id="Id"  name="Id" onChange={this.onChange} value={this.state.Id === null ? '' : this.state.Id} placeholder="" />
                                    <Input type="select" id="name"  name="job" onChange={this.onChange} value={this.state.job === null ? '' : this.state.job} placeholder="" required>
                                        <option></option>
                                        { jobs.map((el, idx) => <option key={idx} value={el.Id}>{el.JobNumber}</option>) }
                                    </Input>
                                </FormGroup>
                                </Col>
                                <Col xs="6">
                                <FormGroup>
                                    <Label htmlFor="name">Employee</Label>

                                    <Input type="select" id="name" name="employee" onChange={this.onChange} value={this.state.employee === null ? '' : this.state.employee} placeholder="" required >
                                        <option></option>
                                        { employees.map((el, idx) => <option key={idx} value={el.Id}>{el.FirstName + " " + el.LastName}</option>) }
                                    </Input>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>

                                        <Label htmlFor="starthour">Start Date</Label>
                                        <DateTimePicker name="starthour" onChange={this.onStartDateChange} value={this.state.starthour } id="starthour"></DateTimePicker>
                                        {/* <Input type="time" name="starthour" onChange={this.onChange} value={this.state.starthour === null ? '' : this.state.starthour} id="starthour"/> */}
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>

                                        <Label htmlFor="endhour">End Date</Label>
                                        <DateTimePicker name="starthour" onChange={this.onEndDateChange} value={this.state.endhour } id="starthour"></DateTimePicker>
                                        {/* <Input type="time" name="endhour" onChange={this.onChange} value={this.state.endhour === null ? '' : this.state.endhour}  id="endhour"/> */}
                                    </FormGroup>
                                </Col>
                               
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>

                                        <Label htmlFor="taskdescription">Task Description</Label>
                                        <textarea type="Technic" name="taskdescription" rows="5" cols="30" onChange={this.onChange} value={this.state.taskdescription === null ? '' : this.state.taskdescription} id="taskDescription"/>
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label htmlFor="vehicle">Select Vehicle</Label>
                                        <Input type="select" name="Vehicle" id="Vehicle" onChange={this.onChange} value={this.state.Vehicle === null ? '' : this.state.Vehicle} >
                                            <option></option>
                                            <option value="T34">T34</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>    
                    </ModalBody>
                    <ModalFooter>

                        <Button color="primary" onClick={this.saveTask}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            <Form><Input type='button' value="Add Task" onClick={ this.toggle} ></Input> </Form>
            <Scheduler schedulerData={this.schedulerData}
                prevClick={this.prevClick}
                nextClick={this.nextClick}
                onSelectDate={this.onSelectDate}
                onViewChange={this.onViewChange}
                eventItemClick={this.eventClicked}
                newEvent={this.newEvent}
            />
            
        </div>
        );
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })

    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
                schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
                schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, time) => {
        schedulerData.setDate(time);
                schedulerData.setEvents(this.state.events);
        // if(window.confirm(`Do you want to create a new StartHour?`)){
        //     this.toggle()        
        // }
        this.setState({
            viewModel: schedulerData
        })
      
        
    }

    eventClicked = (schedulerData, event) => {
        this.toggle();
        const t = event.id.split('-');
        const id = t[0] ? t[0]: ""; 
        const temp  = this.state.schedules.find((el) => el.Id === id);
        if(temp) {
            this.setState({Id: temp.Id});
            this.setState({schedulesubject: temp.ScheduleSubject});
            this.setState({employee: temp.Employee?.Id});
            this.setState({job: temp.Job?.Id});
            this.setState({starthour: temp.StartHour});
            this.setState({endhour: temp.EndHour});
            this.setState({taskdescription: temp.TaskDescription});
            this.setState({Vehicle: temp.Vehicle});
        }

    };

    // ops1 = (schedulerData, event) => {
    //     alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    // };

    // ops2 = (schedulerData, event) => {
    //     alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    // };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        this.toggle();
        this.state.StartHour = start;
        this.state.EndHour = end;
        // if(window.confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

            // let newFreshId = 0;
            // schedulerData.events.forEach((item) => {
            //     if(item.id >= newFreshId)
            //         newFreshId = item.id + 1;
            // });

            // let newEvent = {
            //     id: newFreshId,
            //     title: 'New event you just created',
            //     start: start,
            //     end: end,
            //     resourceId: slotId,
            //     bgColor: 'purple'
            // }
            // schedulerData.addEvent(newEvent);
            // this.setState({
            //     viewModel: schedulerData
            // })
        // }
    }

    updateEventStart = (schedulerData, event, newStart) => {
        // if(window.confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
        //     schedulerData.updateEventStart(event, newStart);
        // }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        // if(window.confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
        //     schedulerData.updateEventEnd(event, newEnd);
        // }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        // if(window.confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
        //     schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        // }
    }

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.next();
                    schedulerData.setEvents(this.state.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
                    schedulerData.setEvents(this.state.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = 10;
        }
    }

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}

export default dragDropContext(HTML5Backend)(Schedule);
