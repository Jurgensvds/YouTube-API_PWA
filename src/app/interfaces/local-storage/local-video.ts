type LocalVideoTypes = 'videoID' | 'actionDate';

interface LocalVideoInterface{
    videoID: string;
    actionDate: string;
}

export class LocalVideo{
    videoID: string = '';
    actionDate: string = '';

    constructor(newVid?:LocalVideoInterface){
        this.videoID = this.assignVariable('videoID', newVid, this.videoID);
        this.actionDate = this.assignVariable('actionDate', newVid, this.actionDate);
    }

    private assignVariable(key:LocalVideoTypes, object:LocalVideoInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }

    toJson(){
        return ({
            videoID: this.videoID,
            actionDate: this.actionDate
        })
    }
}