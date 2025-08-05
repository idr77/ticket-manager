import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['register']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule],
      providers: [{ provide: AuthService, useValue: spy }]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should call register method', () => {
    const user = { email: 'test@test.com', password: '123456' };
    component.email = user.email;
    component.password = user.password;
    component.confirmPassword = user.password;
    authServiceSpy.register.and.returnValue(of({ success: true }));

    component.register();

    expect(authServiceSpy.register).toHaveBeenCalledWith(user.email, user.password, 'USER');
  });
});
