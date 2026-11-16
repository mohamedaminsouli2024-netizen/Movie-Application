import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBar } from './components/head-bar/head-bar';

@Component({
  selector: 'app-root',
  imports: [HeadBar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}