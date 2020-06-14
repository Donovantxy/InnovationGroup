import { Subject } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/store/state/basket.state';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: Product;
  private onDestroy$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productsService.getProduct(this.activatedRoute.snapshot.params.id)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((product: Product) => {
      this.product = {...product, img: `id-${product.id}.jpg`};
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
