import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly cachePrefix = 'lt_cache:';

  constructor(private readonly http: HttpClient) {}

  private isNetworkIssue(error: any): boolean {
    return (typeof navigator !== 'undefined' && !navigator.onLine) || error?.status === 0;
  }

  private readCache<T>(url: string): T | null {
    try {
      const raw = localStorage.getItem(`${this.cachePrefix}${url}`);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  private writeCache(url: string, payload: unknown) {
    try {
      localStorage.setItem(`${this.cachePrefix}${url}`, JSON.stringify(payload));
    } catch {
      // ignore storage errors; network response is still valid
    }
  }

  async get<T>(url: string) {
    try {
      const response = await firstValueFrom(this.http.get<T>(url));
      if (url.startsWith('/api/storefront') || url.startsWith('/api/listings')) {
        this.writeCache(url, response);
      }
      return response;
    } catch (error: any) {
      if (this.isNetworkIssue(error)) {
        const cached = this.readCache<T>(url);
        if (cached) return cached;
      }
      throw error;
    }
  }

  post<T>(url: string, body: unknown) {
    return firstValueFrom(this.http.post<T>(url, body));
  }

  patch<T>(url: string, body: unknown) {
    return firstValueFrom(this.http.patch<T>(url, body));
  }

  put<T>(url: string, body: unknown) {
    return firstValueFrom(this.http.put<T>(url, body));
  }

  delete<T>(url: string) {
    return firstValueFrom(this.http.delete<T>(url));
  }
}
