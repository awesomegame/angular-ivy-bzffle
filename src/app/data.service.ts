import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  clients;
  ships;
  private _isReady = {
    clients: false,
    shipd: false,
    callbacks: [],
    subscribe(cb) {
      this.callbacks.push(cb);
    },
    check(type) {
      this[type] = true;
      if (this.clients && this.ships)
        this.callbacks.forEach((cb) => cb.onDataReady());
    },
  };

  constructor(private http: HttpClient) {
    this.loadClients();
  }

  subscribe(cb) {
    this._isReady.subscribe(cb);
  }

  loadClients() {
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
        this.clients.forEach((client) => (client.ships = []));
        this._isReady.check('clients');
        this.loadShips();
      });
  }

  loadShips() {
    const headers = { 'content-type': 'application/json' };
    const body = '{}';

    this.http
      .post(
        'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/getShips',
        body,
        { headers: headers, observe: 'body' }
      )
      .subscribe((data) => {
        this.ships = JSON.parse(data['body']);
        this.ships.forEach((ship) =>
          this.clients
            .find((client) => client.id == ship.clientId)
            .ships.push(ship)
        );
        this._isReady.check('ships');
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

  addShip(ship, cb) {
    const headers = { 'content-type': 'application/json' };
    var id = 1;
    if (this.ships.length > 0)
      id =
        this.ships
          .map((it) => parseInt(it.id))
          .reduce((a, b) => (a > b ? a : b)) + 1;

    ship.id = id.toString();
    const body = JSON.stringify(ship);

    this.http
      .post(
        'https://8edsojoa99.execute-api.us-east-1.amazonaws.com/prod/addShip',
        body,
        { headers: headers }
      )
      .subscribe((data) => {
        this.ships.push(JSON.parse(data['body']));
        this.clients
          .find((client) => client.id == ship.clientId)
          .ships.push(this.ships.find((it) => it.id == ship.id));
        cb();
      });
  }

  getClient(id) {
    return this.clients.find((it) => it.id == id);
  }
}
