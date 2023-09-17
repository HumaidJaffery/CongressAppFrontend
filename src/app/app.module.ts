import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './hero/hero.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CreateRoomComponent } from './create-room/create-room.component';

import { ColorPickerModule } from 'primeng/colorpicker';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RoomComponent } from './room/room.component';
import { JwtInterceptor } from './jwt.interceptor';
import { AddQuestionComponent } from './add-question/add-question.component';
import { JoinRoomComponent } from './join-room/join-room.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeroComponent,
    SignupComponent,
    CreateRoomComponent,
    AddTopicComponent,
    RoomComponent,
    AddQuestionComponent,
    JoinRoomComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

    ColorPickerModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    CheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
