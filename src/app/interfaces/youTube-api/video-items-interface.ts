/**
 * VideoItem Interface for @interface Videos
 */

type VideoItemTypes = 'kind' | 'etag' | 'id' | 'snippet';

interface VideoItemInterface{
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet
}

export class VideoItem{
    kind: string = '';
    etag: string = '';
    id: string = '';
    snippet: Snippet = new Snippet();

    constructor(newPageInfo?: VideoItemInterface){
        this.kind = this.assignVariable('kind', newPageInfo, this.kind);
        this.etag = this.assignVariable('etag', newPageInfo, this.etag);
        this.id = this.assignVariable('id', newPageInfo, this.id);
        this.snippet = new Snippet(this.assignVariable('id', newPageInfo, this.id));
    }

    private assignVariable(key:VideoItemTypes, object:VideoItemInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }
 }

/**
 * Snippet Interface for @interface VideoItem
 */

 type SnippetTypes = 'publishedAt' | 'channelId' | 'title' | 'description' | 'thumbnails' | 'channelTitle' | 'categoryId' | 'liveBroadcastContent' | 'localized';

 interface SnippetInterface{
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
        standard: Thumbnail;
        maxres: Thumbnail;
    }
    channelTitle: string;
    categoryId: string;
    liveBroadcastContent: 'live' | 'none' | 'upcoming';
    localized: Localized;
 }

 export class Snippet{
    publishedAt: string = '';
    channelId: string = '';
    title: string = '';
    description: string = '';
    thumbnails: {
        default: Thumbnail,
        medium: Thumbnail,
        high: Thumbnail,
        standard: Thumbnail,
        maxres: Thumbnail,
    } = {
        default: new Thumbnail(), 
        medium: new Thumbnail(), 
        high: new Thumbnail(), 
        standard: new Thumbnail(), 
        maxres: new Thumbnail
    };
    channelTitle: string = '';
    categoryId: string = '';
    liveBroadcastContent: 'live' | 'none' | 'upcoming' = 'none';
    localized: Localized = new Localized();

    constructor(newPageInfo?: SnippetInterface){
        this.publishedAt = this.assignVariable('publishedAt', newPageInfo, this.publishedAt);
        this.channelId = this.assignVariable('channelId', newPageInfo, this.channelId);
        this.title = this.assignVariable('title', newPageInfo, this.title);
        this.description = this.assignVariable('description', newPageInfo, this.description);
        this.thumbnails = {...this.assignVariable('thumbnails', newPageInfo, this.thumbnails)};
        this.channelTitle = this.assignVariable('channelTitle', newPageInfo, this.channelTitle);
        this.categoryId = this.assignVariable('categoryId', newPageInfo, this.categoryId);
        this.liveBroadcastContent = this.assignVariable('liveBroadcastContent', newPageInfo, this.liveBroadcastContent);
        this.localized = new Localized(this.assignVariable('localized', newPageInfo, this.localized));
    }

    private assignVariable(key:SnippetTypes, object:SnippetInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }
 }

/**
 * Thumbnail Interface for @interface Snippet
 */

 type ThumbnailTypes = 'url' | 'width' | 'height';

 interface ThumbnailInterface{
     url: string;
     width: number;
     height: number;
 }

 export class Thumbnail{
    url: string = '';
    width: number = 0;
    height: number = 0;

    constructor(newPageInfo?: ThumbnailInterface){
        this.url = this.assignVariable('url', newPageInfo, this.url);
        this.width = this.assignVariable('width', newPageInfo, this.width);
        this.height = this.assignVariable('height', newPageInfo, this.height);
    }

    private assignVariable(key:ThumbnailTypes, object:ThumbnailInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }
 }

/**
 * Localized Interface for @interface Snippet
 */

type LocalizedTypes = 'title' | 'description';

interface LocalizedInterface{
    title: string;
    description: string;
}

export class Localized{
    title: string = '';
    description: string = '';

    constructor(newPageInfo?: LocalizedInterface){
        this.title = this.assignVariable('title', newPageInfo, this.title);
        this.description = this.assignVariable('description', newPageInfo, this.description);
    }

    private assignVariable(key:LocalizedTypes, object:LocalizedInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }
}