import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderNavService {

  private static _showBackButton: boolean = false;
  backExecute: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  set showBackButton(val: boolean){
    HeaderNavService._showBackButton = val;
  }

  get showBackButton(){
    return HeaderNavService._showBackButton;
  }

  // set backExecute(val: any){
  //   HeaderNavService._showBackButton = val;
  // }

  // get showBackButton(){
  //   return HeaderNavService._showBackButton;
  // }

  buttonClicked(){
    this.backExecute.next(true);
    this.showBackButton = false;
  }
}
