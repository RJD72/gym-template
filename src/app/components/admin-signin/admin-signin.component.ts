import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-signin.component.html',
  styleUrl: './admin-signin.component.css',
})
export class AdminSigninComponent {
  protected signInForm: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  submitForm() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      const formValues = this.signInForm.value;
      this.auth.login(email, password);
    }
  }
}
