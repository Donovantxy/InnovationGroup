import { RemoveProductFromBasket } from './../../store/actions/basket.actions';
import { Product } from 'src/app/store/state/basket.state';
import { ProductsService } from './../../services/products.service';
import { BasketState } from './../../store/state/basket.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  amount: number;
  gotChanged = false;
  isPriceSortActive = false;
  boughts: Product[];
  isShowRemovinglist = false;
  private subscribe: Subscription;

  constructor(private store: Store, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.subscribe = this.store.subscribe( (st: {basket: BasketState}) => {
      this.amount = st.basket.amount;
      this.boughts = st.basket.boughts;
      this.gotChanged = true;
      setTimeout(() => {
        this.gotChanged = false;
      }, 200);
      if (!this.boughts.length) {
        this.isShowRemovinglist = false;
      }
    });
  }

  sortBy(by: string): void {
    this.isPriceSortActive = by === 'price';
    this.productsService.sortProducts(by);
  }

  removeFromBasket() {
    if ( this.boughts.length ) {
      this.isShowRemovinglist = true;
    }
  }

  removeBought(index: number) {
    this.store.dispatch(new RemoveProductFromBasket(index));
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
