import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../postsInterface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private key = environment.keySotore
  constructor() { }

  set<t>(key:string,data:t){
    try {
      localStorage.setItem(key, JSON.stringify(data));
    }catch(err){
      console.log(err);
    }
  }
  private get(key:string){
    let dataLocal= localStorage.getItem(key)
    if(dataLocal){ return JSON.parse(dataLocal)}else{ return []}

  }
  private remove(key:string){
    try {
    localStorage.removeItem(key)
     } catch (err) {
       console.log(err);
     }
  }
  private clear():void {
    localStorage.clear()
  }
  addComment(comment:Comment){
    let data = this.get(this.key)
    data? data.push(comment):data=[comment]
    this.set(this.key,data)
  }
}
