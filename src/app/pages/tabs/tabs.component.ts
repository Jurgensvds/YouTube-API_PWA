import { Component, OnInit } from '@angular/core';
import { VideoSearch } from '@interfaces/youTube-api/videos-interface';
import { TabNavService } from '@services/tabNav/tab-nav.service';
import { YouTubeService } from '@services/youTube/you-tube.service';

type navTabs = 'history' | 'home' | 'favourites';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

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

}
