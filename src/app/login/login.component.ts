import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLogInToAccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['home']);
      return;
    }

    this.route.queryParams.subscribe((params) => {
      if(params['showLogInToAccessMessage'] == 'true'){
        this.showLogInToAccessMessage = true;
      }
    });
  }



  onSubmit(data: any){
    this.showLogInToAccessMessage = false;
    this.authService.login(data.email, data.password).subscribe(
      (data: any) => {
        console.log("here" + data);
        this.router.navigate(['home']);
        
    },
      (error: any) => {
        this.showErrorMessage = true;
        this.errorMessage = error.message;
        console.log(error.message)
    }
    )
  }

}
