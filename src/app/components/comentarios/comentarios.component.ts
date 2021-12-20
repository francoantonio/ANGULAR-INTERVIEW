import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
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
  commentsOrigin: Comment[] = [];
  form!: FormGroup;

  constructor(
    private postsService: PostsService,
    private storage: StorageService,
    private formBuilder: FormBuilder
  ) {
    this.buildFrom();
  }
  ngOnInit(): void {
    this.postsService.getComments(this.id).subscribe((data) => {
      this.comments = data;
      this.commentsOrigin = data;
      let temporalData = this.loadStorage();
      if (this.loadStorage()) {
        this.comments = [...this.comments, ...temporalData];
      }
    });
  }
  checkComment() {
    this.comments = this.commentsOrigin;
    let temporalData = this.loadStorage();
    if (this.loadStorage()) {
      this.comments = [...this.comments, ...temporalData];
    }
  }
  private buildFrom() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      body: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }
  lasCommentDate() {
    const date = this.comments[this.comments.length - 1];
    return date.date ? date.date : '';
  }
  loadStorage(): Comment[] {
    return this.storage.get();
  }
  deleteComment(id: number) {
    this.storage.deleteOneComment(this.comments[id]);
    this.checkComment();
  }
  emitirData() {
    this.dataLastComments.emit(String(this.lasCommentDate()));
  }
  isInvalid(control: string) {
    return (
      this.form.controls[control].errors && this.form.controls[control].touched
    );
  }
  isValid(control: string) {
    return (
      !this.form.controls[control].errors && this.form.controls[control].touched
    );
  }
  onSubmit() {
    this.form.markAllAsTouched();
    const comment = this.form.value as Comment;
    comment.date = new Date();
    this.storage.addComment(comment);
    this.form.reset();
    this.checkComment();
  }
}
