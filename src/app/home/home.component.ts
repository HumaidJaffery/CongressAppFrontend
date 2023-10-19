import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicRooms: any[] = [];
  currPage = 0;
  isNextPage: any;
  keyword: any = "";
  noRoomsFound = false;
  firstTimeSearch = true;

  constructor(public router: Router, private roomService: RoomService, private route: ActivatedRoute) { }

  

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        if(params.get('keyword') != null){
          this.keyword = params.get('keyword');
          console.log(this.keyword);
          this.searchPublicRooms(0)
        } else {
          this.getPublicRooms();
        }
      })
  }

  getPublicRooms(){
    this.publicRooms = [];
    this.roomService.getPublicRooms(this.currPage).subscribe(
      (response: any) => {
        for(let i=0; i<response.content.length; i++){
          this.publicRooms.push(response.content[i]);
        }
        this.isNextPage = !response.last;    
        if(this.publicRooms.length == 0) this.noRoomsFound = true;
        else this.noRoomsFound = false;
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  searchPublicRooms(page: number){
    this.publicRooms = [];
    this.roomService.searchPublicRooms(page, this.keyword).subscribe(
      (response: any) => {
        for(let i=0; i<response.content.length; i++){
          this.publicRooms.push(response.content[i]);
        }
        this.isNextPage = !response.last;
        if(this.publicRooms.length == 0) this.noRoomsFound = true;
        else this.noRoomsFound = false;
      }, (error: any) => {
        console.log(error);
      }
      )
  }

  nextPage(){
    this.currPage++;

    if(this.keyword.equals("")){
      if(!this.firstTimeSearch) this.currPage = 0;
      this.getPublicRooms();
    } else {
      if(this.firstTimeSearch) this.currPage = 0;
      this.searchPublicRooms(this.currPage);
    }
  }

  lastPage(){
    this.currPage--;

    if(this.keyword.equals("")){
      if(!this.firstTimeSearch) this.currPage = 0;
      this.getPublicRooms();
    } else {
      if(this.firstTimeSearch) this.currPage = 0;
      this.searchPublicRooms(this.currPage);
    }
  }

  

}
