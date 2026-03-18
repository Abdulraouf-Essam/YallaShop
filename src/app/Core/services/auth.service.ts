import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());

  constructor() {}

  isLoggedIn$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this.http
      .post('https://dummyjson.com/auth/login', {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 30,
      })
      .pipe(
        tap((response: any) => {
          console.log('Login successful:', response);

          localStorage.setItem('authToken', response.accessToken);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(response.user);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.getUserFromStorage();
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  register(userData: any): Observable<any> {
    return this.http
      .post('https://dummyjson.com/users/add', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
        password: userData.password,
      })
      .pipe(
        tap((response: any) => {
          console.log('Registration successful:', response);
          // Store user info directly from registration response
          const user: User = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            username: response.username,
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          // After registration, automatically log in the user
          this.login({ username: userData.username, password: userData.password }).subscribe();
        }),
      );
  }
}
