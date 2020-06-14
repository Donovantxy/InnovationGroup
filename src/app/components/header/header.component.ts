import { EmptyBasket, RemoveProductFromBasket } from './../../store/actions/basket.actions';
import { Product } from 'src/app/store/state/basket.state';
import { ProductsService } from './../../services/products.service';
import { BasketState } from './../../store/state/basket.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

interface Boughts extends Product {
  amount?: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  amount: number;
  gotChanged = false;
  isPriceSortActive = false;
  boughts: {[id: string]: Boughts};
  isShowRemovinglist = false;
  hasAnyBought = false;
  objectKeys = Object.keys;
  private subscribe: Subscription;

  constructor(private store: Store, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.subscribe = this.store.subscribe( (st: {basket: BasketState}) => {
      this.amount = st.basket.amount;
      this.setUniqeProducts(st.basket.boughts);
      this.gotChanged = true;
      setTimeout(() => {
        this.gotChanged = false;
      }, 200);
      this.hasAnyBought = !!this.boughts && !!Object.keys(this.boughts).length;
      this.isShowRemovinglist = this.isShowRemovinglist && !!this.hasAnyBought;
    });
  }

  sortBy(by: string): void {
    this.isPriceSortActive = by === 'price';
    this.productsService.sortProducts(by);
  }

  removeFromBasket(isAll = false) {
    this.isShowRemovinglist = this.hasAnyBought;
    if ( isAll ) {
      this.store.dispatch(new EmptyBasket());
    }
  }

  removeBought(key: number) {
    this.store.dispatch(new RemoveProductFromBasket(key));
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  private setUniqeProducts(prod: Product[]) {
    let newBoughts: {[id: string]: Boughts};
    prod.forEach((p, i) => {
      if ( !!newBoughts && newBoughts[p.id] ){
        newBoughts[p.id].amount++;
      }
      else {
        newBoughts = !newBoughts
        ? {[p.id]: {...p}}
        : {...newBoughts, ...{[p.id]: {...p}}};
        newBoughts[p.id].amount = 1;
      }
    });
    this.boughts = newBoughts;
  }

}
