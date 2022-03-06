import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  clients;

  constructor(private http: HttpClient) {
    this.getClients();
  }

  getClients() {
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

  addClient(client, cb) {
    const headers = { 'content-type': 'application/json' };
    var id = 1;
    if (this.clients.length > 0)
      id =
        this.clients
          .map((it) => parseInt(it.id))
          .reduce((a, b) => (a > b ? a : b)) + 1;

    const body = JSON.stringify({
      id: id.toString(),
      name: client.name,
    });

    this.http
      .post(
        'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/addOwner',
        body,
        { headers: headers }
      )
      .subscribe((data) => {
        this.clients.push(JSON.parse(data['body']));
        cb();
      });
  }
}
