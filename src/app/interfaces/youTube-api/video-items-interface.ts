/**
 * VideoItem Interface for @interface Videos
 */

import { ChannelDetails } from "./channel-details-interface";

type VideoItemTypes = 'kind' | 'etag' | 'id' | 'active' | 'player' | 'snippet' | 'statistics' | 'contentDetails' | 'channelDetails';

interface VideoItemInterface{
    kind: string;
    etag: string;
    id: string;
    active: boolean;
    player: {embedHtml:string};
    snippet: Snippet;
    statistics: Statistics;
    contentDetails: ContentDetails;
    channelDetails?: ChannelDetails;
}

export class VideoItem{
    kind: string = '';
    etag: string = '';
    id: string = '';
    active: boolean = true;
    player: {embedHtml:string} = {embedHtml:''};
    snippet: Snippet = new Snippet();
    statistics: Statistics = new Statistics();
    contentDetails: ContentDetails = new ContentDetails();
    channelDetails?: ChannelDetails = new ChannelDetails();

    constructor(newPageInfo?: VideoItemInterface){
        this.kind = this.assignVariable('kind', newPageInfo, this.kind);
        this.etag = this.assignVariable('etag', newPageInfo, this.etag);
        this.id = this.assignVariable('id', newPageInfo, this.id);
        this.active = this.assignVariable('active', newPageInfo, this.active);
        this.player = {...this.assignVariable('player', newPageInfo, this.player)};
        this.snippet = new Snippet(this.assignVariable('snippet', newPageInfo, this.snippet));
        this.statistics = new Statistics(this.assignVariable('statistics', newPageInfo, this.statistics));
        this.contentDetails = new ContentDetails(this.assignVariable('contentDetails', newPageInfo, this.contentDetails));
        this.channelDetails = new ChannelDetails(this.assignVariable('channelDetails', newPageInfo, this.channelDetails));
    }

    private assignVariable(key:VideoItemTypes, object:VideoItemInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }

    getVideoUrl(){
        return `https://www.youtube.com/watch?v=${this.id}`
    }

    getThumbnail(size:number = 5){
        const t = this.snippet.thumbnails;
        return (
            (t.maxres && t.maxres.url !== '') && size === 5 ? t.maxres.url :
            (t.standard && t.standard.url !== '') && size >= 4 ? t.standard.url :
            (t.high && t.high.url !== '') && size >= 3 ? t.high.url :
            (t.medium && t.medium.url !== '') && size >= 2 ? t.medium.url :
            (t.default && t.default.url !== '') && size >= 1 ? t.default.url : '../../../assets/mainLogo.svg'
        );
    }
 }

 /**
 * VideoItem Interface for @interface VideoSearch
 */

type VideoSearchItemTypes = 'kind' | 'etag' | 'id' | 'player' | 'snippet' | 'statistics' | 'contentDetails';

interface VideoSearchInterface{
    kind: string;
    etag: string;
    id: {kind:string, videoId:string};
    player: {embedHtml:string};
    snippet: Snippet;
    statistics: Statistics;
    contentDetails: ContentDetails;
}

export class VideoSearchItem{
    kind: string = '';
    etag: string = '';
    id: {kind:string, videoId:string} = {kind:'', videoId:''};
    player: {embedHtml:string} = {embedHtml:''};
    snippet: Snippet = new Snippet();
    statistics: Statistics = new Statistics();
    contentDetails: ContentDetails = new ContentDetails();

    constructor(newPageInfo?: VideoSearchInterface){
        this.kind = this.assignVariable('kind', newPageInfo, this.kind);
        this.etag = this.assignVariable('etag', newPageInfo, this.etag);
        this.id = {...this.assignVariable('id', newPageInfo, this.id)};
        this.player = {...this.assignVariable('player', newPageInfo, this.player)};
        this.snippet = new Snippet(this.assignVariable('snippet', newPageInfo, this.snippet));
        this.statistics = new Statistics(this.assignVariable('statistics', newPageInfo, this.statistics));
        this.contentDetails = new ContentDetails(this.assignVariable('contentDetails', newPageInfo, this.contentDetails));
    }

    private assignVariable(key:VideoSearchItemTypes, object:VideoSearchInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }

    getVideoUrl(){
        return `https://www.youtube.com/watch?v=${this.id.videoId}`
    }
 }

/**
 * Snippet Interface for @interface VideoItem
 */

 type SnippetTypes = 'publishedAt' | 'channelId' | 'title' | 'description' | 'thumbnails' | 'channelTitle' | 'categoryId' | 'tags' | 'liveBroadcastContent' | 'localized';

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
    tags: string;
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
        maxres: new Thumbnail()
    };
    channelTitle: string = '';
    categoryId: string = '';
    tags: string = ''
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
        this.tags = this.assignVariable('tags', newPageInfo, this.tags);
        this.liveBroadcastContent = this.assignVariable('liveBroadcastContent', newPageInfo, this.liveBroadcastContent);
        this.localized = new Localized(this.assignVariable('localized', newPageInfo, this.localized));
    }

    private assignVariable(key:SnippetTypes, object:SnippetInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }
 }

 /**
 * Statistics Interface for @interface VideoItem
 */

type StatisticsTypes = 'viewCount' | 'likeCount' | 'dislikeCount' | 'favoriteCount' | 'commentCount';

interface StatisticsInterface{
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
}

export class Statistics{
    viewCount: string = '';
    likeCount: string = '';
    dislikeCount: string = '';
    favoriteCount: string = '';
    commentCount: string = '';

    constructor(newPageInfo?: StatisticsInterface){
        this.viewCount = this.assignVariable('viewCount', newPageInfo, this.viewCount);
        this.likeCount = this.assignVariable('likeCount', newPageInfo, this.likeCount);
        this.dislikeCount = this.assignVariable('dislikeCount', newPageInfo, this.dislikeCount);
        this.favoriteCount = this.assignVariable('favoriteCount', newPageInfo, this.favoriteCount);
        this.commentCount = this.assignVariable('commentCount', newPageInfo, this.commentCount);
    }

    private assignVariable(key:StatisticsTypes, object:StatisticsInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }
}

/**
 * Statistics Interface for @interface VideoItem
 */

type ContentDetailsTypes = 'duration' | 'dimension' | 'definition';

interface ContentDetailsInterface{
    duration: string;
    dimension: string;
    definition: string;
}

export class ContentDetails{
    duration: string = '';
    dimension: string = '';
    definition: string = '';

    constructor(newPageInfo?: ContentDetailsInterface){
        this.duration = this.assignVariable('duration', newPageInfo, this.duration);
        this.dimension = this.assignVariable('dimension', newPageInfo, this.dimension);
        this.definition = this.assignVariable('definition', newPageInfo, this.definition);
    }

    private assignVariable(key:ContentDetailsTypes, object:ContentDetailsInterface | undefined, defaultVal: any){
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