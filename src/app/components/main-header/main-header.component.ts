import { Component, OnInit } from '@angular/core';
import { HeaderNavService } from '@services/headerNav/header-nav.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(public headerService: HeaderNavService) { }

  ngOnInit(): void {
  }

}
