import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../postsInterface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private key = environment.keySotore;
  constructor() {}

  set<t>(key: string, id: number, data: t) {
    try {
      localStorage.setItem(key + id, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }
  get(id: number): Comment[] {
    let dataLocal = localStorage.getItem(this.key + id);
    if (dataLocal) {
      return JSON.parse(dataLocal);
    } else {
      return [];
    }
  }

  addComment(comment: Comment, id: number) {
    let data = this.get(id);
    data ? data.push(comment) : (data = [comment]);
    this.set(this.key, id, data);
  }
  deleteOneComment(comment: Comment, id: number) {
    const data = this.get(id);
    data.splice(
      data.findIndex((x) => x.date === comment.date),
      1
    );
    this.set(this.key, id, data);
  }
}
