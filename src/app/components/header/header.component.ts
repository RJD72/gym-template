import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  link = {
    text: 'Sign In',
    route: '/admin',
  };

  user: Observable<any>;

  constructor(private auth: Auth) {
    this.user = authState(this.auth);
  }

  ngOnInit() {
    this.user.subscribe((user) => {
      if (user) {
        this.link.text = 'Input';
        this.link.route = '/input';
      } else {
        this.link.text = 'Sign In';
        this.link.route = '/admin';
      }
    });
  }
}
