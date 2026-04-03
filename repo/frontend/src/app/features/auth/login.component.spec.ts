import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  const login = vi.fn();
  const defaultHomeRoute = vi.fn(() => '/listings/browse');
  const toastSuccess = vi.fn();
  const toastError = vi.fn();

  beforeEach(async () => {
    login.mockReset();
    defaultHomeRoute.mockReset();
    defaultHomeRoute.mockReturnValue('/listings/browse');
    toastSuccess.mockReset();
    toastError.mockReset();

    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { login, defaultHomeRoute } },
        { provide: ToastService, useValue: { success: toastSuccess, error: toastError } },
      ],
    }).compileComponents();
  });

  it('renders sign-in heading', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Welcome back');
  });

  it('auth service is available', () => {
    const auth = TestBed.inject(AuthService);
    expect(auth).toBeTruthy();
  });

  it('submits valid credentials and navigates to default home', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    login.mockResolvedValue(undefined);
    component.form.setValue({ email: 'buyer@example.com', password: 'Password123' });
    await component.submit();

    expect(login).toHaveBeenCalledWith('buyer@example.com', 'Password123');
    expect(navigateSpy).toHaveBeenCalledWith('/listings/browse');
    expect(toastSuccess).toHaveBeenCalledWith('Welcome back');
    expect(component.error()).toBeNull();
  });

  it('shows inline error and toast when login fails', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    login.mockRejectedValue({ error: { message: 'Invalid credentials' } });
    component.form.setValue({ email: 'buyer@example.com', password: 'bad' });
    await component.submit();

    expect(component.error()).toBe('Invalid credentials');
    expect(toastError).toHaveBeenCalledWith('Invalid credentials');
  });
});
