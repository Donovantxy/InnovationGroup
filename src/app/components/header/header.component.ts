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
  private subscribe: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscribe = this.store.subscribe( ({ basket }) => {
      this.amount = basket.amount;
      this.gotChanged = true;
      setTimeout(() => {
        this.gotChanged = false;
      }, 200);
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
