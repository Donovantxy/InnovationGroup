import { Subject } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/store/state/basket.state';
import { takeUntil, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productsList: Product[];
  private onDestroy$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
    .pipe(
      switchMap(() => this.productsService.sortedProducts$),
      takeUntil(this.onDestroy$)
    )
    .subscribe(products => {
      // it can work simply without destructuring [...products], but I wanted to show how to switch subject
      this.productsList = [...products];
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
