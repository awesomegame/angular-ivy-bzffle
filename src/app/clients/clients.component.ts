import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clientForm = this.formBuilder.group({
    name: '',
  });
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {}
  onSubmit(): void {
    var params = {params: new HttpParams().set("id", 5)}
      this.http.post(
        'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/addOwner',
        params
      );
  }
}
