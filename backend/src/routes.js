import React from 'react';
import { Roles } from './roles';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Employee = React.lazy(() => import('./views/Employees/Employee'));
const Location = React.lazy(() => import('./views/Location/Location'));
const Schedule = React.lazy(() => import('./views/Schedule/Schedule'));
const Jobs = React.lazy(() => import('./views/Jobs/Jobs'));
const Chat = React.lazy(() => import('./views/Chat/Chat'));
const WorkingHour = React.lazy(() => import('./views/WorkingHour/WorkingHour'));
const Login = React.lazy(() => import('./views/Login/Login'));
const Vehicle = React.lazy(() => import('./views/Vehicles/Vehicles'));
const Role = React.lazy(() => import('./views/Role/Role'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', role:[Roles.Admin, Roles.ProjectManager, Roles.Account, Roles.Operator], name: 'Dashboard', component: Dashboard },
  { path: '/employee', role:[Roles.Admin, Roles.ProjectManager, Roles.Account, Roles.Operator], exact: true, name: 'Employees', component: Employee },
  { path: '/schedule', role:[Roles.Admin, Roles.ProjectManager, Roles.Account, Roles.Operator], exact: true, name: 'Schedule', component: Schedule },
  { path: '/location', role:[Roles.Admin, Roles.ProjectManager, Roles.Account, Roles.Operator], exact: true, name: 'Location', component: Location },
  { path: '/jobs', role:[Roles.Admin, Roles.ProjectManager, Roles.Account, Roles.Operator], exact: true, name: 'Jobs', component: Jobs },
  { path: '/chat', role:[Roles.Admin,Roles.ProjectManager, Roles.Account, Roles.Operator], exact: true, name: 'Chat', component: Chat },
  { path: '/working-hour', role:[Roles.Admin,Roles.ProjectManager, Roles.Account, Roles.Operator], exact: true, name: 'Working Hour', component: WorkingHour },
  { path: '/vehicle', role:[Roles.Admin,Roles.ProjectManager, Roles.Account, Roles.Operator], exact: true, name: 'Vehicle', component: Vehicle },
  { path: '/role', role:[Roles.Admin,Roles.ProjectManager, Roles.Account, Roles.Operator], exact: true, name: 'Role', component: Role },
  // { path: '/schedule/form-jobs', exact: true, name: 'FormJobs', component: ScheduleForm },

];

export default routes;