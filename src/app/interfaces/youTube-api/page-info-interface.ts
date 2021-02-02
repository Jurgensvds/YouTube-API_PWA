type PageInfoTypes = 'totalResults' | 'resultsPerPage';

interface PageInfoInterface{
    totalResults: number;
    resultsPerPage: number;
}

export class PageInfo{
    totalResults: number = 0;
    resultsPerPage: number = 0;

    constructor(newPageInfo?: PageInfoInterface){
        this.totalResults = this.assignVariable('totalResults', newPageInfo, this.totalResults)
        this.resultsPerPage = this.assignVariable('resultsPerPage', newPageInfo, this.resultsPerPage)
    }

    private assignVariable(key:PageInfoTypes, object:PageInfoInterface | undefined, defaultVal: any){
        return object ? (object[key] ? object[key] : defaultVal) : defaultVal;
    }
}