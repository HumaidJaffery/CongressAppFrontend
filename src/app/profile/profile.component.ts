import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  
  constructor(private authService: AuthService) {}
  
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
}
