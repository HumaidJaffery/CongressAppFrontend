import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CongressAppFrontend';

  constructor(public router: Router, public authService: AuthService, private route: ActivatedRoute) {}

    search(keyword: any){
      this.router.navigate([`home/${keyword}`]);
    }
}
