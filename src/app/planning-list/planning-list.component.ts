import { ActivatedRoute } from '@angular/router';
import { yachts } from '../yachts';
import { jobs } from '../jobs';
import { serviceTypes } from '../service-types';
import { services } from '../services';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planning-list',
  templateUrl: './planning-list.component.html',
  styleUrls: ['./planning-list.component.css'],
})
export class PlanningListComponent implements OnInit {
  yachts = yachts;
  serviceTypes = serviceTypes;
  services = services;
  plans = [];
  nextDay = undefined;
  nextDayPath = undefined;
  prevDay = undefined;
  prevDayPath = undefined;
  month = 0;
  day = 0;
  year = 0;
  ts = 0;
  mode = 'planning';
  jobs = [];

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      var d = new Date();
      console.log(params);
      if (params.month !== undefined) {
        this.month = params.month;
        this.day = params.day;
        this.year = params.year;
      } else {
        this.month = d.getMonth() + 1;
        this.day = d.getDate();
        this.year = d.getFullYear();
      }

      d.setMonth(this.month - 1);
      d.setDate(this.day);
      d.setFullYear(this.year);
      this.ts = d.valueOf();
      if (this.ts < Date.now()) this.mode = 'history';
      d.setDate(d.getDate() + 1);

      this.nextDayPath =
        d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
      this.nextDay =
        ('0' + d.getDate()).slice(-2) +
        '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '-' +
        d.getFullYear();

      d.setDate(d.getDate() - 2);
      this.prevDayPath =
        d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
      this.prevDay =
        ('0' + d.getDate()).slice(-2) +
        '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '-' +
        d.getFullYear();
    });

    services.forEach((service) => {
      var yacht = yachts.find((y) => y.id == service.yahctId);
      var serviceType = serviceTypes.find((st) => st.id == service.serviceType);

      if (service.lastDate !== undefined) {
        var d1 = new Date(service.lastDate);
        var d2 = this.ts;
        var diff;
        if (service.recurrence !== undefined)
          diff =
            Math.round((d2 - d1.getTime()) / 86400000) - service.recurrence;
        else diff = -100;
        this.plans.push({
          yacht: yacht,
          serviceType: serviceType.name,
          lastDate: service.lastDate,
          priority: diff,
          class: diff > 0 ? 'alert' : 'ok',
        });
      } else {
        this.plans.push({
          yacht: yacht,
          serviceType: serviceType.name,
          priority: 100,
          class: 'unknown',
        });
      }
    });
    this.plans.sort((a, b) => (a.priority < b.priority ? 1 : -1));

    this.jobs = jobs.filter(
      (job) =>
        job.date ==
        this.year +
          '-' +
          ('0' + this.month).slice(-2) +
          '-' +
          ('0' + this.day).slice(-2)
    );
    this.jobs.forEach(
      (job) =>
        (job.priceTotal = job.price.map((p) => p.price).reduce((a, b) => a + b))
    );
  }

  ngOnInit() {}
}
