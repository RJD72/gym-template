import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ContactComponent } from './components/contact/contact.component';
import { CalendarInputComponent } from './components/calendar-input/calendar-input.component';
import { KidsComponent } from './components/programs/kids/kids.component';
import { AdultComponent } from './components/programs/adult/adult.component';
import { WomansOnlyComponent } from './components/programs/womans-only/womans-only.component';
import { BoxingComponent } from './components/programs/boxing/boxing.component';
import { StrengthAndConditioningComponent } from './components/programs/strength-and-conditioning/strength-and-conditioning.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminSigninComponent } from './components/admin-signin/admin-signin.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Valor BJJ | Home' },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./components/schedule/schedule.component').then(
        (m) => m.ScheduleComponent
      ),
    title: 'Valor BJJ | Schedule',
  },
  {
    path: 'instructors',
    loadComponent: () =>
      import('./components/instructors/instructors.component').then(
        (m) => m.InstructorsComponent
      ),
    title: 'Valor BJJ | Instructors',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    title: 'Valor BJJ | Contact',
  },
  {
    path: 'admin',
    component: AdminSigninComponent,
    title: 'Valor BJJ | Sign In',
  },
  {
    path: 'input',
    component: CalendarInputComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'programs/kids',
    component: KidsComponent,
    title: 'Valor BJJ | Kids routerLink="programs/kids"',
  },
  {
    path: 'programs/adult',
    component: AdultComponent,
    title: 'Valor BJJ | Adult Program',
  },
  {
    path: 'programs/womans',
    component: WomansOnlyComponent,
    title: 'Valor BJJ | Womans Only Program',
  },
  {
    path: 'programs/boxing',
    component: BoxingComponent,
    title: 'Valor BJJ | Boxing Program',
  },
  {
    path: 'programs/strength',
    component: StrengthAndConditioningComponent,
    title: 'Valor BJJ | Strength and Conditioning Program',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Valor BJJ | Page not found',
  },
];
