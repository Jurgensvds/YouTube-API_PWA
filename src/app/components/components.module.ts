import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MatIconModule } from '@angular/material/icon';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MainVideoViewerComponent } from './main-video-viewer/main-video-viewer.component';

export function playerFactory() {
  return player;
}

const componentsList = [
  MainHeaderComponent,
  SplashScreenComponent
]

const materialModules = [
  MatIconModule
]

@NgModule({
  declarations: [...componentsList, MainVideoViewerComponent],
  imports: [
    CommonModule,
    LottieModule.forRoot({ player: playerFactory }),
    ...materialModules
  ],
  exports:[...componentsList]
})
export class ComponentsModule { }
