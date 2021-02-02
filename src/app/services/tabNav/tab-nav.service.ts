import { Injectable } from '@angular/core';

type navTabs = 'history' | 'home' | 'favourites';

@Injectable({
  providedIn: 'root'
})
export class TabNavService {

  private static _activeTab: navTabs = 'home';

  constructor() { }

  set activeTab(tab: navTabs){
    TabNavService._activeTab = tab;
  }

  get activeTab():navTabs{
    return TabNavService._activeTab;
  }

  resetNav(){
    this.activeTab = 'home';
  }
}
