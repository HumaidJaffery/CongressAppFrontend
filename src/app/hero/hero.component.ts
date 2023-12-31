import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  redirectSignup(){
    this.router.navigate(['signup']);
  }

  redirectLogin(){
    this.router.navigate(['login']);
  }

}
