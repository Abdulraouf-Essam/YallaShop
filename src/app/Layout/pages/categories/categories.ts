import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface Category {
  name: string;
  slug: string;
  image: string;
  customClass: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './categories.html',
})
export class Categories {
  private location = inject(Location);

  categories = signal<Category[]>([
    {
      name: 'Beauty',
      slug: 'beauty',
      image: 'assets/images/beautyCategories.jpg',
      customClass: 'rounded-3xl rounded-r-[5rem] hover:rotate-3',
    },
    {
      name: 'Fragrances',
      slug: 'fragrances',
      image: 'assets/images/fragrancesCategories.jpg',
      customClass: 'rounded-t-[4rem] rounded-b-3xl hover:-rotate-1',
    },
    {
      name: 'Furniture',
      slug: 'furniture',
      image: 'assets/images/furnitureCategories.jpg',
      customClass: 'rounded-[5rem] hover:-rotate-2',
    },
    {
      name: 'Groceries',
      slug: 'groceries',
      image: 'assets/images/groceriesCategories.jpg',
      customClass: 'rounded-t-3xl rounded-b-[4rem] hover:rotate-2',
    },
    {
      name: 'Home Decoration',
      slug: 'home-decoration',
      image: 'assets/images/home-decorationCategories.jpg',
      customClass: 'rounded-3xl rounded-r-[5rem] hover:rotate-3',
    },
    {
      name: 'Kitchen Accessories',
      slug: 'kitchen-accessories',
      image: 'assets/images/kitchen-accessoriesCategories.jpg',
      customClass: 'rounded-t-[4rem] rounded-b-3xl hover:-rotate-1',
    },
    {
      name: 'Laptops',
      slug: 'laptops',
      image: 'assets/images/laptopsCategories.jpg',
      customClass: 'rounded-[5rem] hover:-rotate-2',
    },
    {
      name: 'Mens Shirts',
      slug: 'mens-shirts',
      image: 'assets/images/mens-shirtsCategories.jpg',
      customClass: 'rounded-t-3xl rounded-b-[4rem] hover:rotate-2',
    },
    {
      name: 'Mens Shoes',
      slug: 'mens-shoes',
      image: 'assets/images/mens-shoesCategories.jpg',
      customClass: 'rounded-3xl rounded-r-[5rem] hover:rotate-3',
    },
    {
      name: 'Mens Watches',
      slug: 'mens-watches',
      image: 'assets/images/mens-watchesCategories.jpg',
      customClass: 'rounded-t-[4rem] rounded-b-3xl hover:-rotate-1',
    },
    {
      name: 'Mobile Accessories',
      slug: 'mobile-accessories',
      image: 'assets/images/mobile-accessoriesCategories.jpg',
      customClass: 'rounded-[5rem] hover:-rotate-2',
    },
    {
      name: 'Motorcycle',
      slug: 'motorcycle',
      image: 'assets/images/motorcycleCategories.jpg',
      customClass: 'rounded-t-3xl rounded-b-[4rem] hover:rotate-2',
    },
    {
      name: 'Skin Care',
      slug: 'skin-care',
      image: 'assets/images/skin-careCategories.jpg',
      customClass: 'rounded-3xl rounded-r-[5rem] hover:rotate-3',
    },
    {
      name: 'Smartphones',
      slug: 'smartphones',
      image: 'assets/images/smartphonesCategories.jpg',
      customClass: 'rounded-t-[4rem] rounded-b-3xl hover:-rotate-1',
    },
    {
      name: 'Sports Accessories',
      slug: 'sports-accessories',
      image: 'assets/images/sports-accessoriesCategories.jpg',
      customClass: 'rounded-[5rem] hover:-rotate-2',
    },
    {
      name: 'Sunglasses',
      slug: 'sunglasses',
      image: 'assets/images/sunglassesCategories.jpg',
      customClass: 'rounded-t-3xl rounded-b-[4rem] hover:rotate-2',
    },
    {
      name: 'Tablets',
      slug: 'tablets',
      image: 'assets/images/tabletsCategories.jpg',
      customClass: 'rounded-3xl rounded-r-[5rem] hover:rotate-3',
    },
    {
      name: 'Tops',
      slug: 'tops',
      image: 'assets/images/topsCategories.jpeg',
      customClass: 'rounded-t-[4rem] rounded-b-3xl hover:-rotate-1',
    },
    {
      name: 'Vehicle',
      slug: 'vehicle',
      image: 'assets/images/vehicleCategories.png',
      customClass: 'rounded-[5rem] hover:-rotate-2',
    },
    {
      name: 'Womens Bags',
      slug: 'womens-bags',
      image: 'assets/images/womens-bagsCategories.jpg',
      customClass: 'rounded-t-3xl rounded-b-[4rem] hover:rotate-2',
    },
    {
      name: 'Womens Dresses',
      slug: 'womens-dresses',
      image: 'assets/images/womens-dressesCategories.jpg',
      customClass: 'rounded-3xl rounded-r-[5rem] hover:rotate-3',
    },
    {
      name: 'Womens Jewellery',
      slug: 'womens-jewellery',
      image: 'assets/images/womens-jewelleryCategories.png',
      customClass: 'rounded-t-[4rem] rounded-b-3xl hover:-rotate-1',
    },
    {
      name: 'Womens Shoes',
      slug: 'womens-shoes',
      image: 'assets/images/womens-shoesCategories.png',
      customClass: 'rounded-[5rem] hover:-rotate-2',
    },
    {
      name: 'Womens Watches',
      slug: 'womens-watches',
      image: 'assets/images/womens-watchesCategories.png',
      customClass: 'rounded-t-3xl rounded-b-[4rem] hover:rotate-2',
    },
  ]);

  goBack(): void {
    this.location.back();
  }
}
