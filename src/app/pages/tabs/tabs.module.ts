import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import { HomeTabComponent } from './home-tab/home-tab.component';
import { FavouritesTabComponent } from './favourites-tab/favourites-tab.component';
import { HistoryTabComponent } from './history-tab/history-tab.component';
import { ComponentsModule } from '@components/components.module';


@NgModule({
  declarations: [TabsComponent, HomeTabComponent, FavouritesTabComponent, HistoryTabComponent],
  imports: [
    CommonModule,
    TabsRoutingModule,
    ComponentsModule
  ]
})
export class TabsModule { }
