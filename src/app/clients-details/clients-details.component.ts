import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) {
    this.route.params.subscribe((param) => {
      this.client.id = param.clientId;
    });
  }

  ngOnInit() {}
  onSubmit() {}
}
