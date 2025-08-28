import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId = 1;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentCategoryId = +params.get('id')! || 1;
      this.loadProducts();
    });
  }

  private loadProducts(): void {
    this.productService.getProductList(this.currentCategoryId).subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to load products', err)
    });
  }
}
