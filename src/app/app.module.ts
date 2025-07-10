import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './Layouts/navbar/navbar.component';
import { FooterComponent } from './Layouts/footer/footer.component';
import { MainlayoutComponent } from './Layouts/mainlayout/mainlayout.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { ForgetpasswordComponent } from './Components/Auth/forgetpassword/forgetpassword.component';
import { SidebarComponent } from './Layouts/sidebar/sidebar.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { TasksComponent } from './Components/task/tasks/tasks.component';
import { AddUserComponent } from './Components/Users/list-user/list-user.component';
import { PowersComponent } from './Components/Users/powers/powers.component';
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
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DetailsTaskComponent } from './Components/task/details-task/details-task.component';
import { CreatePowersComponent } from './Components/Users/create-powers/create-powers.component';
import { DetailsForonetaskComponent } from './Components/task/details-foronetask/details-foronetask.component';
import { CreateUserComponent } from './Components/Users/create-user/create-user.component';
import { CreateSiteComponent } from './Components/Site/create-site/create-site.component';
import { CreateGroupComponent } from './Components/Groups/create-group/create-group.component';
import { FormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainlayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    SidebarComponent,
    BlankLayoutComponent,
    TasksComponent,
    AddUserComponent,
    PowersComponent,
    ReportComponent,
    ObjectionsComponent,
    QuestionRatingReportsComponent,
    RatingsComponent,
    SitesComponent,
    MainGroupComponent,
    SubgroupComponent,
    AddQuestionComponent,
    QuestionScoreComponent,
    ImportQuestionsComponent,
    SettingsComponent,
    DetailsTaskComponent,
    CreatePowersComponent,
    DetailsForonetaskComponent,
    CreateUserComponent,
    CreateSiteComponent,
    CreateGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
