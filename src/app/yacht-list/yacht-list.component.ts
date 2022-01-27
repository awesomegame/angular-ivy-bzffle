import { Component, OnInit } from '@angular/core';
import { yachts } from '../yachts';

@Component({
  selector: 'app-yacht-list',
  templateUrl: './yacht-list.component.html',
  styleUrls: ['./yacht-list.component.css'],
})
export class YachtListComponent {
  yachts = yachts;

  constructor() {}

  ngOnInit() {}
}
