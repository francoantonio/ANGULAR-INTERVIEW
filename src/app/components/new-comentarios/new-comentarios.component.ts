import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Comment } from '../../postsInterface';

@Component({
  selector: 'app-new-comentarios',
  templateUrl: './new-comentarios.component.html',
  styleUrls: ['./new-comentarios.component.scss'],
})
export class NewComentariosComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private storage:StorageService) {
    this.buildFrom();
  }

  ngOnInit(): void {}

  private buildFrom() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      body: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  isInvalid(control:string){
    return this.form.controls[control].errors && this.form.controls[control].touched
  }
  isValid(control:string){
    return !this.form.controls[control].errors && this.form.controls[control].touched
  }
  onSubmit() {
    this.form.markAllAsTouched()
    const comment =this.form.value as Comment
    comment.date =new Date()
    this.storage.addComment(comment)
    this.form.reset()
  }
}
