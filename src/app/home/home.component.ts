import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicRooms: any[] = [];

  constructor(public router: Router, private roomService: RoomService) { }

  

  ngOnInit(): void {
    this.roomService.getPublicRooms(0).subscribe(
      (response: any) => {
        for(let i=0; i<response.content.length; i++){
          this.publicRooms.push(response.content[i]);
        }      
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  

}
