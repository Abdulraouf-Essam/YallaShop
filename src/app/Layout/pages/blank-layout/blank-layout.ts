import { Component } from '@angular/core';
import { Navbar } from '../../../Shared/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.scss',
})
export class BlankLayout {}
