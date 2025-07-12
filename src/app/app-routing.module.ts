import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './Layouts/mainlayout/mainlayout.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { ForgetpasswordComponent } from './Components/Auth/forgetpassword/forgetpassword.component';
import { TasksComponent } from './Components/task/tasks/tasks.component';
import { AddUserComponent } from './Components/Users/list-user/list-user.component';
import { ReportComponent } from './Components/report/report.component';
import { ObjectionsComponent } from './Components/objections/objections.component';
import { QuestionRatingReportsComponent } from './Components/question-rating-reports/question-rating-reports.component';
import { RatingsComponent } from './Components/ratings/ratings.component';
import { SitesComponent } from './Components/Site/sites/sites.component';
import { MainGroupComponent } from './Components/Groups/main-group/main-group.component';
import { SubgroupComponent } from './Components/Groups/subgroup/subgroup.component';
import { AddQuestionComponent } from './Components/Quetions/add-question/add-question.component';
import { QuestionScoreComponent } from './Components/Quetions/question-score/question-score.component';
import { ImportQuestionsComponent } from './Components/Quetions/import-questions/import-questions.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { PowersComponent } from './Components/Users/powers/powers.component';
import { DetailsTaskComponent } from './Components/task/details-task/details-task.component';
import { CreatePowersComponent } from './Components/Users/create-powers/create-powers.component';
import { DetailsForonetaskComponent } from './Components/task/details-foronetask/details-foronetask.component';
import { CreateUserComponent } from './Components/Users/create-user/create-user.component';
import { CreateSiteComponent } from './Components/Site/create-site/create-site.component';
import { CreateGroupComponent } from './Components/Groups/create-group/create-group.component';
import { ConfirmepasswordComponent } from './Components/Auth/confirmepassword/confirmepassword.component';
import { VerifyemailComponent } from './Components/Auth/verifyemail/verifyemail.component';

const routes: Routes = [

  {path: '', component : MainlayoutComponent,
    children: [
      {path : '' , redirectTo: 'login', pathMatch: 'full'},
      {path: 'login' , component: LoginComponent},
      {path: 'register' , component: RegisterComponent},
      {path: 'forgetpassword' , component: ForgetpasswordComponent},
      {path: 'confirmepassword' , component: ConfirmepasswordComponent},
      {path: 'verifyemail' , component: VerifyemailComponent }

    ]
  },

  {path: '', component : BlankLayoutComponent,
    children: [
      {path : '' , redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'tasks', component: TasksComponent },
      {path: 'detailsForonetask', component: DetailsForonetaskComponent },
      {path : 'detailsTask', component: DetailsTaskComponent },
      {path: 'list-user', component: AddUserComponent },
      {path: 'create-user', component: CreateUserComponent },
      {path: 'powers', component: PowersComponent },
      {path: 'createpowers', component: CreatePowersComponent },
      {path: 'report', component: ReportComponent },
      {path: 'objections', component: ObjectionsComponent },
      {path: 'question-rating-reports', component: QuestionRatingReportsComponent },
      {path: 'ratings', component: RatingsComponent },
      {path: 'sites', component: SitesComponent },
      {path: 'create-site', component: CreateSiteComponent },
      {path: 'main-group', component: MainGroupComponent },
      {path: 'create-group', component: CreateGroupComponent },
      {path: 'subgroup', component: SubgroupComponent },
      {path: 'add-question', component: AddQuestionComponent },
      {path: 'question-score', component: QuestionScoreComponent  },
      {path: 'import-questions', component: ImportQuestionsComponent  },
      {path: 'settings', component: SettingsComponent  },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
