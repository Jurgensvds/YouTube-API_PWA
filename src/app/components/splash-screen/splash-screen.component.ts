import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  @Output() removeSplash: EventEmitter<boolean> = new EventEmitter();

  animationPlayed: boolean = false;
  destroy: boolean = false;

  options: AnimationOptions = {
    loop: false,
    autoplay: false,
    path: '/assets/lottie-files/splash-screen.json',
  };

  animationItem: AnimationItem | undefined;

  constructor() { }

  ngOnInit(): void {
    this.backupRemove();
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    setTimeout(() => {
      this.animationItem?.play()
    }, 1000);
  }

  animationDone(){
    setTimeout(() => {
      this.removeSplash.emit(true);
    },1000);
  }

  ngOnDestroy(): void {
    this.destroy = true;
  }

  backupRemove(){
    setTimeout(() => {
      if(!this.destroy){
        this.removeSplash.emit(true);
      }
    }, 5000)
  }
}
