import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Check if the user is authenticated
    if (this.authService.isLoggedIn()) {
        console.log("logged in user");
      return true; // Allow access to the route
    } else {
      // Redirect to the login page if not authenticated
      this.router.navigate(['/login']);
      return false; // Block access to the route
    }
  }
}
