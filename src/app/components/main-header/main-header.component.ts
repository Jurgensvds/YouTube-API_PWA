import { animate, group, sequence, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderNavService } from '@services/headerNav/header-nav.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  animations: [
    trigger(
    'searchBox', 
    [
      transition(
        ':enter', 
        [
          style({ opacity: 0, width: '20px', transform: 'rotateX(90deg)'}),
          sequence([
            animate('100ms ease-out', style({ opacity: 1, transform: 'rotateX(0deg)'})),
            animate('100ms ease-in', style({ width:'75%'}))
          ])
        ]
      ),
      transition(
        ':leave', 
        [
          style({ width:'75%',opacity: 1, transform: 'rotateX(0deg)' }),
          sequence([
            animate('100ms ease-out', style({ width: '20px' })),
            animate('100ms ease-in', style({ transform: 'rotateX(90deg)'}))
          ])
          
        ]
      )
    ]
  )]
})
export class MainHeaderComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>

  searchOpen:boolean = false;

  constructor(
    public headerService: HeaderNavService
  ) { }

  ngOnInit(): void {
  }

  onKeydown(event:any){
    if(event.key === "Enter"){
      this.doSearch(event.target.value)
    }
  }

  toggleSearchBar(){
    this.searchOpen = !this.searchOpen
  }

  searchButtonClicked(input: ElementRef){
    this.doSearch(input.nativeElement.value)
  }

  doSearch(searchText:string){
    this.headerService.executeSearch(searchText)
  }
}
