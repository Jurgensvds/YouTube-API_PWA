import { PageInfo } from '@interfaces/youTube-api/page-info-interface'
import { VideoItem, VideoSearchItem } from '@interfaces/youTube-api/video-items-interface';

/**
 * Video list interface
 */

type VideosTypes = 'kind' | 'nextPageToken' | 'etag' | 'items' | 'pageInfo';

interface VideosInterface{
    kind: string;
    etag: string;
    nextPageToken: string;
    items: VideoItem[];
    pageInfo: PageInfo
}

export class Videos{
    kind: string = '';
    etag: string = '';
    nextPageToken: string = '';
    items: VideoItem[] = [];
    pageInfo: PageInfo = new PageInfo();

    constructor(newPageInfo?: VideosInterface){
        this.kind = this.assignVariable('kind', newPageInfo, this.kind);
        this.etag = this.assignVariable('etag', newPageInfo, this.etag);
        this.nextPageToken = this.assignVariable('nextPageToken', newPageInfo, this.nextPageToken);
        this.items = [...this.assignVariable('items', newPageInfo, this.items)];
        this.pageInfo = new PageInfo(this.assignVariable('pageInfo', newPageInfo, this.pageInfo));
    }

    private assignVariable(key:VideosTypes, object:VideosInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }
 }

/**
 * Search result interface
 */

 type VideoSearchTypes = 'kind' | 'etag' | 'nextPageToken' | 'regionCode' | 'items' | 'pageInfo';

 interface VideoSearchInterface{
     kind: string;
     etag: string;
     nextPageToken: string;
     regionCode:string;
     items: VideoSearchItem[];
     pageInfo: PageInfo
 }
 
 export class VideoSearch{
     kind: string = '';
     etag: string = '';
     nextPageToken: string = '';
     regionCode: string = '';
     items: VideoSearchItem[] = [];
     pageInfo: PageInfo = new PageInfo();
 
     constructor(newPageInfo?: VideoSearchInterface){
         this.kind = this.assignVariable('kind', newPageInfo, this.kind);
         this.etag = this.assignVariable('etag', newPageInfo, this.etag);
         this.nextPageToken = this.assignVariable('nextPageToken', newPageInfo, this.nextPageToken);
         this.regionCode = this.assignVariable('regionCode', newPageInfo, this.regionCode);
         this.items = [...this.assignVariable('items', newPageInfo, this.items)];
         this.pageInfo = new PageInfo(this.assignVariable('pageInfo', newPageInfo, this.pageInfo));
     }
 
     private assignVariable(key:VideoSearchTypes, object:VideoSearchInterface | undefined, defaultVal: any){
         return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
     }
  }