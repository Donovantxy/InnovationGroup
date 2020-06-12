import { BasketState } from './../../store/state/basket.state';
import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngxs/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public amount: number;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.subscribe( ({ basket }) => {
      this.amount = basket.amount;
    });
  }

}
