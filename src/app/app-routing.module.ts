import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './authGuard';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {path: '', component: HeroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'create-room', component: CreateRoomComponent, canActivate: [AuthGuard]},
  {path: 'room/:key', component: RoomComponent, canActivate: [AuthGuard]},
  {path: '**', component: HeroComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
