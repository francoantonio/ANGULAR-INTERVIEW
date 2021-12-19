import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-comentarios',
  templateUrl: './new-comentarios.component.html',
  styleUrls: ['./new-comentarios.component.scss'],
})
export class NewComentariosComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.buildFrom();
  }

  ngOnInit(): void {}

  private buildFrom() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      msg: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  isInvalid(control:string){
    return this.form.controls[control].errors && this.form.controls[control].touched
  }
  isValid(control:string){
    return !this.form.controls[control].errors && this.form.controls[control].touched
  }
  onSubmit() {
    console.log(this.form.value);
    // console.log(this.form.getError('name'));
  }
}
