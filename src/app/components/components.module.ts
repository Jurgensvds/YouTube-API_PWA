import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MatIconModule } from '@angular/material/icon';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MainVideoViewerComponent } from './main-video-viewer/main-video-viewer.component';
import { FormatViews } from '../pipes/formatNumber';

export function playerFactory() {
  return player;
}

const componentsList = [
  MainHeaderComponent,
  SplashScreenComponent, 
  MainVideoViewerComponent,
  FormatViews
]

const materialModules = [
  MatIconModule
]

@NgModule({
  declarations: [...componentsList],
  imports: [
    CommonModule,
    LottieModule.forRoot({ player: playerFactory }),
    ...materialModules
  ],
  exports:[...componentsList],
  providers:[DecimalPipe]
})
export class ComponentsModule { }
