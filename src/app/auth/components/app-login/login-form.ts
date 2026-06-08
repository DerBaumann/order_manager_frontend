import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';
import { AppAuthService } from '../../services/app.auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.scss'],
  imports: [MatIcon, NgIf, MatChip, MatButton],
})
export class LoginForm implements OnInit {
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
