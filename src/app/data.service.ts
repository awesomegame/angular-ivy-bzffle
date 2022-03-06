import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  private _clients = [];

  constructor(private http: HttpClient) {}

  getClients() {
    if (this._clients.length == 0) {
      const headers = { 'content-type': 'application/json' };
      const body = '{}';

      this.http
        .post(
          'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/getOwners',
          body,
          { headers: headers, observe: 'body' }
        )
        .subscribe((data) => {
          this._clients = JSON.parse(data['body']);
        });
    }
    return this._clients;
  }
}
