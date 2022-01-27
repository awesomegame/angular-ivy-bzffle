import { Component, OnInit } from '@angular/core';
import { jobs } from '../jobs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  user = 'אנה';
  jobs = jobs;
  days = [];
  hourThreshold = 70;

  constructor() {
    jobs.forEach((job) => {
      var day = this.days.find((d) => d.date == job.date);
      if (day == undefined) {
        day = {
          date: job.date,
          jobs: [],
        };
        this.days.push(day);
      }

      day.jobs.push(job);
    });

    this.days.forEach(
      (day) =>
        (day.total = day.jobs
          .map((it) => this.getPrice(it))
          .reduce((j, s) => j + s))
    );

    this.days.sort((d1, d2) => (d1.date > d2.date ? -1 : 1));
  }

  ngOnInit() {}

  getPrice(job) {
    return job.price.map((p) => p.price).reduce((p, s) => p + s);
  }

  getUserPrice(jobs, name) {
    return jobs
      .map((job) => job.price.filter((p) => p.name == name))
      .map((p) => p[0].price)
      .reduce((p, s) => p + s);
  }
}
