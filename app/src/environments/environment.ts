// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  location: '/location',
  schedule: "/schedule",
  employee: "/employee",
  login: "/auth/login",
  ibx_service: 'http://192.168.88.205:3000',
  timesheet: '/employee/working-hour',
  authtoken: 'auth-token',
  workinghourstarted: '/working-hour-setted',


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
