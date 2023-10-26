import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  
  constructor(private authService: AuthService, public router: Router) {}
  
  ngOnInit() {
    this.authService.getUserInfo().subscribe(
      (response: any) => {
          this.userInfo = response;
          console.log(this.userInfo);
      }, (error: any) => {
        console.log(error);
      }
    )
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }
}
