import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './authGuard';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomComponent } from './room/room.component';
import { AddQuestionPageComponent } from './add-question-page/add-question-page.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuizComponent } from './quiz/quiz.component';
import { GradeComponent } from './grade/grade.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: HeroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'create-room', component: CreateRoomComponent, canActivate: [AuthGuard]},
  {path: 'join-room', component: JoinRoomComponent, canActivate: [AuthGuard]},
  {path: 'room/:key', component: RoomComponent, canActivate: [AuthGuard]},
  {path: 'question/:key/:number', component: AddQuestionPageComponent},
  {path: 'room/:key/question/:number', component: AddQuestionComponent, canActivate: [AuthGuard]},
  {path: 'quiz/:key', component: QuizComponent, canActivate: [AuthGuard]},
  {path: 'grade/:key', component: GradeComponent, canActivate: [AuthGuard]},
  {path: 'statistics/:key', component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: 'statistics/:roomKey/:roomName/user/:username', component: UserStatisticsComponent, canActivate: [AuthGuard]},
  {path: '**', component: HeroComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
