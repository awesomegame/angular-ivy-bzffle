import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clientForm = this.formBuilder.group({
    name: '',
  });
  clients = [];
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }
  onSubmit(): void {
    const headers = { 'content-type': 'application/json' };
    var id =
      parseInt(
        this.clients.map((it) => it.id).reduce((a, b) => (a > b ? a : b))
      ) + 1;

    const body = JSON.stringify({
      id: id.toString(),
      name: this.clientForm.value.name,
    });

    this.http
      .post(
        'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/addOwner',
        body,
        { headers: headers }
      )
      .subscribe((data) => {
        this.load();
        this.clientForm =  this.formBuilder.group({
          name: '',
        });
      });
  }

  load(): void {
    const headers = { 'content-type': 'application/json' };
    const body = '{}';

    this.http
      .post(
        'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/getOwners',
        body,
        { headers: headers, observe: 'body' }
      )
      .subscribe((data) => {
        this.clients = JSON.parse(data['body']);
      });
  }
}
