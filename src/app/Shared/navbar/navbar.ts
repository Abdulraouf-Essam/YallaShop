import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, User } from '../../Core/services/auth.service';
import { LanguageService } from '../../Core/services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, FormsModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);
  languageService = inject(LanguageService);

  isLoggedIn = this.authService.isLoggedIn();
  currentUser: User | null = this.authService.getCurrentUser();

  currentLang = this.languageService.currentLang;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
