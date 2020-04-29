export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
    },
    {
      name: 'Schedule',
      url: '/schedule',
      children: [
        {
          name: 'Job Schedule',
          url: '/schedule',
        },
        {
          name: 'On Call',
          url: '/schedule/2',
        }
      ]
    },
    {
      name: 'Employees',
      url: '/employee',
    },
    {
      name: 'Jobs',
      url: '/Jobs',
    },
    {
      name: 'Location',
      url: '/location',
    },
    {
      name: 'Vehicle',
      url: '/vehicle',
    },
    {
      name: 'Time Sheet',
      url: '/working-hour',
    },
    {
      name: 'Chat',
      url: '/chat',
    },
    {
      name: 'Roles Managment',
      url: '/role',
    }
  ],
};
