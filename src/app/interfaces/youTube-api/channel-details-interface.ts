import { Thumbnail } from "./video-items-interface";

type ChannelDetailsTypes = 'title' | 'description' | 'subscriberCount' | 'thumbnails';

interface ChannelDetailsInterface{
    title: string;
    description: string;
    subscriberCount: string;
    thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
        standard: Thumbnail;
        maxres: Thumbnail;
    }
}

export class ChannelDetails{
    title: string = '';
    description: string = '';
    subscriberCount: string = '';
    thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
        standard: Thumbnail;
        maxres: Thumbnail;
    } = {
        default: new Thumbnail(), 
        medium: new Thumbnail(), 
        high: new Thumbnail(), 
        standard: new Thumbnail(), 
        maxres: new Thumbnail()
    };

    constructor(newPageInfo?: ChannelDetailsInterface){
        this.title = this.assignVariable('title', newPageInfo, this.title);
        this.description = this.assignVariable('description', newPageInfo, this.description);
        this.subscriberCount = this.assignVariable('subscriberCount', newPageInfo, this.subscriberCount);
        this.thumbnails = {...this.assignVariable('thumbnails', newPageInfo, this.thumbnails)};
    }

    private assignVariable(key:ChannelDetailsTypes, object:ChannelDetailsInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }

    getThumbnail(size:number = 5){
        const t = this.thumbnails;
        return (
            (t.maxres && t.maxres.url !== '') && size === 5 ? t.maxres.url :
            (t.standard && t.standard.url !== '') && size >= 4 ? t.standard.url :
            (t.high && t.high.url !== '') && size >= 3 ? t.high.url :
            (t.medium && t.medium.url !== '') && size >= 2 ? t.medium.url :
            (t.default && t.default.url !== '') && size >= 1 ? t.default.url : '../../../assets/mainLogo.svg'
        );
    }
}