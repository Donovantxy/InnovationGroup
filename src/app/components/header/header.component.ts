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

  public amount: number;
  private subscribe: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscribe = this.store.subscribe( ({ basket }) => {
      this.amount = basket.amount;
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
