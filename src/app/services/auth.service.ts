import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: Auth, private router: Router) {}

  //login method
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.fireAuth, email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/input']);
      },
      (err) => {
        alert('Something went wrong');
        this.router.navigate(['/admin-signin']);
      }
    );
  }

  //sign out
  logout() {
    signOut(this.fireAuth).then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/admin']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}
