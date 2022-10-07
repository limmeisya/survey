import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExampleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // judul page ngikutin nama component
  pageTitle: String = ExampleComponent.name
    .toString()
    .replace(/([A-Z])/g, ' $1')
    .trim();
}
