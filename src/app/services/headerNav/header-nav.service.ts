import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderNavService {

  private static _showBackButton: boolean = false;
  private static _showSearchButton: boolean = true;

  backExecute: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchResult: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  set showBackButton(val: boolean){
    HeaderNavService._showBackButton = val;
  }

  get showBackButton(){
    return HeaderNavService._showBackButton;
  }

  set searchButton(val: any){
    HeaderNavService._showSearchButton = val;
  }

  get searchButton(){
    return HeaderNavService._showSearchButton;
  }

  buttonClicked(){
    this.backExecute.next(true);
    this.showBackButton = false;
  }

  executeSearch(searchString: string){
    if(searchString !== ''){
      this.searchResult.next(searchString)
    }
  }
}
