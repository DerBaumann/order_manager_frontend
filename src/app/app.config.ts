import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideBrowserGlobalErrorListeners,
  provideEnvironmentInitializer,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { AuthConfig, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { authConfig } from './app.auth';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXsrfConfiguration,
} from '@angular/common/http';
import { AppAuthService } from './auth/services/app.auth.service';
import { environment } from '../environments/environment';

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    { provide: AuthConfig, useValue: authConfig },
    { provide: OAuthStorage, useFactory: storageFactory },
    provideHttpClient(
      withInterceptorsFromDi(),
      withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
    ),
    provideOAuthClient({
      resourceServer: { sendAccessToken: true, allowedUrls: [environment.backendBaseUrl] },
    }),
    provideEnvironmentInitializer(() => inject(AppAuthService).initAuth().finally()),
  ],
};
