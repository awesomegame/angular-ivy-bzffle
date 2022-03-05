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
    const body = JSON.stringify({ id: '6', name: this.clientForm.value.name });
    console.log(body);

    this.http
      .post(
        'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/addOwner',
        body,
        { headers: headers }
      )
      .subscribe((data) => console.log(data));
  }

  load(): void {
    const headers = { 'content-type': 'application/json' };
    const body = '{}';

    this.http
      .post(
        'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/getOwners',
        body,
        { headers: headers }
      )
      .subscribe((data) => {
        console.log(data);
        this.clients = Object.keys(data).map((key) => data[key]);
        console.log(this.clients);
      });
  }
}
