import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/postsInterface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public allPosts: Post[] = [];
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.posts.subscribe((data) => {
      this.allPosts = data;
    });
  }
}
