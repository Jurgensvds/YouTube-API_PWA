import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader/loader.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss']
})
export class GlobalLoaderComponent implements OnInit {

  constructor(
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

}
