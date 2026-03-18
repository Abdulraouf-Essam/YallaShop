import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

// Reusing your Product interface (abbreviated here for space)
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;
  availabilityStatus: string;
  images: string[];
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  product = signal<Product | null>(null);
  isLoading = signal<boolean>(true);

  activeImage = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.fetchProductDetails(productId);
      }
    });
  }

  fetchProductDetails(id: string): void {
    this.isLoading.set(true);
    this.http.get<Product>(`https://dummyjson.com/products/${id}`).subscribe({
      next: (res) => {
        this.product.set(res);
        if (res.images && res.images.length > 0) {
          this.activeImage.set(res.images[0]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching product details', err);
        this.isLoading.set(false);
      },
    });
  }

  changeImage(imageUrl: string): void {
    this.activeImage.set(imageUrl);
  }

  addToCart(): void {
    const currentProduct = this.product();
    if (currentProduct) {
      console.log('Added to cart:', currentProduct.title);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
