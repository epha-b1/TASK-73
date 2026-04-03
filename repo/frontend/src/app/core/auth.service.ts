import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type RoleCode = 'buyer' | 'seller' | 'moderator' | 'arbitrator' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly token = signal<string | null>(null);
  readonly refreshToken = signal<string | null>(null);
  readonly roles = signal<RoleCode[]>([]);

  constructor(private readonly http: HttpClient) {}

  async login(email: string, password: string) {
    const response: any = await firstValueFrom(this.http.post('/api/auth/login', { email, password }));
    this.token.set(response.accessToken);
    this.refreshToken.set(response.refreshToken);
    const roles = this.sanitizeRoles(response.roles);
    this.roles.set(roles);
  }

  async refresh(): Promise<string | null> {
    const refreshToken = this.refreshToken();
    if (!refreshToken) return null;
    const response: any = await firstValueFrom(this.http.post('/api/auth/refresh', { refreshToken }));
    this.token.set(response.accessToken);
    this.refreshToken.set(response.refreshToken);
    return response.accessToken;
  }

  async logout() {
    const refreshToken = this.refreshToken();
    try {
      if (refreshToken) {
        await firstValueFrom(this.http.post('/api/auth/logout', { refreshToken }));
      }
    } finally {
      this.clear();
    }
  }

  hasRole(role: RoleCode) {
    return this.roles().includes(role);
  }

  defaultHomeRoute() {
    const roles = this.roles();
    if (roles.includes('admin')) return '/admin/users';
    if (roles.includes('arbitrator')) return '/arbitration/queue';
    if (roles.includes('moderator')) return '/moderation/queue';
    if (roles.includes('seller')) return '/listings/my-listings';
    if (roles.includes('buyer')) return '/listings/browse';
    return '/auth/login';
  }

  private sanitizeRoles(input: unknown): RoleCode[] {
    const allowed: RoleCode[] = ['buyer', 'seller', 'moderator', 'arbitrator', 'admin'];
    if (!Array.isArray(input)) return [];
    return input.filter((role): role is RoleCode => allowed.includes(role as RoleCode));
  }

  clear() {
    this.token.set(null);
    this.refreshToken.set(null);
    this.roles.set([]);
  }
}
