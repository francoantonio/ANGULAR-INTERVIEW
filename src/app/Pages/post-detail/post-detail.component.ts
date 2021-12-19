import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/postsInterface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  currentId!: number;
  dateLastComment!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.currentId = params['id'];
      this.postsService.getPost(params['id']).subscribe(
        (post) => (this.post = post),
        () => {
          this.router.navigate(['/404/' + this.currentId]);
        }
      );
    });
  }
  ngDoCheck(): void {}
  capturarData(mensaje: string) {
    this.dateLastComment = mensaje;
  }
}
