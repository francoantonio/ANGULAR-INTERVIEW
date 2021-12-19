import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post, Comment } from '../postsInterface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  get posts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(environment.pathUrl)
      .pipe(map((x) => x.slice(0, 10)));
  }
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(environment.pathUrl + `/${id}`);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.pathUrl + `/${id}/comments`);
  }
}
