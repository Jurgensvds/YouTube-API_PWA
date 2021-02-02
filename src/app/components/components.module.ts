import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MatIconModule } from '@angular/material/icon';

const componentsList = [
  MainHeaderComponent
]

const materialModules = [
  MatIconModule
]

@NgModule({
  declarations: [...componentsList],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports:[...componentsList]
})
export class ComponentsModule { }
