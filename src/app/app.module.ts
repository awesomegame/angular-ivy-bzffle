import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { YachtListComponent } from './yacht-list/yacht-list.component';
import { YachtDetailsComponent } from './yacht-details/yacht-details.component';
import { PlanningListComponent } from './planning-list/planning-list.component';
import { PlanningDetailsComponent } from './planning-details/planning-details.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';

import { DataService } from './data.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: JobListComponent },
      { path: 'yachts', component: YachtListComponent },
      { path: 'yachts/:shipId', component: YachtDetailsComponent },
      { path: 'planning', component: PlanningListComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/:clientId', component: ClientsDetailsComponent },
      {
        path: 'planning/:month/:day/:year',
        component: PlanningListComponent,
      },
    ]),
  ],
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientsDetailsComponent,
    YachtListComponent,
    JobListComponent,
    YachtDetailsComponent,
    PlanningListComponent,
    PlanningDetailsComponent,
  ],
  bootstrap: [AppComponent],
  providers: [DataService],
})
export class AppModule {}
