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
    this.load();
  }

  ngOnInit() {}
  onSubmit() {}
  load(): void {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify({ id: this.client.id });

    this.http
      .post(
        'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/getClientDetails',
        body,
        { headers: headers, observe: 'body' }
      )
      .subscribe((data) => {
        this.client = JSON.parse(data['body'])[0];
      });
  }
}
