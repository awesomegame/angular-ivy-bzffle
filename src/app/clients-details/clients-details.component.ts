import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css'],
})
export class ClientsDetailsComponent implements OnInit {
  client = { id: 0, name: '', ships: [] };
  shipForm = this.formBuilder.group({
    name: '',
    dock: '',
    size: '',
    description: '',
  });
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public data: DataService
  ) {
    this.data.subscribe(this);
  }

  onDataReady() {
    this.route.params.subscribe((param) => {
      this.client = this.data.getClient(param.clientId);
    });
  }
  ngOnInit() {}
  onSubmit() {
    var ship = this.shipForm.value;
    ship.clientId = this.client.id;
    this.data.addShip(ship, () => {
      this.shipForm = this.formBuilder.group({
        name: '',
        dock: '',
        size: '',
        description: '',
      });
    });
  }
}
