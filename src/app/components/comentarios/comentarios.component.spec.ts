import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

import { ComentariosComponent } from './comentarios.component';
import { StorageService } from '../../services/storage.service';
import { Comment } from '../../postsInterface';
import { ReactiveFormsModule } from '@angular/forms';

class PostsServiceb {
  getComments() {
    return of(true);
  }
}
class StorageServiceb {
  get() {}
  addComment(comment: Comment) {}
}

describe('ComentariosComponent', () => {
  let component: ComentariosComponent;
  let fixture: ComponentFixture<ComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComentariosComponent],
      providers: [
        { provide: PostsService, useClass: PostsServiceb },
        { provide: StorageService, useClass: StorageServiceb },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor formbuilder', () => {
    it('Crear los formularios', () => {
      expect(Object.keys(component.form.controls)).toEqual([
        'name',
        'email',
        'body',
      ]);
    });
  });

  describe('Validaciones campo Name', () => {
    it('Deberia verificar que el campo name acepte minimo 3 letras', () => {
      const name = component.form.controls['name'];
      name?.setValue('sol');
      expect(name?.valid).toBeTruthy();
    });
    it('El campo name no aceptaria 2 letras o menos', () => {
      const name = component.form.controls['name'];
      name?.setValue('so');
      expect(name?.valid).toBeFalsy();
    });
    it('El campo name no puede estar vacio', () => {
      const name = component.form.controls['name'];
      name?.setValue('');
      expect(name?.valid).toBeFalsy();
    });
  });
  describe('Validaciones campo email', () => {
    it('El campo tiene que ser un email valido', () => {
      const email = component.form.controls['email'];
      email?.setValue('test@test.com');
      expect(email?.valid).toBeTruthy();
    });
    describe('Validaciones diferentes email', () => {
      it('El campo email no aceptaria un correo invalido test1', () => {
        const email = component.form.controls['email'];
        email?.setValue('test1');
        expect(email?.valid).toBeFalsy();
      });
      it('El campo email no aceptaria un correo invalido test1@', () => {
        const email = component.form.controls['email'];
        email?.setValue('test1@');
        expect(email?.valid).toBeFalsy();
      });
      it('El campo email no aceptaria un correo invalido test1@.com', () => {
        const email = component.form.controls['email'];
        email?.setValue('test1@.com');
        expect(email?.valid).toBeFalsy();
      });
      it('El campo email no aceptaria un correo invalido test1@test.', () => {
        const email = component.form.controls['email'];
        email?.setValue('test1@test.');
        expect(email?.valid).toBeFalsy();
      });
      it('El campo email no aceptaria un correo invalido test1@test', () => {
        const email = component.form.controls['email'];
        email?.setValue('test1@test');
        expect(email?.valid).toBeFalsy();
      });
      it('El campo email aceptaria test@test.com', () => {
        const email = component.form.controls['email'];
        email?.setValue('test@test.com');
        expect(email?.valid).toBeTruthy();
      });
    });

    it('El campo email no puede estar vacio', () => {
      const email = component.form.controls['email'];
      email?.setValue('');
      expect(email?.valid).toBeFalsy();
    });
  });
  describe('Validaciones campos body', () => {
    it('El campo tiene que ser un body valido', () => {
      const body = component.form.controls['body'];
      body?.setValue('test');
      expect(body?.valid).toBeTruthy();
    });
    it('El campo no puede superar los 500 caracteres', () => {
      const body = component.form.controls['body'];
      body?.setValue('2'.repeat(501));
      expect(body?.valid).toBeFalsy();
    });
    it('el campo no puede superar los 500 caracteres', () => {
      const body = component.form.controls['body'];
      body?.setValue('2'.repeat(500));
      expect(body?.valid).toBeTruthy();
    });
    it('El campo no puede ser nulo', () => {
      const body = component.form.controls['body'];
      body?.setValue('');
      expect(body?.valid).toBeFalsy();
    });
  });
});
