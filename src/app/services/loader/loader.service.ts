import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private static _loading: boolean;
  private static _loaderText: string = "Loading..."

  constructor() { }

  set loading(val:boolean){
    LoaderService._loading = val;
  }

  get loading(){
    return LoaderService._loading;
  }

  set loaderText(val:string){
    LoaderService._loaderText = val;
  }

  get loaderText(){
    return LoaderService._loaderText;
  }
}
