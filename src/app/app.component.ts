import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarInputComponent } from './components/calendar-input/calendar-input.component';
import { AdultComponent } from './components/programs/adult/adult.component';
import { BoxingComponent } from './components/programs/boxing/boxing.component';
import { KidsComponent } from './components/programs/kids/kids.component';
import { StrengthAndConditioningComponent } from './components/programs/strength-and-conditioning/strength-and-conditioning.component';
import { WomansOnlyComponent } from './components/programs/womans-only/womans-only.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminSigninComponent } from './components/admin-signin/admin-signin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CalendarInputComponent,
    AdultComponent,
    BoxingComponent,
    KidsComponent,
    StrengthAndConditioningComponent,
    WomansOnlyComponent,
    InstructorsComponent,
    PageNotFoundComponent,
    AdminSigninComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'huron-bjj';
}
