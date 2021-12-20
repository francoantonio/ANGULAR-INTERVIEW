import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });
  it('contiene un router-outlet', () => {
    const de = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(de).not.toBeNull();
  });

  it('El contenedor debe tener la clase container-custom', () => {
    const contenedor: HTMLDivElement =
      fixture.nativeElement.querySelector('div');
    expect(contenedor).toBeTruthy();
    expect(contenedor.className).toBe('container-custom');
  });
  it('El contenedor debe 1 hijo, router outlet', () => {
    const contenedor: HTMLDivElement =
      fixture.nativeElement.querySelector('div');
    expect(contenedor.children.length).toBe(1);
    expect(contenedor.children[0].nodeName).toBe('ROUTER-OUTLET');
  });
});
