import { Component, ElementRef, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent {
  @Output() sendTopicList: EventEmitter<any[]> = new EventEmitter<any[]>();
  topicList: any[] = [];
  topicName: string = '';


  constructor(){ }



  addTopic(){
    if(this.topicName == '') return;

    this.topicList.push(this.topicName);
    this.topicName = '';

    this.sendTopicList.emit(this.topicList);
  }
}
