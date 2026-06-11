import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';
import { AppAuthService } from '../../services/app.auth.service';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.html',
  styleUrls: ['./auth-view.scss'],
  imports: [MatIcon, MatChip, MatButton],
})
export class AuthView implements OnInit {
  private authService = inject(AppAuthService);

  public username = '';
  public useralias = '';

  ngOnInit(): void {
    this.authService.usernameObservable.subscribe((name) => {
      this.username = name;
    });
    this.authService.useraliasObservable.subscribe((alias) => {
      this.useralias = alias;
    });
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
