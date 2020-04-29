import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'schedule',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.ScheduleModule)
      },
    ],
    // canActivate: [AuthGuard],
  },
  {
    path: 'map',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/map/map.module').then(m => m.MapModule)
      }
    ],
    // canActivate: [AuthGuard],
  },
  {
    path: 'time-sheet',
    loadChildren: () => import('./pages/time-sheet/time-sheet.module').then( m => m.TimeSheetPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'emergency-report',
    loadChildren: () => import('./pages/emergency-report/emergency-report.module').then( m => m.EmergencyReportModule),
    // canActivate: [AuthGuard],
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
