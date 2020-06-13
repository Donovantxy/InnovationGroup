import { Subject } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/store/state/basket.state';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productsList: Product[];
  isPriceSortActive = false;
  private onDestroy$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(products => {
      this.productsList = products;
      this.sortBy('name');
    });
  }

  sortBy(attr: string): void {
      this.isPriceSortActive = attr === 'price';
      this.productsList.sort((a, b) => a[attr] > b[attr] ? 1 : -1 );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
