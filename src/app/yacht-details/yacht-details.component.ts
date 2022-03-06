import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-yacht-details',
  templateUrl: './yacht-details.component.html',
  styleUrls: ['./yacht-details.component.css'],
})
export class YachtDetailsComponent implements OnInit {
  selectedService = [];
  ship = { name: '', dock: '', description: '', size: '', services: [] };

  shipForm = this.formBuilder.group({
    services: new FormArray([]),
  });

  get formServices() {
    return this.shipForm.controls.services as FormArray;
  }

  get formRecurrencies() {
    return this.shipForm.controls.recurrencies as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public data: DataService
  ) {
    this.data.subscribe(this);
  }

  onDataReady() {
    this.route.params.subscribe((param) => {
      this.ship = this.data.ships.find((ship) => ship.id == param.shipId);
      if (this.ship.services == undefined) {
        this.ship.services = [];
        this.data.services.forEach((srv, idx) => {
          this.ship.services[idx] = { id: srv.id, period: undefined };
        });
      }
      this.data.services.forEach((srv, idx) => {
        this.formServices.push(new FormControl(false));
        var s = this.ship.services.find((it) => it.id == srv.id);
        this.selectedService[idx] = s == undefined ? undefined : s.period;
      });
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.selectedService.forEach(
      (s, idx) => (this.ship.services[idx].period = s)
    );
    this.data.saveShip(this.ship);
  }
}
