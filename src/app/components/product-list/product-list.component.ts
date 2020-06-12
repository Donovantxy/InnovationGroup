import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/store/state/basket.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productsList: Product[];
  isPriceSortActive = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
    .pipe(map((prod: Product[]) => {
      prod.map(p => p.img = `id-${p.id}.jpg`);
      return prod;
    }))
    .subscribe(products => {
      this.productsList = products;
    });
  }

  sortBy(attr: string): void {
      this.isPriceSortActive = attr === 'price';
      this.productsList.sort((a, b) => a[attr] > b[attr] ? 1 : -1 );
  }

}
