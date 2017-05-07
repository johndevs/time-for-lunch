import { Component, OnInit } from '@angular/core';
import {Gravatar} from 'ng2-gravatar-directive';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  email: 'john@ahlroos.me';

  constructor() { }

  ngOnInit() {
  }

}
