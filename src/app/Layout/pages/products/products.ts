import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslateModule],
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  limit = 10;
  skip = signal<number>(0);
  totalProducts = signal<number>(0);
  isMoreLoading = signal<boolean>(false);

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);
  currentCategory = signal<string | null>(null);
  searchQuery = signal<string>('');
  isSearching = signal<boolean>(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');
      this.currentCategory.set(category);
      this.fetchProducts(category);
    });
  }

  fetchProducts(category: string | null, append: boolean = false): void {
    // Use isLoading for initial fetch, isMoreLoading for subsequent clicks
    if (!append) this.isLoading.set(true);
    else this.isMoreLoading.set(true);

    let apiUrl: string;
    if (category) {
      apiUrl = `https://dummyjson.com/products/category/${category}?limit=${this.limit}&skip=${this.skip()}`;
    } else {
      apiUrl = `https://dummyjson.com/products?limit=${this.limit}&skip=${this.skip()}`;
    }

    this.http.get<any>(apiUrl).subscribe({
      next: (res) => {
        if (append) {
          // Append new products to the existing array
          this.products.update((prev) => [...prev, ...res.products]);
        } else {
          this.products.set(res.products);
        }

        this.totalProducts.set(res.total);
        this.isLoading.set(false);
        this.isMoreLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.isMoreLoading.set(false);
      },
    });
  }

  loadMore(): void {
    // Increase the skip value
    this.skip.update((prev) => prev + this.limit);
    // Fetch next batch and append
    this.fetchProducts(this.currentCategory(), true);
  }

  addToCart(product: Product): void {
    console.log('Added to cart:', product.title);
  }

  goBack(): void {
    this.location.back();
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    if (query.trim()) {
      this.isSearching.set(true);
      this.isLoading.set(true);
      this.http.get<any>(`https://dummyjson.com/products/search?q=${query}`).subscribe({
        next: (res) => {
          this.products.set(res.products);
          this.totalProducts.set(res.total);
          this.isLoading.set(false);
          this.isSearching.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.isSearching.set(false);
        },
      });
    } else {
      // If search is cleared, reload products
      this.isSearching.set(false);
      this.skip.set(0);
      this.fetchProducts(this.currentCategory());
    }
  }
}
