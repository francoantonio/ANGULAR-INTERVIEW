import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../postsInterface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private key = environment.keySotore;
  constructor() {}

  set<t>(key: string, data: t) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }
  get(): Comment[]{
    let dataLocal = localStorage.getItem(this.key);
    if (dataLocal) {
      return JSON.parse(dataLocal);
    } else {
      return [];
    }
  }

  addComment(comment: Comment) {
    let data = this.get();
    data ? data.push(comment) : (data = [comment]);
    this.set(this.key, data);
  }
  deleteOneComment(comment: Comment) {
    const data = this.get()
  data.splice( data.findIndex(x => x.date=== comment.date),1)
  this.set(this.key, data);
  }
}
