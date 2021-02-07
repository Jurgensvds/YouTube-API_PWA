import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private static _windowWidth:number = 0;

  constructor() { 
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', () => {this.windowWidth = window.innerWidth})
  }

  get windowWidth(){
    return ScreenService._windowWidth;
  }

  set windowWidth(val:number){
    ScreenService._windowWidth = val;
  }
}
