import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { VideoSearch } from '@interfaces/youTube-api/videos-interface';
import { HeaderNavService } from '@services/headerNav/header-nav.service';
import { ScreenService } from '@services/screen/screen.service';
import { TabNavService } from '@services/tabNav/tab-nav.service';
import { YouTubeService } from '@services/youTube/you-tube.service';

type navTabs = 'history' | 'home' | 'favourites';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  animations: [
    trigger(
      'outAnimation', 
      [
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('300ms ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class TabsComponent implements OnInit {

  loaded:boolean = false;
  showSplash:boolean = true;

  constructor(
    public tabNav: TabNavService,
    public headerService: HeaderNavService,
    public screenService: ScreenService
  ) { }

  async ngOnInit() {
    // this.youTubeService.getVideosBySearch('funny').then((val) => {
    //   console.log(new VideoSearch(val));
    // }).catch((err) => {
    //   console.log("Err", err.er)
    // })
  }

  setNav(selectedTab: navTabs){
    this.headerService.searchButton = selectedTab === 'home' ? true : false;
    this.tabNav.activeTab = selectedTab
  }

  splashDone(){
    this.showSplash = false;
  }

}
