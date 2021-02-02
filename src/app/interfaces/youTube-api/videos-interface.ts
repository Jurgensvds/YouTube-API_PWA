import { PageInfo } from '@interfaces/youTube-api/page-info-interface'
import { VideoItem } from '@interfaces/youTube-api//video-items-interface';

type VideosTypes = 'kind' | 'etag' | 'items' | 'pageInfo';

interface VideosInterface{
    kind: string;
    etag: string;
    items: VideoItem[];
    pageInfo: PageInfo
}

export class Videos{
    kind: string = '';
    etag: string = '';
    items: VideoItem[] = [];
    pageInfo: PageInfo = new PageInfo();

    constructor(newPageInfo?: VideosInterface){
        this.kind = this.assignVariable('kind', newPageInfo, this.kind);
        this.etag = this.assignVariable('etag', newPageInfo, this.etag);
        this.items = [...this.assignVariable('items', newPageInfo, this.items)];
        this.pageInfo = new PageInfo(this.assignVariable('pageInfo', newPageInfo, this.pageInfo));
    }

    private assignVariable(key:VideosTypes, object:VideosInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }
 }