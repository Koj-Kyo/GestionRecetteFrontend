import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: false,
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  constructor(protected router: Router) {}
}
