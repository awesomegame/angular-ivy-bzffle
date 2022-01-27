import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { YachtListComponent } from './yacht-list/yacht-list.component';
import { YachtDetailsComponent } from './yacht-details/yacht-details.component';
import { PlanningListComponent } from './planning-list/planning-list.component';
import { PlanningDetailsComponent } from './planning-details/planning-details.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: JobListComponent },
      { path: 'yachts', component: YachtListComponent },
      { path: 'yachts/:yachtId', component: YachtDetailsComponent },
      { path: 'planning', component: PlanningListComponent },
      {
        path: 'planning/:month/:day/:year',
        component: PlanningListComponent,
      },
    ]),
  ],
  declarations: [
    AppComponent,
    YachtListComponent,
    JobListComponent,
    YachtDetailsComponent,
    PlanningListComponent,
    PlanningDetailsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
