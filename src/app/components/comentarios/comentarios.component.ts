import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Comment } from '../../postsInterface';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {
  @Input() id!: number;
  @Output() dataLastComments = new EventEmitter<string>();
  comments: Comment[] = [];
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getComments(this.id).subscribe((data) => {
      this.comments = data
    });
  }
  lasCommentDate() {
    const date = this.comments[this.comments.length - 1];
    if (date.date) {
      return `${date.date.getDay()} ${date.date.getMonth()} ${date.date.getFullYear()}`;
    }
    return ' ';
  }
  emitirData() {
    this.dataLastComments.emit(this.lasCommentDate());
  }
}
