import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { VideoSearch } from '@interfaces/youTube-api/videos-interface';
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
    private youTubeService: YouTubeService,
    public tabNav: TabNavService
  ) { }

  async ngOnInit() {
    // this.youTubeService.getVideosBySearch('funny').then((val) => {
    //   console.log(new VideoSearch(val));
    // }).catch((err) => {
    //   console.log("Err", err.er)
    // })
  }

  setNav(selectedTab: navTabs){
    this.tabNav.activeTab = selectedTab
  }

  splashDone(){
    this.showSplash = false;
  }

}
