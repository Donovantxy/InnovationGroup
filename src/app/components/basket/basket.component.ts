import { AddProduct } from './../../store/actions/basket.actions';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Product } from 'src/app/store/state/basket.state';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {

  @Input() size = 50;
  @Input() product: Product;
  @Input() color: string;
  gotClicked = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  addProductToTheBasket() {
    this.shine();
    this.store.dispatch(new AddProduct(this.product));
  }

  shine() {
    this.gotClicked = true;
    setTimeout(() => {
      this.gotClicked = false;
    }, 200);
  }

}
