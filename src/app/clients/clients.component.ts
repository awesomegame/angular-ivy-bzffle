import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clientForm = this.formBuilder.group({
    name: '',
  });
  constructor(private formBuilder: FormBuilder, public data: DataService) {}

  ngOnInit() {}
  onSubmit(): void {
    this.data.addClient(this.clientForm.value, () => {
      this.clientForm = this.formBuilder.group({
        name: '',
      });
    });
  }
}
